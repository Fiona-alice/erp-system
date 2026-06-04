"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";
import { useRouter } from "next/navigation";
import { getBusinessType } from "@/lib/getBusinessType";


type Service = {
  id: number;
  name: string;
  cost_price: number;
  selling_price: number;
};

type ServiceSale = {
  id: number;
  service_id: number;
  quantity: number;
  selling_price: number;
  total_amount: number;
  cost_amount: number;
  profit: number;
  service_date: string;
  created_at: string;
  services: {
    name: string;
  };
};

export default function ServiceSalesPage() {
  const [services, setServices] =
    useState<Service[]>([]);

  const [serviceSales, setServiceSales] =
    useState<ServiceSale[]>([]);

  const [selectedServiceSale, setSelectedServiceSale] =
    useState<ServiceSale | null>(null);

  const [editingServiceSale, setEditingServiceSale] =
    useState<ServiceSale | null>(null);
    
  const [quantity, setQuantity] =
  useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [selectedService, setSelectedService] =
    useState("");

  const [sellingPrice, setSellingPrice] =
    useState("");

  const [serviceDate, setServiceDate] =
    useState("");

  const [permissions, setPermissions] =
  useState<any>(null);

  const [businessId, setBusinessId] = useState<string>("");
  const router = useRouter();

   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);
  }

  async function validateBusinessType() {
  const type =
    await getBusinessType();

  if (type !== "salon") {
    router.push(
      "/dashboard"
    );
  }
}

  // FETCH SERVICES
  async function fetchServices() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("services")
        .select("*")
        .eq("business_id", businessId) 

    if (error) {
      console.error(error);
      return;
    }

    setServices(data || []);
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

    // Get permissions for service sales page
    const {
      data: permission,
      error: permissionError,
    } = await supabase
      .from("permissions")
      .select("*")
      .eq("role", role)
      .eq("page", "services")
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
  // FETCH SERVICE SALES
  async function fetchServiceSales() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("service_sales")
        .select(`
          *,
          services(name)
        `)
        .eq("business_id", businessId) 
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setServiceSales(data || []);
  }

 useEffect(() => {
     loadBusiness();
     loadPermissions();
     validateBusinessType();
   }, []);
 
   useEffect(() => {
     if (businessId) {
       fetchServices();
       fetchServiceSales();
     }
   }, [businessId]);

  // CLEAR FORM
  function clearForm() {
    setSelectedService("");
    setQuantity("");
    setSellingPrice("");
    setServiceDate("");
  }

  // SAVE SERVICE
  async function saveServiceSale() {
    const qty = Number(quantity);

    const finalSellingPrice =
      Number(sellingPrice);

    if (
      !selectedService ||
      qty <= 0 ||
      finalSellingPrice <= 0
    ) {
      alert("Fill all fields");

      return;
    }

    const service = services.find(
      (p) =>
        p.id === Number(selectedService)
    );

    if (!service) return;

    
   // TOTAL
    const total =
      finalSellingPrice * qty;

      // COST OF GOODS SOLD (COGS)
    const costAmount =
       service.cost_price * qty;

    // PROFIT
    const profit =
       total - costAmount;

    // SAVE SALE
    const businessId = await getBusinessId();

    const { error } = await supabase
      .from("service_sales")
      .insert([
        {
           business_id: businessId,
          service_id:
            Number(selectedService),

          quantity: qty,

          selling_price:
            finalSellingPrice,

          total_amount: total,
          cost_amount: costAmount,
          profit,

          service_date: serviceDate,
        },
      ]);

    if (error) {
      console.error(error);

      alert("Failed to save sale");

      return;
      
    }

        
    clearForm();
    setIsOpen(false);
    fetchServices();
    fetchServiceSales();
  }

  // OPEN EDIT MODAL
  function openEditModal(serviceSale: ServiceSale) {
    setEditingServiceSale(serviceSale);

    setSelectedService(
      String(serviceSale.service_id)
    );

    setQuantity(
      String(serviceSale.quantity)
    );

    setSellingPrice(
      String(serviceSale.selling_price)
    );

    setServiceDate(
      serviceSale.service_date || ""
    );

    setIsOpen(true);
  }

  // UPDATE SALE
  async function updateServiceSale() {
    if (!permissions?.can_edit) {
    alert("Permission denied");
    return;
  }

    if (!editingServiceSale) return;

    const qty = Number(quantity);

    const finalSellingPrice =
      Number(sellingPrice);

    const service = services.find(
      (p) =>
        p.id === Number(selectedService)
    );

    if (!service) return;

    // TOTAL
    const total =
      finalSellingPrice * qty;

    // COST OF GOODS SOLD
    const costAmount =
        service.cost_price * qty;  

    // PROFIT
    const profit =
    total - costAmount;

    // UPDATE SERVICE SALE
    const { error } = await supabase
      .from("service_sales")
      .update({
        quantity: qty,

        selling_price:
          finalSellingPrice,

        total_amount: total,
        cost_amount: costAmount,
        profit,

        service_date: serviceDate,
      })
      .eq("id", editingServiceSale.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);

      alert("Failed to update service sale");

      return;
    }

    clearForm();
    setEditingServiceSale(null);
    setIsOpen(false);
    fetchServices();
    fetchServiceSales();
  }

  // DELETE SALE
  async function deleteServiceSale(serviceSale: ServiceSale) {

    if (!permissions?.can_delete) {
    alert("Permission denied");
    return;
    }
    const confirmDelete = confirm(
      "Delete this service sale?"
    );

    if (!confirmDelete) return;

    const service = services.find(
      (p) =>
        p.id === serviceSale.service_id
    );

    if (!service) return;



    // DELETE SALE
    const { error } = await supabase
      .from("service_sales")
      .delete()
      .eq("id", service.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);

      return;
    }

    setSelectedServiceSale(null);

    fetchServices();

    fetchServiceSales();
  }

  // SEARCH
  const filteredServiceSales =
    serviceSales.filter((service_sales) =>
      service_sales.services?.name
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
          Service Sales
        </h1>

        <p className="text-gray-500 mt-1">
          Manage Salon sales
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-3">
          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingServiceSale(null);

              setIsOpen(true);
            }}
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedServiceSale}
            onClick={() =>
              selectedServiceSale &&
              openEditModal(
                selectedServiceSale
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE */}
          {permissions?.can_delete && (
          <button
            disabled={!selectedServiceSale}
            onClick={() =>
              selectedServiceSale &&
              deleteServiceSale(
                selectedServiceSale
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
                  Service
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
                  Service Date
                </th>

                <th className="text-left p-2 border border-gray-200">
                  Posting Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredServiceSales.map(
                (service_sales) => (
                  <tr
                    key={service_sales.id}
                    onClick={() =>
                      setSelectedServiceSale(
                        service_sales
                      )
                    }
                    className={`border-t cursor-pointer hover:bg-gray-50 ${
                      selectedServiceSale?.id ===
                      service_sales.id
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <td className="p-2 text-gray-700 border border-gray-200">
                      {
                        service_sales.services?.name
                      }
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {service_sales.quantity}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatCurrency(
                        service_sales.selling_price
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      {formatCurrency(
                        service_sales.total_amount
                      )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                       {formatCurrency(
                        service_sales.cost_amount
                       )}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                      <span
                        className={`text-sm font-medium ${
                          service_sales.profit >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(
                          service_sales.profit || 0
                        )}
                      </span>
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(service_sales.service_date)}
                    </td>

                    <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(service_sales.created_at)}
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
              {editingServiceSale
                ? "Edit Sale"
                : "Add Sale"}
            </Dialog.Title>

            <div className="space-y-3">

              {/* SERVICE */}

              <select
                value={selectedService}
                onChange={(e) => {
                    const serviceId =
                    e.target.value;

                    setSelectedService(
                    serviceId
                    );

                    const service =
                    services.find(
                        (s) =>
                        s.id ===
                        Number(serviceId)
                    );

                        if (service) {
                        setSellingPrice(
                            String(
                            service.selling_price
                            )
                        );
                        }
                    }}
                    className="w-full border p-3 rounded-lg"
                    >
                    <option value="">
                        Select Service
                    </option>

                    {services.map((service) => (
                        <option
                        key={service.id}
                        value={service.id}
                        >
                        {service.name}
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
                value={serviceDate}
                onChange={(e) =>
                  setServiceDate(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* PREVIEW */}
              {selectedService &&
                quantity &&
                sellingPrice && (
                  <div className="bg-gray-50 border rounded-lg p-3 text-sm space-y-1">
                    {(() => {
                      const service =
                        services.find(
                          (p) =>
                            p.id ===
                            Number(
                              selectedService
                            )
                        );

                      if (!service)
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
                        service.cost_price;

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
                  editingServiceSale
                    ? updateServiceSale
                    : saveServiceSale
                }
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingServiceSale
                  ? "Update Service Sale"
                  : "Save Service Sale"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}