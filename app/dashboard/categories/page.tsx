"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";
import { formatDate } from "@/lib/formatDate";

type Category = {
  id: number;
  name: string;
  created_at: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [name, setName] = useState("");

  const [selectedRow, setSelectedRow] =
    useState<Category | null>(null);

  const [businessId, setBusinessId] = useState<string>("");  


   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);
  }

  // FETCH
  async function fetchCategories() {
    if (!businessId) return;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("business_id", businessId) 
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCategories(data || []);
  }

 useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchCategories();
    }
  }, [businessId]);

  // CLEAR FORM
  function clearForm() {
    setName("");
    setSelectedCategory(null);
  }

  // SAVE CATEGORY
  async function saveCategory() {
    if (!name) {
      alert("Enter category name");
      return;
    }
    const businessId = await getBusinessId();
    const { error } = await supabase
      .from("categories")
      .insert([
        {
          business_id: businessId,
          name,
        },
      ]);

    if (error) {
      console.error(error);
       alert(error.message);
      return;
    }

    clearForm();
    setIsOpen(false);
    fetchCategories();
  }

  // OPEN EDIT
  function openEdit(category: Category) {
    setSelectedCategory(category);
    setName(category.name);
    setIsOpen(true);
  }

  // UPDATE CATEGORY
  async function updateCategory() {
    if (!selectedCategory) return;

    const { error } = await supabase
      .from("categories")
      .update({
        name,
      })
      .eq("id", selectedCategory.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);
      alert("Failed to update category");
      return;
    }

    clearForm();
    setSelectedCategory(null);
    setIsOpen(false);
    fetchCategories();
  }

  // DELETE CATEGORY
  async function deleteCategory(category: Category) {
    const confirmDelete = confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(error);
      alert("Failed to delete category");
      return;
    }

    fetchCategories();
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Categories
          </h1>
          <p className="text-gray-500">
            Manage product categories
          </p>
        </div>
      </div>

        <button
          onClick={() => {
            clearForm();
            setIsOpen(true);
          }}
          className="bg-gray-100 text-sm text-blue-900 border px-3 py-1.5 rounded-md hover:bg-gray-200"
        >
          New Category
        </button>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
         <div className="overflow-x-auto">
       <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 border border-gray-200">
                Category Name
              </th>

              <th className="text-left p-2 border border-gray-200">
                Created
              </th>

              <th className="text-left p-2 border border-gray-200">
                Actions
              </th>
            </tr>
          </thead>

      <tbody>
    {categories.map((category) => (
      <tr key={category.id} className="hover:bg-gray-50">
        <td className="p-2 font-medium text-blue-900 border border-gray-200">
          {category.name}
        </td>

        <td className="p-2 text-gray-700 border border-gray-200">
          {formatDate(category.created_at)}
        </td>

        <td className="p-2 border border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => openEdit(category)}
              className="px-2 py-1 bg-gray-100 text-blue-900 border border-gray-200 rounded hover:bg-gray-200"
            >
              Edit
            </button>

            <button
              onClick={() => deleteCategory(category)}
              className="px-2 py-1 bg-gray-100 text-blue-900 border border-gray-200 rounded hover:bg-gray-200"
            >
              Delete
            </button>
          </div>
        </td>
              </tr>
            ))}
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
            <Dialog.Title className="text-xl font-bold mb-4 text-blue-900">
              {selectedCategory
                ? "Edit Category"
                : "Add Category"}
            </Dialog.Title>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Category name"
              className="w-full border p-3 rounded-lg mb-4"
            />

            <button
              onClick={
                selectedCategory
                  ? updateCategory
                  : saveCategory
              }
              className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              {selectedCategory
                ? "Update"
                : "Save"}
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}