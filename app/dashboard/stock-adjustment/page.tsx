"use client";

import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";
import { logStockMovement } from "@/lib/logStockMovement";
import { Search, X } from "lucide-react";
import Select from "react-select";

type Product = {
  id: number;
  name: string;
  stock_quantity: number;
  buying_price: number;
  conversion_unit: string | null;
  conversion_quantity: number | null;
};

type Adjustment = {
  id: number;
  product_id: number;
  type: "IN" | "OUT";
  quantity: number;
  quantity_in_base_unit: number | null;
  unit_used: string | null;
  unit_cost: number;
  total_cost: number;
  pnl_amount: number;
  reason: string;
  created_at: string;

  products?: {
    name: string;
    units?: {
      short_name: string;
    };
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

  const [businessId, setBusinessId] = useState<string>("");

  const [adjUnitMode, setAdjUnitMode] = useState<"base" | "conversion">("base");

   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);
  }  

  // FETCH PRODUCTS
  async function fetchProducts() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("products")
        .select(`
          id,
          name,
          stock_quantity,
          buying_price,
          conversion_unit,
          conversion_quantity
        `)
        .eq("business_id", businessId) 
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
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("stock_adjustments")
        .select(`
          *,
          products(name,
          units(short_name))
        `)
        .eq("business_id", businessId)
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
    loadBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchProducts();
      fetchAdjustments();
    }
  }, [businessId]);

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

    setAdjUnitMode(
    adjustment.unit_used === "base" || !adjustment.unit_used ? "base" : "conversion"
  );

    setIsOpen(true);
  }

  // SAVE ADJUSTMENT
  async function saveAdjustment() {
    if (
      !productId || !quantity || !unitCost || !reason
    ) {
      alert("Fill all fields");
      return;
    }

    const qty = Number(quantity);

    const cost = Number(unitCost);

    const product = products.find((p) => p.id === Number(productId));
    if (!product) return;

    const qtyInBaseUnit =
    adjUnitMode === "conversion" && product.conversion_quantity
      ? qty * product.conversion_quantity
      : qty;

    const total = qtyInBaseUnit * cost;
    const pnl = type === "OUT" ? -total : total;

    // EDIT MODE
    if (editingAdjustment) {

      const oldQtyInBaseUnit = Number(
      editingAdjustment.quantity_in_base_unit ?? editingAdjustment.quantity
    );

      let revertedStock =
        editingAdjustment.type === "IN"
          ? product.stock_quantity -
            oldQtyInBaseUnit
          : product.stock_quantity +
            oldQtyInBaseUnit;

      let finalStock =
        type === "IN"
          ? revertedStock + qtyInBaseUnit
          : revertedStock - qtyInBaseUnit;

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
          quantity_in_base_unit: qtyInBaseUnit,
          unit_used: adjUnitMode === "conversion" ? product.conversion_unit : "base",
          unit_cost: cost,
          total_cost: total,

          pnl_amount:
           type === "OUT"
           ? -total
           : total,
          reason,
          })
        .eq("id", editingAdjustment.id)
        .eq("business_id", businessId);

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
          .eq("id", product.id)
          .eq("business_id", businessId);

      if (stockError) {
        console.error(stockError);
        return;
      }
    }

    // NEW MODE
    else {
      const newStock =
        type === "IN"
          ? product.stock_quantity + qtyInBaseUnit
          : product.stock_quantity - qtyInBaseUnit;

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
            quantity_in_base_unit: qtyInBaseUnit,
            unit_used: adjUnitMode === "conversion" ? product.conversion_unit : "base",
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
          .eq("id", product.id)
          .eq("business_id", businessId);

      if (stockError) {
        console.error(stockError);
        return;
      }
    }
      await logStockMovement(
        product.id,
        "adjustment",
        qtyInBaseUnit,
        undefined,
        "Manual stock adjustment"
      );
      
    clearForm();
    setEditingAdjustment(null);
    setIsOpen(false);
    fetchProducts();
    fetchAdjustments();
    setAdjUnitMode("base");
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

    const qtyInBaseUnit = Number(
    adjustment.quantity_in_base_unit ?? adjustment.quantity
  );

    // REVERSE STOCK
    const reversedStock =
      adjustment.type === "IN"
        ? product.stock_quantity -
          qtyInBaseUnit
        : product.stock_quantity +
          qtyInBaseUnit;

    // UPDATE PRODUCT
    const { error: stockError } =
      await supabase
        .from("products")
        .update({
          stock_quantity: reversedStock,
        })
        .eq("id", product.id)
        .eq("business_id", businessId);

    if (stockError) {
      console.error(stockError);
      return;
    }

    // DELETE RECORD
    const { error } = await supabase
      .from("stock_adjustments")
      .delete()
      .eq("id", adjustment.id)
      .eq("business_id", businessId);

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

  const selectedProductObj = products.find(p => p.id === Number(productId));
  const hasConversion = !!(selectedProductObj?.conversion_unit && selectedProductObj?.conversion_quantity);
     
  const productOptions =
  products.map(
    (product) => ({
      value: product.id,
      label: `${product.name} (Stock: ${product.stock_quantity})`,
      product,
    })
  );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Stock Adjustments
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Inventory gains & losses
        </p>
      </div>

      {/* TOOLBAR */}
       <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {/* NEW */}
          <button
            onClick={openNewModal}
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-md hover:bg-gray-100 text-sm"
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
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
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
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Delete
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-50">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              rounded-md
              pl-9
              pr-10
              py-1.5
              text-sm
              text-gray-900
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-gray-700
              "
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-200">
         <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-[800px] w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-3 p-2 text-left border border-gray-200">
                  Product
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  Type
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  Qty
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  Unit Cost
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  Total Cost
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  P&L Impact
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
                  Reason
                </th>

                <th className="px-3 p-2 text-left border border-gray-200">
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
                    <td className="px-3 p-2 border border-gray-200">
                      {
                        adjustment.products
                          ?.name
                      }
                    </td>

                    <td
                      className={`px-3 p-2 border border-gray-200 font-medium ${
                        adjustment.type ===
                        "IN"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {adjustment.type}
                    </td>

                    <td className="px-3 p-2 border border-gray-200">
                      {adjustment.quantity}{" "}
                      {adjustment.unit_used && adjustment.unit_used !== "base"
                        ? adjustment.unit_used
                        : adjustment.products?.units?.short_name}
                    </td>

                    <td className="px-3 p-2 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        adjustment.unit_cost
                      )}
                    </td>

                    <td className="px-3 p-2 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        adjustment.total_cost
                      )}
                    </td>

                    <td className={`px-3 p-2 border border-gray-200 font-medium ${
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

                    <td className="px-3 p-2 border border-gray-200">
                      {adjustment.reason}
                    </td>

                    <td className="px-3 p-2 border border-gray-200">
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
          <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold mb-4 text-blue-900">
              {editingAdjustment
                ? "Edit Adjustment"
                : "New Adjustment"}
            </Dialog.Title>

            <div className="space-y-4">
              {/* PRODUCT */}
              <Select
                  options={productOptions}
                  placeholder="Search product..."
                  isSearchable
                  value={
                    productOptions.find(
                      (p) =>
                        p.value ===
                        Number(productId)
                    ) || null
                  }
                  onChange={(selected) => {
                    if (!selected) return;

                    setProductId(
                      String(selected.value)
                    );
                    setAdjUnitMode("base");
                  }}
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"  
                />

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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

{hasConversion && (
  <div className="flex gap-2">
    <button
      type="button"
      className={`flex-1 border rounded-lg py-2 text-sm ${
        adjUnitMode === "base" ? "bg-blue-50 border-blue-400" : ""
      }`}
      onClick={() => setAdjUnitMode("base")}
    >
      Adjust in base unit
    </button>
    <button
      type="button"
      className={`flex-1 border rounded-lg py-2 text-sm ${
        adjUnitMode === "conversion" ? "bg-blue-50 border-blue-400" : ""
      }`}
      onClick={() => setAdjUnitMode("conversion")}
    >
      Adjust in {selectedProductObj?.conversion_unit}
    </button>
  </div>
)}

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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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