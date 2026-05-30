"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { logAction } from "@/lib/auditLog";
import StockHistory from "@/components/StockHistory";

type Product = {
  id: number;
  name: string;
  category_id: number | null;
  categories?: {
    name: string;
  };
  buying_price: number;
  selling_price: number;
  stock_quantity: number;
   minimum_stock: number;
};

type Category = {
  id: number;

  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [selectedCategory, setSelectedCategory] =
  useState("");

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");

  const [categories, setCategories] =
  useState<Category[]>([]);

  const [buyingPrice, setBuyingPrice] =
    useState("");

  const [sellingPrice, setSellingPrice] =
    useState("");

  const [stockQuantity, setStockQuantity] =
    useState("");

  const [minimumStock, setMinimumStock] =
  useState("");  

  const [permissions, setPermissions] =
  useState<any>(null);  

  const [historyModalOpen, setHistoryModalOpen,] = 
  useState(false);

 const [historyProduct, setHistoryProduct,] = 
 useState<Product | null>(null);

  // FETCH PRODUCTS
  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select(`
       *,
    categories(name)
   `)
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    loadPermissions();
  }, []);

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
  // FETCH CATEGORIES
  async function fetchCategories() {
  const { data, error } =
    await supabase
      .from("categories")
      .select("*")
      .order("name");

  if (error) {
    console.error(error);

    return;
  }

  setCategories(data || []);
}

  // ADD PRODUCT
  async function addProduct() {
    if (!permissions?.can_create) {
    alert("Permission denied");
    return;
   }

   const {
   data: { user },
   } = await supabase.auth.getUser();

if (!user) {
  alert("Not authenticated");
  return;
}

const { data: profile } =
  await supabase
    .from("user_profiles")
    .select("business_id")
    .eq("id", user.id)
    .single();

if (!profile?.business_id) {
  alert("No business assigned");
  return;
}
    const { error } = await supabase
      .from("products")
      .insert([
        {
          business_id:
          profile.business_id,
          name,
          category_id:
          selectedCategory
          ? Number(selectedCategory)
          : null,
          buying_price: Number(buyingPrice),
          selling_price: Number(sellingPrice),
          stock_quantity: Number(stockQuantity),
          minimum_stock: Number(minimumStock),
        },
      ]);

    if (error) {
      console.error(error);
      alert("Failed to add product");
      return;
    }

      await logAction(
        "CREATE",
        "products",
        name,
        {
          product: name,
          quantity:
            Number(stockQuantity),
        }
      );

    clearForm();

    setIsOpen(false);

    fetchProducts();
  }

  // OPEN EDIT MODAL
  function openEditModal(product: Product) {
    setEditingProduct(product);

    setName(product.name);
   
    setSelectedCategory(
    product.category_id
    ? String(product.category_id)
    : ""
    );

    setBuyingPrice(
      product.buying_price.toString()
    );

    setSellingPrice(
      product.selling_price.toString()
    );

    setStockQuantity(
      product.stock_quantity.toString()
    );
    setMinimumStock(
    product.minimum_stock?.toString() || ""
      );

    setIsOpen(true);
  }

  // UPDATE PRODUCT
  async function updateProduct() {
    if (!permissions?.can_edit) {
    alert("Permission denied");
    return;
  }
    if (!editingProduct) return;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        category_id:
        selectedCategory
        ? Number(selectedCategory)
        : null,
        buying_price: Number(buyingPrice),
        selling_price: Number(sellingPrice),
        stock_quantity: Number(stockQuantity),
         minimum_stock: Number(minimumStock),
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error(error);
      alert("Failed to update product");
      return;
    }
      await logAction(
        "UPDATE",
        "products",
        String(editingProduct.id),
        {
          product: name
        }
      );
    clearForm();

    setEditingProduct(null);

    setIsOpen(false);

    fetchProducts();
    
  }

  // DELETE PRODUCT
  async function deleteProduct(id: number) {
    if (!permissions?.can_delete) {
    alert("Permission denied");
    return;
    }
    const deletedProduct =
    selectedProduct?.name;

    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete product");
      return;
    }
      await logAction(
        "DELETE",
        "products",
        String(id),
        {
          product:
            deletedProduct
        }
      );
    setSelectedProduct(null);

    fetchProducts();
  }

  // CLEAR FORM
  function clearForm() {
    setName("");
    setSelectedCategory("");
    setBuyingPrice("");
    setSellingPrice("");
    setStockQuantity("");
  }

  // FILTER PRODUCTS
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        product.categories?.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );
      function openHistoryModal(
        product: Product
      ) {
        setHistoryProduct(product);

        setHistoryModalOpen(true);
      }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Products
        </h1>

        <p className="text-gray-500 mt-1">
          Manage inventory products
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-2">
          {/* ADD */}
          {permissions?.can_create && (
          <button
            onClick={() => {
              clearForm();

              setEditingProduct(null);

              setIsOpen(true);
            }}
            className="border bg-gray-50 text-blue-700 px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            New 
          </button>
           )}

          {/* EDIT */}
          {permissions?.can_edit && (
          <button
            disabled={!selectedProduct}
            onClick={() =>
              selectedProduct &&
              openEditModal(selectedProduct)
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>
           )} 

          {/* DELETE */}
          {permissions?.can_delete && (
          <button
            disabled={!selectedProduct}
            onClick={() =>
              selectedProduct &&
              deleteProduct(selectedProduct.id)
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Delete
          </button>
          )}

          <button
            disabled={!selectedProduct}
            onClick={() =>
              selectedProduct &&
              openHistoryModal(
                selectedProduct
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            History
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
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

      {/* HEADER */}
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="text-left p-2 border border-gray-200">
            Name
          </th>
          <th className="text-left p-2 border border-gray-200">
            Product Category
          </th>
          <th className="text-left p-2 border border-gray-200">
            Buy Price
          </th>
          <th className="text-left p-2 border border-gray-200">
            Sell Price
          </th>
          <th className="text-left p-2 border border-gray-200">
            Stock
          </th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {filteredProducts.map((product) => (
          <tr
            key={product.id}
            onClick={() =>
              setSelectedProduct(product)
            }
            className={`cursor-pointer hover:bg-gray-50 ${
              selectedProduct?.id ===
              product.id
                ? "bg-blue-50"
                : ""
            }`}
          >
            <td className="p-2 text-gray-700 border border-gray-200">
              {product.name}
            </td>
            <td className="p-2 text-gray-700 border border-gray-200">
              {product.categories?.name}
            </td>
            <td className="p-2 text-gray-700 border border-gray-200">
              UGX{" "}
              {formatCurrency(
                product.buying_price
              )}
            </td>

            <td className="p-2 text-gray-700 border border-gray-200">
              UGX{" "}
              {formatCurrency(
                product.selling_price
              )}
            </td>
            <td className="p-2 text-gray-700 border border-gray-200">

              <span
                className={`font-medium ${
                product.stock_quantity <=
                product.minimum_stock
                ? "text-red-700"
                : "text-green-600"
                 }`}
                >
                {product.stock_quantity}
              </span>
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
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </Dialog.Title>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <select
                value={selectedCategory}
                onChange={(e) =>
                setSelectedCategory(
                e.target.value
                 )
                }
                 className="w-full border p-3 rounded-lg"
                  >
                <option value="">
                Select Category
                </option>

                {categories.map((category) => (
                <option
                key={category.id}
                value={category.id}
                >
                {category.name}
                </option>
                 ))}
              </select>

              <input
                type="number"
                placeholder="Buying Price"
                className="w-full border p-2 rounded"
                value={buyingPrice}
                onChange={(e) =>
                  setBuyingPrice(
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Selling Price"
                className="w-full border p-2 rounded"
                value={sellingPrice}
                onChange={(e) =>
                  setSellingPrice(
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Stock Quantity"
                className="w-full border p-2 rounded"
                value={stockQuantity}
                onChange={(e) =>
                  setStockQuantity(
                    e.target.value
                  )
                }
              />
              
             <input
                type="number"
                placeholder="Minimum Stock"
                className="w-full border p-2 rounded"
                value={minimumStock}
                onChange={(e) =>
                setMinimumStock(
                   e.target.value
                 )
               }
             /> 
              <button
                onClick={
                  editingProduct
                    ? updateProduct
                    : addProduct
                }
                className="w-full bg-black text-white py-2 rounded-lg"
              >
                {editingProduct
                  ? "Update Product"
                  : "Save Product"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* STOCK HISTORY MODAL */}
<Dialog
  open={historyModalOpen}
  onClose={() =>
    setHistoryModalOpen(false)
  }
  className="relative z-50"
>
  <div className="fixed inset-0 bg-black/40" />

  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">

      <Dialog.Title className="text-2xl font-bold mb-4">
        Stock History
      </Dialog.Title>

      <p className="mb-4 text-gray-500">
        {historyProduct?.name}
      </p>

      <StockHistory
        productId={
          historyProduct?.id || 0
        }
      />

    </Dialog.Panel>
  </div>
</Dialog>

    </div>
  );
}