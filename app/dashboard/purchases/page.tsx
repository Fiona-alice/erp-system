"use client";

import { useEffect, useState } from "react";
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

type Purchase = {
  id: number;
  product_id: number;
  quantity: number;

  buying_price: number;

  total_amount: number;

  purchase_date: string;

  created_at: string;

  products: {
    name: string;
  };
};

export default function PurchasesPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

  const [selectedPurchase, setSelectedPurchase] =
    useState<Purchase | null>(null);

  const [editingPurchase, setEditingPurchase] =
    useState<Purchase | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /*
    FORM STATES
  */

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [invoiceAmount, setInvoiceAmount] =
    useState("");

  const [shippingCost, setShippingCost] =
    useState("");

  const [otherCost, setOtherCost] =
    useState("");

  const [purchaseDate, setPurchaseDate] =
    useState("");

  /*
    FETCH PRODUCTS
  */

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

  /*
    FETCH PURCHASES
  */

  async function fetchPurchases() {
    const { data, error } =
      await supabase
        .from("purchases")
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

    setPurchases(data || []);
  }

  useEffect(() => {
    fetchProducts();
    fetchPurchases();
  }, []);

  /*
    CLEAR FORM
  */

  function clearForm() {
    setSelectedProduct("");

    setQuantity("");

    setInvoiceAmount("");

    setShippingCost("");

    setOtherCost("");

    setPurchaseDate("");
  }

  /* SAVE PURCHASE */

  async function savePurchase() {
    const qty =
      Number(quantity);

    const invoice =
      Number(invoiceAmount);

    const shipping =
      Number(shippingCost || 0);

    const other =
      Number(otherCost || 0);

    const total =
      invoice +
      shipping +
      other;

    if (
      !selectedProduct ||
      qty <= 0 ||
      total <= 0
    ) {
      alert("Fill all fields");
      return;
    }

    const unitCost =
      total / qty;

    const product =
      products.find(
        (p) =>
          p.id ===
          Number(selectedProduct)
      );

    if (!product) return;

    /*
      CURRENT INVENTORY VALUE
    */

    const currentInventoryValue =
      product.stock_quantity *
      product.buying_price;

    /*
      NEW STOCK
    */

    const newStock =
      product.stock_quantity +
      qty;

    /*
      NEW AVG COST
    */

    const newAverageCost =
      (
        currentInventoryValue +
        total
      ) / newStock;

    /*
      SAVE PURCHASE
    */
    const businessId = await getBusinessId();
    const { error } =
      await supabase
        .from("purchases")
        .insert([
          {
            business_id: businessId,
            product_id:
              Number(
                selectedProduct
              ),

            quantity: qty,

            buying_price:
              Number(
                unitCost.toFixed(2)
              ),

            total_amount:
              total,

            purchase_date:
              purchaseDate,
          },
        ]);

    if (error) {
      console.error(error);

      alert(
        "Failed to save purchase"
      );

      return;
    }

    /*
      UPDATE PRODUCT
    */

    const {
      error: updateError,
    } = await supabase
      .from("products")
      .update({
        stock_quantity:
          newStock,

        buying_price:
          Number(
            newAverageCost.toFixed(
              2
            )
          ),
      })
      .eq("id", product.id);

    if (updateError) {
      console.error(updateError);

      alert(
        "Failed to update stock"
      );

      return;
    }

    await logStockMovement(
      product.id,
      "purchase",
      qty,
      undefined,
      "Purchase received"
    );
    
    clearForm();

    setIsOpen(false);

    fetchProducts();

    fetchPurchases();
  }

  /*
    OPEN EDIT MODAL
  */

  function openEditModal(
    purchase: Purchase
  ) {
    setEditingPurchase(
      purchase
    );

    setSelectedProduct(
      String(
        purchase.product_id
      )
    );

    setQuantity(
      String(
        purchase.quantity
      )
    );

    setInvoiceAmount(
      String(
        purchase.total_amount
      )
    );

    setShippingCost("");

    setOtherCost("");

    setPurchaseDate(
      purchase.purchase_date
    );

    setIsOpen(true);
  }

  /*
    UPDATE PURCHASE
  */

  async function updatePurchase() {
    if (!editingPurchase) return;

    const qty =
      Number(quantity);

    const invoice =
      Number(invoiceAmount);

    const shipping =
      Number(shippingCost || 0);

    const other =
      Number(otherCost || 0);

    const total =
      invoice +
      shipping +
      other;

    const unitCost =
      total / qty;

    /*
      FIND PRODUCT
    */

    const product =
      products.find(
        (p) =>
          p.id ===
          Number(
            selectedProduct
          )
      );

    if (!product) return;

    /*
      REVERSE OLD PURCHASE
    */

    const stockBeforeEdit =
      product.stock_quantity -
      editingPurchase.quantity;

    const inventoryValueBeforeEdit =
      stockBeforeEdit *
      product.buying_price;

    /*
      APPLY NEW PURCHASE
    */

    const finalStock =
      stockBeforeEdit +
      qty;

    const finalInventoryValue =
      inventoryValueBeforeEdit +
      total;

    /*
      NEW AVG COST
    */

    const newAverageCost =
      finalInventoryValue /
      finalStock;

    /*
      UPDATE PURCHASE
    */

    const { error } =
      await supabase
        .from("purchases")
        .update({
          quantity: qty,

          buying_price:
            Number(
              unitCost.toFixed(2)
            ),

          total_amount:
            total,

          purchase_date:
            purchaseDate,
        })
        .eq(
          "id",
          editingPurchase.id
        );

    if (error) {
      console.error(error);

      alert(
        "Failed to update purchase"
      );

      return;
    }

    /*
      UPDATE PRODUCT
    */

    const {
      error: stockError,
    } = await supabase
      .from("products")
      .update({
        stock_quantity:
          finalStock,

        buying_price:
          Number(
            newAverageCost.toFixed(
              2
            )
          ),
      })
      .eq("id", product.id);

    if (stockError) {
      console.error(stockError);
      return;
    }

    clearForm();

    setEditingPurchase(null);

    setIsOpen(false);

    fetchProducts();

    fetchPurchases();
  }

  /*
    DELETE PURCHASE
  */

  async function deletePurchase(
    purchase: Purchase
  ) {
    const confirmDelete =
      confirm(
        "Delete this purchase?"
      );

    if (!confirmDelete) return;

    const product =
      products.find(
        (p) =>
          p.id ===
          purchase.product_id
      );

    if (!product) return;

    /*
      REVERSE STOCK
    */

    const newStock =
      product.stock_quantity -
      purchase.quantity;

    /*
      UPDATE PRODUCT
    */

    const {
      error: stockError,
    } = await supabase
      .from("products")
      .update({
        stock_quantity:
          newStock,
      })
      .eq("id", product.id);

    if (stockError) {
      console.error(stockError);
      return;
    }

    /*
      DELETE PURCHASE
    */

    const { error } =
      await supabase
        .from("purchases")
        .delete()
        .eq(
          "id",
          purchase.id
        );

    if (error) {
      console.error(error);
      return;
    }

    setSelectedPurchase(null);

    fetchProducts();

    fetchPurchases();
  }

  /*
    SEARCH FILTER
  */

  const filteredPurchases =
    purchases.filter(
      (purchase) =>
        purchase.products?.name
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
          Purchases
        </h1>

        <p className="text-gray-500 mt-1">
          Manage inventory purchases
        </p>

      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">

        <div className="flex gap-2">

          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingPurchase(
                null
              );

              setIsOpen(true);
            }}
            className="border bg-gray-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={
              !selectedPurchase
            }
            onClick={() =>
              selectedPurchase &&
              openEditModal(
                selectedPurchase
              )
            }
             className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            disabled={
              !selectedPurchase
            }
            onClick={() =>
              selectedPurchase &&
              deletePurchase(
                selectedPurchase
              )
            }
             className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Delete
          </button>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search purchases..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border border-gray-100 px-2 py-1.5 rounded-md w-56 text-sm"
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
                  Unit Cost
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Total Amount
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Purchase Date
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Posting Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPurchases.map(
                (purchase) => (

                  <tr
                    key={purchase.id}
                    onClick={() =>
                      setSelectedPurchase(
                        purchase
                      )
                    }
                    className={`cursor-pointer hover:bg-gray-50 ${
                      selectedPurchase?.id ===
                      purchase.id
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {
                        purchase
                          .products?.name
                      }
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {
                        purchase.quantity
                      }
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        purchase.buying_price
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      UGX{" "}
                      {formatCurrency(
                        purchase.total_amount
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatDate(
                        purchase.purchase_date
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatDate(
                        purchase.created_at
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

            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingPurchase
                ? "Edit Purchase"
                : "Add Purchase"}
            </Dialog.Title>

            <div className="space-y-3">

              {/* PRODUCT */}
              <select
                value={
                  selectedProduct
                }
                onChange={(e) =>
                  setSelectedProduct(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              >

                <option value="">
                  Select Product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={
                        product.id
                      }
                      value={
                        product.id
                      }
                    >
                      {
                        product.name
                      }
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

              {/* INVOICE */}
              <input
                type="number"
                placeholder="Invoice Amount"
                value={
                  invoiceAmount
                }
                onChange={(e) =>
                  setInvoiceAmount(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* SHIPPING */}
              <input
                type="number"
                placeholder="Shipping / Freight"
                value={
                  shippingCost
                }
                onChange={(e) =>
                  setShippingCost(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* OTHER COST */}
              <input
                type="number"
                placeholder="Other Landed Costs"
                value={otherCost}
                onChange={(e) =>
                  setOtherCost(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* DATE */}
              <input
                type="date"
                value={
                  purchaseDate
                }
                onChange={(e) =>
                  setPurchaseDate(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* COST PREVIEW */}
              {quantity &&
                invoiceAmount && (

                  <div className="bg-gray-50 border rounded-lg p-3 text-sm space-y-1">

                    {(() => {

                      const invoice =
                        Number(
                          invoiceAmount || 0
                        );

                      const shipping =
                        Number(
                          shippingCost || 0
                        );

                      const other =
                        Number(
                          otherCost || 0
                        );

                      const qty =
                        Number(
                          quantity || 0
                        );

                      const landedTotal =
                        invoice +
                        shipping +
                        other;

                      const unitCost =
                        qty > 0
                          ? landedTotal /
                            qty
                          : 0;

                      return (
                        <>

                          <p>
                            Invoice:
                            <strong>
                              {" "}
                              UGX{" "}
                              {formatCurrency(
                                invoice
                              )}
                            </strong>
                          </p>

                          <p>
                            Shipping:
                            <strong>
                              {" "}
                              UGX{" "}
                              {formatCurrency(
                                shipping
                              )}
                            </strong>
                          </p>

                          <p>
                            Other Costs:
                            <strong>
                              {" "}
                              UGX{" "}
                              {formatCurrency(
                                other
                              )}
                            </strong>
                          </p>

                          <hr />

                          <p>
                            Landed Total:
                            <strong>
                              {" "}
                              UGX{" "}
                              {formatCurrency(
                                landedTotal
                              )}
                            </strong>
                          </p>

                          <p>
                            Unit Cost:
                            <strong>
                              {" "}
                              UGX{" "}
                              {formatCurrency(
                                unitCost
                              )}
                            </strong>
                          </p>

                        </>
                      );
                    })()}

                  </div>

                )}

              {/* BUTTON */}
              <button
                onClick={
                  editingPurchase
                    ? updatePurchase
                    : savePurchase
                }
                className="w-full bg-gray-100 text-blue-900 border border-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingPurchase
                  ? "Update Purchase"
                  : "Save Purchase"}
              </button>

            </div>

          </Dialog.Panel>

        </div>

      </Dialog>

    </div>
  );
}