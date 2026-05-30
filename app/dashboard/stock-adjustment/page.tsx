"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";
import { logStockMovement } from "@/lib/logStockMovement";

type Product = {
  id: number;
  name: string;
  stock_quantity: number;
  buying_price: number;
};

type Adjustment = {
  id: number;
  product_id: number;
  type: "IN" | "OUT";
  quantity: number;
  unit_cost: number;
  total_cost: number;
  pnl_amount: number;
  reason: string;
  created_at: string;

  products?: {
    name: string;
  } | null;
};

const gainReasons = [
  "Stock Count Surplus",
  "Returned Goods",
  "Damaged Items Recovered",
  "Supplier Bonus",
  "Inventory Correction",
  "Production Output",
  "Other Gain",
];

const lossReasons = [
  "Damaged Goods",
  "Expired Items",
  "Theft",
  "Stock Count Shortage",
  "Internal Use",
  "Wastage",
  "Inventory Correction",
  "Other Loss",
];

export default function StockAdjustmentPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [adjustments, setAdjustments] =
    useState<Adjustment[]>([]);

  const [selectedAdjustment, setSelectedAdjustment] =
    useState<Adjustment | null>(null);

  const [editingAdjustment, setEditingAdjustment] =
    useState<Adjustment | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [productId, setProductId] =
    useState("");

  const [type, setType] =
    useState<"IN" | "OUT">("IN");

  const [quantity, setQuantity] =
    useState("");

  const [unitCost, setUnitCost] =
    useState("");

  const [reason, setReason] =
    useState("");

  // FETCH PRODUCTS
  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select(`
          id,
          name,
          stock_quantity,
          buying_price
        `)
        .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(
      (data as unknown as Product[]) || []
    );
  }

  // FETCH ADJUSTMENTS
  async function fetchAdjustments() {
    const { data, error } =
      await supabase
        .from("stock_adjustments")
        .select(`
          *,
          products(name)
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setAdjustments(
      (data as unknown as Adjustment[]) || []
    );
  }

  useEffect(() => {
    fetchProducts();
    fetchAdjustments();
  }, []);

  // AUTO UNIT COST
  useEffect(() => {
    if (!productId) return;

    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) return;

    setUnitCost(
      String(product.buying_price || 0)
    );
  }, [productId, products]);

  // TOTAL COST
  const totalCost =
    Number(quantity || 0) *
    Number(unitCost || 0);

  const pnlAmount =
  type === "OUT"
    ? -totalCost
    : totalCost;  

  // FILTERED ADJUSTMENTS
  const filteredAdjustments =
    useMemo(() => {
      return adjustments.filter((a) =>
        a.products?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [adjustments, search]);

  // CLEAR FORM
  function clearForm() {
    setProductId("");
    setType("IN");
    setQuantity("");
    setUnitCost("");
    setReason("");
  }

  // OPEN NEW
  function openNewModal() {
    clearForm();

    setEditingAdjustment(null);

    setIsOpen(true);
  }

  // OPEN EDIT
  function openEditModal(
    adjustment: Adjustment
  ) {
    setEditingAdjustment(adjustment);

    setProductId(
      String(adjustment.product_id)
    );

    setType(adjustment.type);

    setQuantity(
      String(adjustment.quantity)
    );

    setUnitCost(
      String(adjustment.unit_cost)
    );

    setReason(adjustment.reason);

    setIsOpen(true);
  }

  // SAVE ADJUSTMENT
  async function saveAdjustment() {
    if (
      !productId ||
      !quantity ||
      !unitCost ||
      !reason
    ) {
      alert("Fill all fields");
      return;
    }

    const qty = Number(quantity);

    const cost = Number(unitCost);

    const total = qty * cost;

    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (!product) return;

    // EDIT MODE
    if (editingAdjustment) {
      let revertedStock =
        editingAdjustment.type === "IN"
          ? product.stock_quantity -
            editingAdjustment.quantity
          : product.stock_quantity +
            editingAdjustment.quantity;

      let finalStock =
        type === "IN"
          ? revertedStock + qty
          : revertedStock - qty;

      if (finalStock < 0) {
        alert(
          "Adjustment would create negative stock"
        );
        return;
      }

      // UPDATE ADJUSTMENT
      const { error } = await supabase
        .from("stock_adjustments")
        .update({
          product_id: Number(productId),
          type,
          quantity: qty,
          unit_cost: cost,
          total_cost: total,

          pnl_amount:
           type === "OUT"
           ? -total
           : total,
          reason,
          })
        .eq("id", editingAdjustment.id);

      if (error) {
        console.error(error);
        alert("Failed to update");
        return;
      }

      // UPDATE PRODUCT STOCK
      const { error: stockError } =
        await supabase
          .from("products")
          .update({
            stock_quantity: finalStock,
          })
          .eq("id", product.id);

      if (stockError) {
        console.error(stockError);
        return;
      }
    }

    // NEW MODE
    else {
      const newStock =
        type === "IN"
          ? product.stock_quantity + qty
          : product.stock_quantity - qty;

      if (newStock < 0) {
        alert(
          "Stock cannot go below zero"
        );
        return;
      }

      // SAVE ADJUSTMENT
      const businessId = await getBusinessId();
      const { error } = await supabase
        .from("stock_adjustments")
        .insert([
          {
             business_id: businessId,
            product_id: Number(productId),
            type,
            quantity: qty,
            unit_cost: cost,
            total_cost: total,
            pnl_amount:
            type === "OUT"
            ? -total
            : total,
            reason,
            },
         ]);

      if (error) {
        console.error(error);
        alert("Failed to save");
        return;
      }

      // UPDATE PRODUCT STOCK
      const { error: stockError } =
        await supabase
          .from("products")
          .update({
            stock_quantity: newStock,
          })
          .eq("id", product.id);

      if (stockError) {
        console.error(stockError);
        return;
      }
    }
      await logStockMovement(
        product.id,
        "adjustment",
        Number(quantity),
        undefined,
        "Manual stock adjustment"
      );
      
    clearForm();

    setEditingAdjustment(null);

    setIsOpen(false);

    fetchProducts();
    fetchAdjustments();
  }

  // DELETE ADJUSTMENT
  async function deleteAdjustment(
    adjustment: Adjustment
  ) {
    const confirmDelete = confirm(
      "Delete this adjustment?"
    );

    if (!confirmDelete) return;

    const product = products.find(
      (p) =>
        p.id === adjustment.product_id
    );

    if (!product) return;

    // REVERSE STOCK
    const reversedStock =
      adjustment.type === "IN"
        ? product.stock_quantity -
          adjustment.quantity
        : product.stock_quantity +
          adjustment.quantity;

    // UPDATE PRODUCT
    const { error: stockError } =
      await supabase
        .from("products")
        .update({
          stock_quantity: reversedStock,
        })
        .eq("id", product.id);

    if (stockError) {
      console.error(stockError);
      return;
    }

    // DELETE RECORD
    const { error } = await supabase
      .from("stock_adjustments")
      .delete()
      .eq("id", adjustment.id);

    if (error) {
      console.error(error);
      return;
    }

    setSelectedAdjustment(null);

    fetchProducts();
    fetchAdjustments();
  }

  // REASONS
  const reasons =
    type === "IN"
      ? gainReasons
      : lossReasons;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Stock Adjustments
        </h1>

        <p className="text-gray-500">
          Inventory gains & losses
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-3">
          {/* NEW */}
          <button
            onClick={openNewModal}
            className="bg-gray-100 text-blue-900 border px-3 py-1.5 rounded-md hover:bg-gray-200 text-sm"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedAdjustment}
            onClick={() =>
              selectedAdjustment &&
              openEditModal(
                selectedAdjustment
              )
            }
            className="bg-gray-100 text-blue-900 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50 text-sm"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            disabled={!selectedAdjustment}
            onClick={() =>
              selectedAdjustment &&
              deleteAdjustment(
                selectedAdjustment
              )
            }
            className="bg-gray-100 text-blue-900 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50 text-sm"
          >
            Delete
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search adjustments..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border px-3 py-1.5 rounded-md w-64 text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
         <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-2 text-left border border-gray-200">
                  Product
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Type
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Qty
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Unit Cost
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Total Cost
                </th>

                <th className="p-2 text-left border border-gray-200">
                  P&L Impact
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Reason
                </th>

                <th className="p-2 text-left border border-gray-200">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAdjustments.map(
                (adjustment) => (
                  <tr
                    key={adjustment.id}
                    onClick={() =>
                      setSelectedAdjustment(
                        adjustment
                      )
                    }
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedAdjustment?.id ===
                      adjustment.id
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <td className="p-2 border border-gray-200">
                      {
                        adjustment.products
                          ?.name
                      }
                    </td>

                    <td
                      className={`p-2 border border-gray-200 font-medium ${
                        adjustment.type ===
                        "IN"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {adjustment.type}
                    </td>

                    <td className="p-2 border border-gray-200">
                      {
                        adjustment.quantity
                      }
                    </td>

                    <td className="p-2 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        adjustment.unit_cost
                      )}
                    </td>

                    <td className="p-2 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        adjustment.total_cost
                      )}
                    </td>

                    <td className={`p-2 border border-gray-200 font-medium ${
                        adjustment.pnl_amount >= 0
                       ? "text-green-700"
                       : "text-red-600"
                        }`}
                         >
                        UGX{" "}
                       {formatCurrency(
                       adjustment.pnl_amount
                       )}
                      </td>

                    <td className="p-2 border border-gray-200">
                      {adjustment.reason}
                    </td>

                    <td className="p-2 border border-gray-200">
                      {formatDate(
                        adjustment.created_at
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
</div>
      {/* MODAL */}
      <Dialog
        open={isOpen}
        onClose={() =>
          setIsOpen(false)
        }
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4 text-blue-900">
              {editingAdjustment
                ? "Edit Adjustment"
                : "New Adjustment"}
            </Dialog.Title>

            <div className="space-y-4">
              {/* PRODUCT */}
              <select
                value={productId}
                onChange={(e) =>
                  setProductId(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">
                  Select Product
                </option>

                {products.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.name} (Stock:{" "}
                    {p.stock_quantity})
                  </option>
                ))}
              </select>

              {/* TYPE */}
              <select
                value={type}
                onChange={(e) => {
                  setType(
                    e.target
                      .value as
                      | "IN"
                      | "OUT"
                  );

                  setReason("");
                }}
                className="w-full border p-3 rounded-lg"
              >
                <option value="IN">
                  Stock Gain (+)
                </option>

                <option value="OUT">
                  Stock Loss (-)
                </option>
              </select>

              {/* REASON */}
              <select
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">
                  Select Reason
                </option>

                {reasons.map((r) => (
                  <option
                    key={r}
                    value={r}
                  >
                    {r}
                  </option>
                ))}
              </select>

              {/* QUANTITY */}
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* UNIT COST */}
              <input
                type="number"
                placeholder="Unit Cost"
                value={unitCost}
                onChange={(e) =>
                  setUnitCost(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* TOTAL COST */}
              <div className="bg-gray-50 border rounded-lg p-3 text-sm">
                Total Cost: UGX{" "}
                {formatCurrency(
                  totalCost
                )}
              </div>

              {/* SAVE */}
              <button
                onClick={saveAdjustment}
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingAdjustment
                  ? "Update Adjustment"
                  : "Save Adjustment"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}