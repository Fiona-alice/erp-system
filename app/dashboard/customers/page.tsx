"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  national_id: string;
  created_at: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [nationalId, setNationalId] =
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
        .eq("business_id", businessId) 
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setCustomers(data || []);
  }

  useEffect(() => {
    loadBusiness();
    loadPermissions();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchCustomers();
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

    // Get permissions for products page
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
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setNationalId("");
  }

  // SAVE CUSTOMER
  async function saveCustomer() {
    if (!name) {
      alert("Customer name required");
      return;
    }

    const businessId = await getBusinessId();
    const { error } = await supabase
      .from("customers")
      .insert([
        {
          business_id: businessId,
          name,
          phone,
          email,
          address,
          national_id: nationalId,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Failed to save customer");
      return;
    }

    clearForm();

    setIsOpen(false);

    fetchCustomers();
  }

  // OPEN EDIT
  function openEditModal(
    customer: Customer
  ) {
    setEditingCustomer(customer);

    setName(customer.name);

    setPhone(customer.phone || "");

    setEmail(customer.email || "");

    setAddress(customer.address || "");

    setNationalId( customer.national_id || "");

    setIsOpen(true);
  }

  // UPDATE CUSTOMER
  async function updateCustomer() {
    if (!editingCustomer) return;

    const { error } = await supabase
      .from("customers")
      .update({
        name,
        phone,
        email,
        address,
        national_id: nationalId,
      })
      .eq("id", editingCustomer.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);
      alert("Failed to update customer");
      return;
    }

    clearForm();

    setEditingCustomer(null);

    setIsOpen(false);

    fetchCustomers();
  }

  // DELETE CUSTOMER
  async function deleteCustomer(customer: Customer) {

    if (!permissions?.can_delete) {
    alert("Permission denied");
    return;
    }
    const confirmDelete = confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", customer.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setSelectedCustomer(null);

    fetchCustomers();
  }

  // SEARCH FILTER
  const filteredCustomers =
    customers.filter((customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Customers
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer records
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-2">
          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingCustomer(null);

              setIsOpen(true);
            }}
            className="border bg-gray-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedCustomer}
            onClick={() =>
              selectedCustomer &&
              openEditModal(
                selectedCustomer
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE */}
          {permissions?.can_delete && (
          <button
            disabled={!selectedCustomer}
            onClick={() =>
              selectedCustomer &&
              deleteCustomer(
                selectedCustomer
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
          placeholder="Search customers..."
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
                Name
              </th>

              <th className="text-left p-2 border border-gray-200">
                Phone
              </th>

              <th className="text-left p-2 border border-gray-200">
                National ID
              </th>
              <th className="text-left p-2 border border-gray-200">
                Email
              </th>

              <th className="text-left p-2 border border-gray-200">
                Address
              </th>

              <th className="text-left p-2 border border-gray-200">
                Date 
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  onClick={() =>
                    setSelectedCustomer(
                      customer
                    )
                  }
                  className={`border-t cursor-pointer hover:bg-gray-50 ${
                    selectedCustomer?.id ===
                    customer.id
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  <td className="p-2 text-gray-700 border border-gray-200">
                    {customer.name}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {customer.phone}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                   {customer.national_id}
                  </td>
                  <td className="p-2 text-gray-700 border border-gray-200">
                    {customer.email}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {customer.address}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(customer.created_at)}
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
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingCustomer
                ? "Edit Customer"
                : "Add Customer"}
            </Dialog.Title>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
               type="text"
               placeholder="National ID Number"
               value={nationalId}
               onChange={(e) =>
               setNationalId(e.target.value)
               }
               className="w-full border p-3 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="w-full border p-3 rounded-lg"
              />

              <button
                onClick={
                  editingCustomer
                    ? updateCustomer
                    : saveCustomer
                }
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingCustomer
                  ? "Update Customer"
                  : "Save Customer"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}