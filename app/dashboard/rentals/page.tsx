"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";
import { logStockMovement } from "@/lib/logStockMovement";
import { Search, X } from "lucide-react";
import Select from "react-select";

type Customer = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  stock_quantity: number;
};

type Rental = {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  rental_fee: number;
  total_amount: number;
  start_date: string;
  return_date: string;
  actual_return_date?: string | null;
  status: string;
  created_at: string;
  customers: {
    name: string;
  };

  products: {
    name: string;
    units?: {
    short_name: string;
  };
  };
};

export default function RentalsPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [rentals, setRentals] =
    useState<Rental[]>([]);

  const [selectedRental, setSelectedRental] =
    useState<Rental | null>(null);

  const [editingRental, setEditingRental] =
    useState<Rental | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [selectedCustomer, setSelectedCustomer] =
    useState("");

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [rentalFee, setRentalFee] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [returnModalOpen, setReturnModalOpen] =
  useState(false);

  const [returnRentalItem, setReturnRentalItem] =
  useState<Rental | null>(null);

  const [actualReturnDate, setActualReturnDate] =
  useState("");  

  const [permissions, setPermissions] =
  useState<any>(null);  

  const [businessId, setBusinessId] = useState<string>("");

   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);
  }

  // FETCH CUSTOMERS
  async function fetchCustomers() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setCustomers(data || []);
  }

  // FETCH PRODUCTS
  async function fetchProducts() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  // FETCH RENTALS
  async function fetchRentals() {
  // AUTO-MARK LATE (ONCE ONLY)
  if (!businessId) return;

  const { error: updateError } = await supabase
    .from("rentals")
    .update({ status: "late" })
    .lt("return_date", new Date().toISOString())
    .eq("status", "ongoing")
    .eq("business_id", businessId);

  if (updateError) {
    console.error("Late update error:", updateError);
  }

  // FETCH DATA
  const { data, error } = await supabase
    .from("rentals")
    .select(`
      *,
      customers(name),
      products(name,
       units (
      short_name
    )
      )
    `)
    .eq("business_id", businessId)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setRentals(data || []);
}

 useEffect(() => {
     loadBusiness();
     loadPermissions();
   }, []);
 
   useEffect(() => {
     if (businessId) {
       fetchProducts();
       fetchCustomers();
       fetchRentals();
     }
   }, [businessId]);

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
  
      // Get permissions for rental page
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
  // CLEAR FORM
  function clearForm() {
    setSelectedCustomer("");

    setSelectedProduct("");

    setQuantity("");

    setRentalFee("");

    setStartDate("");

    setReturnDate("");
  }

  // SAVE RENTAL
  async function saveRental() {
    const qty = Number(quantity);

    const fee = Number(rentalFee);

    if (
      !selectedCustomer ||
      !selectedProduct ||
      qty <= 0 ||
      fee <= 0
    ) {
      alert("Fill all fields");

      return;
    }

    const product = products.find(
      (p) =>
        p.id === Number(selectedProduct)
    );

    if (!product) return;

    // STOCK CHECK
    if (qty > product.stock_quantity) {
      alert("Not enough stock");

      return;
    }

    const total = qty * fee;

    // SAVE RENTAL
    const businessId = await getBusinessId();
    const { error } = await supabase
      .from("rentals")
      .insert([
        {
           business_id: businessId,
          customer_id:
            Number(selectedCustomer),

          product_id:
            Number(selectedProduct),

          quantity: qty,

          rental_fee: fee,

          total_amount: total,

          start_date: startDate,

          return_date: returnDate,

          status: "ongoing",
        },
      ]);

    if (error) {
      console.error(error);

      alert("Failed to save rental");

      return;
    }

    // REDUCE STOCK
    const newStock =
      product.stock_quantity - qty;

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

    clearForm();

    setIsOpen(false);

    fetchProducts();

    fetchRentals();
  }

  // OPEN EDIT MODAL
  function openEditModal(
    rental: Rental
  ) {
    setEditingRental(rental);

    setSelectedCustomer(
      String(rental.customer_id)
    );

    setSelectedProduct(
      String(rental.product_id)
    );

    setQuantity(
      String(rental.quantity)
    );

    setRentalFee(
      String(rental.rental_fee)
    );

    setStartDate(rental.start_date);

    setReturnDate(rental.return_date);

    setIsOpen(true);
  }

  // UPDATE RENTAL
  async function updateRental() {
    if (!editingRental) return;

    const qty = Number(quantity);

    const fee = Number(rentalFee);

    const product = products.find(
      (p) =>
        p.id === Number(selectedProduct)
    );

    if (!product) return;

    // RESTORE OLD STOCK
    const restoredStock =
      product.stock_quantity +
      editingRental.quantity;

    // CHECK STOCK
    if (qty > restoredStock) {
      alert("Not enough stock");

      return;
    }

    // APPLY NEW RENTAL
    const finalStock =
      restoredStock - qty;

    const total = qty * fee;

    // UPDATE RENTAL
    const { error } = await supabase
      .from("rentals")
      .update({
        customer_id:
          Number(selectedCustomer),

        product_id:
          Number(selectedProduct),

        quantity: qty,

        rental_fee: fee,

        total_amount: total,

        start_date: startDate,

        return_date: returnDate,
      })
      .eq("id", editingRental.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);

      return;
    }

    // UPDATE STOCK
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
      await logStockMovement(
        Number(selectedProduct),
        "rental",
        -qty,
        undefined,
        "Rental issued"
      );

    clearForm();

    setEditingRental(null);

    setIsOpen(false);

    fetchProducts();

    fetchRentals();
  }

  // DELETE RENTAL
  async function deleteRental(rental: Rental) {

    if (!permissions?.can_delete) {
    alert("Permission denied");
    return;
    }
    const confirmDelete = confirm(
      "Delete this rental?"
    );

    if (!confirmDelete) return;

    const product = products.find(
      (p) =>
        p.id === rental.product_id
    );

    if (!product) return;

    // RESTORE STOCK
    const restoredStock =
      product.stock_quantity +
      rental.quantity;

    const { error: stockError } =
      await supabase
        .from("products")
        .update({
          stock_quantity:
            restoredStock,
        })
        .eq("id", product.id)
        .eq("business_id", businessId);

    if (stockError) {
      console.error(stockError);

      return;
    }

    // DELETE RENTAL
    const { error } = await supabase
      .from("rentals")
      .delete()
      .eq("id", rental.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);

      return;
    }

    setSelectedRental(null);

    fetchProducts();

    fetchRentals();
  }

  // RETURN RENTAL
  async function returnRental(
  rental: Rental,
  actualDate: string
) {
  if (rental.status === "returned") {
    alert("Already returned");
    return;
  }

  const product = products.find(
    (p) => p.id === rental.product_id
  );

  if (!product) return;

  const restoredStock =
    product.stock_quantity +
    rental.quantity;

  const { error: stockError } =
    await supabase
      .from("products")
      .update({
        stock_quantity: restoredStock,
      })
      .eq("id", product.id)
      .eq("business_id", businessId);

  if (stockError) {
    console.error(stockError);
    return;
  }

  const expectedDate =
    new Date(rental.return_date);

  const actual =
    new Date(actualDate);

  let status = "returned";

  if (actual > expectedDate) {
    status = "late";
  }

  const { error } =
    await supabase
      .from("rentals")
      .update({
        status,
        actual_return_date: actualDate,
      })
      .eq("id", rental.id)
      .eq("business_id", businessId);

  if (error) {
    console.error(error);
    return;
  }
      await logStockMovement(
        product.id,
        "return",
        rental.quantity,
        rental.id.toString(),
        "Rental returned"
      );
      
  setReturnModalOpen(false);
  setReturnRentalItem(null);

  fetchProducts();
  fetchRentals();

}

  // SEARCH FILTER
  const filteredRentals = rentals.filter((rental) => {
  let displayStatus = "ongoing";

  if (rental.actual_return_date) {
    const expected = new Date(
      rental.return_date
    );

    const actual = new Date(
      rental.actual_return_date
    );

    if (actual < expected) {
      displayStatus = "early return";
    } else if (
      actual.toDateString() ===
      expected.toDateString()
    ) {
      displayStatus = "on time";
    } else {
      displayStatus = "late return";
    }
  }

  const term = search.toLowerCase();

  return (
    rental.customers?.name
      ?.toLowerCase()
      .includes(term) ||
    displayStatus.includes(term)
  );

});

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
          Rentals
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage rented products
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingRental(null);

              setIsOpen(true);
            }}
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-md hover:bg-gray-100 text-sm"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedRental}
            onClick={() =>
              selectedRental &&
              openEditModal(
                selectedRental
              )
            }
           className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Edit
          </button>

          {/* RETURN */}
          <button
            disabled={!selectedRental}
            onClick={() => {
              if (!selectedRental) return;
              setReturnRentalItem(selectedRental);

              setActualReturnDate(
              new Date().toISOString().split("T")[0]
               );

              setReturnModalOpen(true);
             }}
           className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Return
          </button>

          {/* DELETE */}
           {permissions?.can_delete && (
          <button
            disabled={!selectedRental}
            onClick={() =>
              selectedRental &&
              deleteRental(
                selectedRental
              )
            }
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Delete
          </button>
          )}
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
        <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-[800px] w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-3 p-2 border border-gray-200">
                Customer
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Product
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Qty
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Fee
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Total
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Start
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Return Date
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Actual Return Date
              </th>

              <th className="text-left px-3 p-2 border border-gray-200">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRentals.map(
              (rental) => (
                <tr
                  key={rental.id}
                  onClick={() =>
                    setSelectedRental(
                      rental
                    )
                  }
                  className={`border-t cursor-pointer hover:bg-gray-50 ${
                    selectedRental?.id ===
                    rental.id
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {
                      rental.customers
                        ?.name
                    }
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {
                      rental.products
                        ?.name
                    }
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {rental.quantity} {rental.products?.units?.short_name}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    UGX {formatCurrency(rental.rental_fee)}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                   UGX {formatCurrency(rental.total_amount)}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {formatDate(rental.start_date)}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {formatDate(rental.return_date)}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {rental.actual_return_date
                      ? formatDate(rental.actual_return_date)
                      : "-"}
                  </td>

                  <td className="px-3 p-2 text-gray-700 border border-gray-200">
                    {(() => {
                      let label = "Ongoing";
                      let classes =
                        "text-yellow-600";

                      if (rental.actual_return_date) {
                        const expected = new Date(
                          rental.return_date
                        );

                  const actual = new Date(
                    rental.actual_return_date
                  );

                  if (actual < expected) {
                    label = "Early Return";
                    classes =
                      "text-blue-700";
                  } else if (
                    actual.toDateString() ===
                    expected.toDateString()
                  ) {
                    label = "On Time";
                    classes =
                      "text-green-700";
                  } else {
                    label = "Late Return";
                    classes =
                      "text-red-700";
                  }
                }

                  return (
                    <span
                      className={`px-2 py-1 rounded text-sm ${classes}`}
                    >
                      {label}
                    </span>
                  );
                })()}
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
  open={returnModalOpen}
  onClose={() =>
    setReturnModalOpen(false)
  }
  className="relative z-50"
>
  <div className="fixed inset-0 bg-black/40" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
      <Dialog.Title className="text-xl font-bold mb-4">
        Return Rental
      </Dialog.Title>

      <div className="space-y-4">

        <div>
          <label className="block text-sm mb-1">
            Actual Return Date
          </label>

          <input
            type="date"
            value={actualReturnDate}
            onChange={(e) =>
              setActualReturnDate(
                e.target.value
              )
            }
            className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
          />
        </div>

        <button
          onClick={() => {
            if (
              returnRentalItem
            ) {
              returnRental(
                returnRentalItem,
                actualReturnDate
              );
            }
          }}
          className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
        >
          Confirm Return
        </button>

      </div>

    </Dialog.Panel>
  </div>
</Dialog>

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
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingRental
                ? "Edit Rental"
                : "Add Rental"}
            </Dialog.Title>

            <div className="space-y-3">
              {/* CUSTOMER */}
              <select
                value={
                  selectedCustomer
                }
                onChange={(e) =>
                  setSelectedCustomer(
                    e.target.value
                  )
                }
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map(
                  (customer) => (
                    <option
                      key={
                        customer.id
                      }
                      value={
                        customer.id
                      }
                    >
                      {
                        customer.name
                      }
                    </option>
                  )
                )}
              </select>

              {/* PRODUCT */}
              <Select
                  options={productOptions}
                  placeholder="Search product..."
                  isSearchable
                  value={
                    productOptions.find(
                      (p) =>
                        p.value ===
                        Number(
                          selectedProduct
                        )
                    ) || null
                  }
                  onChange={(selected) => {
                    if (!selected) return;

                    setSelectedProduct(
                      String(
                        selected.value
                      )
                    );
                  }}
                  className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
                />

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

              {/* RENTAL FEE */}
              <input
                type="number"
                placeholder="Rental Fee"
                value={rentalFee}
                onChange={(e) =>
                  setRentalFee(
                    e.target.value
                  )
                }
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

              {/* START DATE */}
              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
               className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

              {/* RETURN DATE */}
              <input
                type="date"
                value={returnDate}
                onChange={(e) =>
                  setReturnDate(
                    e.target.value
                  )
                }
               className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

              {/* PREVIEW */}
              {quantity &&
                rentalFee && (
                  <div className="bg-gray-50 border rounded-lg p-3 text-sm">
                    Total Amount:
                    <strong>
                      {" "}
                      UGX{" "}
                      {(
                        Number(
                          quantity
                        ) *
                        Number(
                          rentalFee
                        )
                      ).toFixed(2)}
                    </strong>
                  </div>
                )}

              {/* BUTTON */}
              <button
                onClick={
                  editingRental
                    ? updateRental
                    : saveRental
                }
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingRental
                  ? "Update Rental"
                  : "Save Rental"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}