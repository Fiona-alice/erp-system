"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";
import { formatCurrency } from "@/lib/formatCurrency";
import { useRouter } from "next/navigation";
import { getBusinessType } from "@/lib/getBusinessType";

type Service = {
  id: number;
  name: string;
  cost_price: number;
  selling_price: number;
  business_id: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // form
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [businessId, setBusinessId] = useState<string>("");
  const router = useRouter();

  // ---------------- BUSINESS ----------------
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
  // ---------------- FETCH ----------------
  async function fetchServices() {
    if (!businessId) return;

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("business_id", businessId)
      .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setServices(data || []);
  }

  useEffect(() => {
    loadBusiness();
    validateBusinessType();
  }, []);

  useEffect(() => {
    if (businessId) fetchServices();
  }, [businessId]);

  // ---------------- CLEAR ----------------
  function clearForm() {
    setName("");
    setCostPrice("");
    setSellingPrice("");
  }

  // ---------------- OPEN NEW ----------------
  function openNew() {
    setEditingService(null);
    setSelectedService(null);
    clearForm();
    setIsOpen(true);
  }

  // ---------------- OPEN EDIT ----------------
  function openEdit(service: Service) {
    setEditingService(service);
    setSelectedService(service);

    setName(service.name);
    setCostPrice(service.cost_price.toString());
    setSellingPrice(service.selling_price.toString());

    setIsOpen(true);
  }

  // ---------------- SAVE ----------------
  async function saveService() {
    if (!businessId) return;

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update({
          name,
          cost_price: Number(costPrice),
          selling_price: Number(sellingPrice),
        })
        .eq("id", editingService.id)
        .eq("business_id", businessId);

      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("services").insert([
        {
          business_id: businessId,
          name,
          cost_price: Number(costPrice),
          selling_price: Number(sellingPrice),
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }
    }

    setIsOpen(false);
    clearForm();
    setEditingService(null);
    fetchServices();
  }

  // ---------------- DELETE ----------------
  async function deleteService(service: Service) {
    if (!businessId) return;

    const confirmed = confirm("Delete this service?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", service.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setSelectedService(null);
    fetchServices();
  }

  // ---------------- SEARCH ----------------
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Services</h1>
        <p className="text-gray-500 mt-1">
          Manage Salon Services
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-2">
          <button
            onClick={openNew}
            className="border bg-gray-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            New
          </button>

          <button
            disabled={!selectedService}
            onClick={() =>
              selectedService && openEdit(selectedService)
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          <button
            disabled={!selectedService}
            onClick={() =>
              selectedService && deleteService(selectedService)
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Delete
          </button>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="border px-3 py-1.5 rounded-md"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 border border-gray-200">Service</th>
              <th className="text-left p-2 border border-gray-200">Cost</th>
              <th className="text-left p-2 border border-gray-200">Price</th>
              <th className="text-left p-2 border border-gray-200">Profit</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.map((service) => (
              <tr
                key={service.id}
                onClick={() => setSelectedService(service)}
                onDoubleClick={() => openEdit(service)}
                className={`cursor-pointer border-t hover:bg-gray-50 ${
                  selectedService?.id === service.id ? "bg-blue-50" : ""
                }`}
              >
                <td className="p-2 text-gray-700 border border-gray-200">{service.name}</td>
                <td className="p-2 text-gray-700 border border-gray-200">
                  UGX {formatCurrency(service.cost_price)}
                </td>
                <td className="p-2 text-gray-700 border border-gray-200">
                  UGX {formatCurrency(service.selling_price)}
                </td>
                <td className="p-2 text-gray-700 border border-gray-200">
                 
                  UGX {formatCurrency(service.selling_price - service.cost_price)}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
   </div>
      {/* MODAL */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}
        className="relative z-50">
        
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">
              {editingService ? "Edit Service" : "New Service"}
            </Dialog.Title>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Cost Price"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="Selling Price"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />

            <button
              onClick={saveService}
              className="w-full bg-blue-900 text-white py-2 rounded"
            >
              Save
            </button>
        
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}