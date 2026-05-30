"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";
import { logStockMovement } from "@/lib/logStockMovement";

type Product = {
  id: number;

  name: string;

  stock_quantity: number;

  buying_price: number;

  selling_price: number;
};

type Sale = {
  id: number;
  product_id: number;
  quantity: number;
  selling_price: number;
  total_amount: number;
  cost_amount: number;
  profit: number;
  sale_date: string;
  created_at: string;
  products: {
    name: string;
  };
};

export default function SalesPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [sales, setSales] =
    useState<Sale[]>([]);

  const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);

  const [editingSale, setEditingSale] =
    useState<Sale | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [sellingPrice, setSellingPrice] =
    useState("");

  const [saleDate, setSaleDate] =
    useState("");

  const [permissions, setPermissions] =
  useState<any>(null);

  // FETCH PRODUCTS
  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  async function loadPermissions() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Get user's role
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error(
        "Failed loading profile",
        profileError
      );
      return;
    }

    const role = profile.role;

    // Get permissions for sales page
    const {
      data: permission,
      error: permissionError,
    } = await supabase
      .from("permissions")
      .select("*")
      .eq("role", role)
      .eq("page", "products")
      .single();

    if (permissionError) {
      console.error(
        "Failed loading permissions",
        permissionError
      );
      return;
    }

    setPermissions(permission);
  } catch (err) {
    console.error(err);
  }
}
  // FETCH SALES
  async function fetchSales() {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          *,
          products(name)
        `)
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setSales(data || []);
  }

  useEffect(() => {
    fetchProducts();
    fetchSales();
    loadPermissions();
  }, []);

  // CLEAR FORM
  function clearForm() {
    setSelectedProduct("");

    setQuantity("");

    setSellingPrice("");

    setSaleDate("");
  }

  // SAVE SALE
  async function saveSale() {
    const qty = Number(quantity);

    const finalSellingPrice =
      Number(sellingPrice);

    if (
      !selectedProduct ||
      qty <= 0 ||
      finalSellingPrice <= 0
    ) {
      alert("Fill all fields");

      return;
    }

    const product = products.find(
      (p) =>
        p.id === Number(selectedProduct)
    );

    if (!product) return;

    // CHECK STOCK
    if (qty > product.stock_quantity) {
      alert("Not enough stock");

      return;
    }

   // TOTAL
    const total =
      finalSellingPrice * qty;

      // COST OF GOODS SOLD (COGS)
    const costAmount =
       product.buying_price * qty;

    // PROFIT
    const profit =
       total - costAmount;

    // NEW STOCK
    const newStock =
      product.stock_quantity - qty;

    // SAVE SALE
    const businessId = await getBusinessId();

    const { error } = await supabase
      .from("sales")
      .insert([
        {
           business_id: businessId,
          product_id:
            Number(selectedProduct),

          quantity: qty,

          selling_price:
            finalSellingPrice,

          total_amount: total,
          cost_amount: costAmount,
          profit,

          sale_date: saleDate,
        },
      ]);

    if (error) {
      console.error(error);

      alert("Failed to save sale");

      return;
      
    }

    // UPDATE STOCK
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

      await logStockMovement(
      Number(selectedProduct),
      "sale",
      -qty
      );
      
    clearForm();
    setIsOpen(false);
    fetchProducts();
    fetchSales();
  }

  // OPEN EDIT MODAL
  function openEditModal(sale: Sale) {
    setEditingSale(sale);

    setSelectedProduct(
      String(sale.product_id)
    );

    setQuantity(
      String(sale.quantity)
    );

    setSellingPrice(
      String(sale.selling_price)
    );

    setSaleDate(
      sale.sale_date || ""
    );

    setIsOpen(true);
  }

  // UPDATE SALE
  async function updateSale() {
    if (!permissions?.can_edit) {
    alert("Permission denied");
    return;
  }

    if (!editingSale) return;

    const qty = Number(quantity);

    const finalSellingPrice =
      Number(sellingPrice);

    const product = products.find(
      (p) =>
        p.id === Number(selectedProduct)
    );

    if (!product) return;

    // REVERSE OLD STOCK
    const reversedStock =
      product.stock_quantity +
      editingSale.quantity;

    // CHECK STOCK
    if (qty > reversedStock) {
      alert("Not enough stock");

      return;
    }

    // FINAL STOCK
    const finalStock =
      reversedStock - qty;

    // TOTAL
    const total =
      finalSellingPrice * qty;

    // COST OF GOODS SOLD
    const costAmount =
        product.buying_price * qty;  

    // PROFIT
    const profit =
    total - costAmount;

    // UPDATE SALE
    const { error } = await supabase
      .from("sales")
      .update({
        quantity: qty,

        selling_price:
          finalSellingPrice,

        total_amount: total,
        cost_amount: costAmount,
        profit,

        sale_date: saleDate,
      })
      .eq("id", editingSale.id);

    if (error) {
      console.error(error);

      alert("Failed to update sale");

      return;
    }

    // UPDATE STOCK
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

    clearForm();
    setEditingSale(null);
    setIsOpen(false);
    fetchProducts();
    fetchSales();
  }

  // DELETE SALE
  async function deleteSale(sale: Sale) {

    if (!permissions?.can_delete) {
    alert("Permission denied");
    return;
    }
    const confirmDelete = confirm(
      "Delete this sale?"
    );

    if (!confirmDelete) return;

    const product = products.find(
      (p) =>
        p.id === sale.product_id
    );

    if (!product) return;

    // RESTORE STOCK
    const restoredStock =
      product.stock_quantity +
      sale.quantity;

    // UPDATE PRODUCT
    const { error: stockError } =
      await supabase
        .from("products")
        .update({
          stock_quantity:
            restoredStock,
        })
        .eq("id", product.id);

    if (stockError) {
      console.error(stockError);

      return;
    }

    // DELETE SALE
    const { error } = await supabase
      .from("sales")
      .delete()
      .eq("id", sale.id);

    if (error) {
      console.error(error);

      return;
    }

    setSelectedSale(null);

    fetchProducts();

    fetchSales();
  }

  // SEARCH
  const filteredSales =
    sales.filter((sale) =>
      sale.products?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Sales
        </h1>

        <p className="text-gray-500 mt-1">
          Manage product sales
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-3">
          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingSale(null);

              setIsOpen(true);
            }}
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedSale}
            onClick={() =>
              selectedSale &&
              openEditModal(
                selectedSale
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE */}
          {permissions?.can_delete && (
          <button
            disabled={!selectedSale}
            onClick={() =>
              selectedSale &&
              deleteSale(
                selectedSale
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Delete
          </button>
          )}
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search sales..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border px-2 py-1.5 rounded-md w-56 text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
       <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="text-left p-2 border border-gray-200">
                  Product
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Quantity
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Selling Price
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Total
                </th>

                <th className="text-left p-2 border border-gray-200">
                   Cost
                </th>
                <th className="text-left p-2 border border-gray-200">
                  Profit
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Sale Date
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Posting Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.map(
                (sale) => (
                  <tr
                    key={sale.id}
                    onClick={() =>
                      setSelectedSale(
                        sale
                      )
                    }
                    className={`border-t cursor-pointer hover:bg-gray-50 ${
                      selectedSale?.id ===
                      sale.id
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <td className="p-2 text-gray-700 border border-gray-200">
                      {
                        sale.products?.name
                      }
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {sale.quantity}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatCurrency(
                        sale.selling_price
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatCurrency(
                        sale.total_amount
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                       {formatCurrency(
                        sale.cost_amount
                       )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      <span
                        className={`text-sm font-medium ${
                          sale.profit >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(
                          sale.profit || 0
                        )}
                      </span>
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(sale.sale_date)}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(sale.created_at)}
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
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingSale
                ? "Edit Sale"
                : "Add Sale"}
            </Dialog.Title>

            <div className="space-y-3">
              {/* PRODUCT */}
              <select
                value={selectedProduct}
                onChange={(e) => {
                  const productId =
                    e.target.value;

                  setSelectedProduct(
                    productId
                  );

                  const product =
                    products.find(
                      (p) =>
                        p.id ===
                        Number(
                          productId
                        )
                    );

                  if (product) {
                    setSellingPrice(
                      String(
                        product.selling_price
                      )
                    );
                  }
                }}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">
                  Select Product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={product.id}
                      value={
                        product.id
                      }
                    >
                      {product.name} (
                      Stock:{" "}
                      {
                        product.stock_quantity
                      }
                      )
                    </option>
                  )
                )}
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

              {/* SELLING PRICE */}
              <input
                type="number"
                placeholder="Selling Price"
                value={sellingPrice}
                onChange={(e) =>
                  setSellingPrice(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* DATE */}
              <input
                type="date"
                value={saleDate}
                onChange={(e) =>
                  setSaleDate(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* PREVIEW */}
              {selectedProduct &&
                quantity &&
                sellingPrice && (
                  <div className="bg-gray-50 border rounded-lg p-3 text-sm space-y-1">
                    {(() => {
                      const product =
                        products.find(
                          (p) =>
                            p.id ===
                            Number(
                              selectedProduct
                            )
                        );

                      if (!product)
                        return null;

                      const qty =
                        Number(quantity);

                      const finalSellingPrice =
                        Number(
                          sellingPrice
                        );

                      const total =
                        qty *
                        finalSellingPrice;

                      const costAmount =
                        qty *
                        product.buying_price;

                      const profit =
                        total - costAmount;

                      return (
                        <>
                          <p>
                            Selling
                            Price:
                            <strong>
                              {" "}
                              {formatCurrency(
                                finalSellingPrice
                              )}
                            </strong>
                          </p>

                          <p>
                            Total:
                            <strong>
                              {" "}
                              {formatCurrency(
                                total
                              )}
                            </strong>
                          </p>
                         
                          <p>
                             Cost:
                            <strong>
                             {" "}
                             {formatCurrency(
                               costAmount
                             )}
                           </strong>
                           </p>

                          <p>
                            Profit:
                            <strong>
                              {" "}
                              {formatCurrency(
                                profit
                              )}
                            </strong>
                          </p>
                        </>
                      );
                    })()}
                  </div>
                )}

              {/* SAVE BUTTON */}
              <button
                onClick={
                  editingSale
                    ? updateSale
                    : saveSale
                }
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingSale
                  ? "Update Sale"
                  : "Save Sale"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}