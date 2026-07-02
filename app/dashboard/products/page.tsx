"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { logAction } from "@/lib/auditLog";
import StockHistory from "@/components/StockHistory";
import { getBusinessId } from "@/lib/getBusinessId";
import * as XLSX from "xlsx";
import { Search, X } from "lucide-react";

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
  unit_id: number | null;

  units?: {
    name: string;
    short_name: string;
  };
  conversion_unit: string | null;
  conversion_quantity: number | null;
};

type Category = {
  id: number;
  name: string;
};

type Unit = {
  id: number;
  name: string;
  short_name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [units, setUnits] = useState<Unit[]>([]);
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

  const [unitId, setUnitId] = useState("");

  const [conversionUnit, setConversionUnit] = useState("");
  const [conversionQuantity, setConversionQuantity] = useState("");

  const [businessId, setBusinessId] = useState<string>("");

   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId(); 
    setBusinessId(id);
  }

  // FETCH PRODUCTS
  async function fetchProducts() {
    if (!businessId) return;

    const { data, error } = await supabase
      .from("products")
      .select(`
      *,
      categories (
        name
      ),
      units (
        name,
        short_name
      )
    `)
      .eq("business_id", businessId) 
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  useEffect(() => {
    loadBusiness();
    loadPermissions();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchProducts();
      fetchCategories();
      fetchUnits();
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

async function fetchUnits() {
  const { data, error } =
    await supabase
      .from("units")
      .select("*")
      .order("name");

  if (error) {
    console.error(error);
    return;
  }

  setUnits(data || []);
}

  // FETCH CATEGORIES
  async function fetchCategories() {
     if (!businessId) return;
 
  const { data, error } =
    await supabase
      .from("categories")
      .select("*")
      .eq("business_id", businessId) 
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
          unit_id: Number(unitId),
          minimum_stock: Number(minimumStock),
          conversion_unit: conversionUnit,
          conversion_quantity: Number(conversionQuantity),
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
    setUnitId(product.unit_id ? String(product.unit_id) : "");
    setConversionUnit(product.conversion_unit || "");
    setConversionQuantity(product.conversion_quantity?.toString() || "");
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
        unit_id: Number(unitId),
        minimum_stock: Number(minimumStock),
        conversion_unit: conversionUnit,
        conversion_quantity: Number(conversionQuantity),
      })
      .eq("id", editingProduct.id)
      .eq("business_id", businessId);

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
      .eq("id", id)
      .eq("business_id", businessId);

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
    setMinimumStock("");
    setUnitId("");
    setConversionUnit("");
    setConversionQuantity("");
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

        async function handleImport(
          e: React.ChangeEvent<HTMLInputElement>
        ) {
          const file = e.target.files?.[0];

          if (!file) return;

          const buffer =
            await file.arrayBuffer();

          const workbook =
            XLSX.read(buffer);

          const sheet =
            workbook.Sheets[
              workbook.SheetNames[0]
            ];

          const rows: any[] =
            XLSX.utils.sheet_to_json(sheet);

          const businessId =
            await getBusinessId();

          /*
            GET ALL CATEGORIES
          */
          const {
            data: categories,
            error: categoryError,
          } = await supabase
            .from("categories")
            .select("id, name");

          if (categoryError) {
            console.error(categoryError);

            alert(
              "Failed loading categories"
            );

            return;
          }

          const products = rows.map(
            (row) => {
              const category =
                categories?.find(
                  (c) =>
                    c.name
                      .toLowerCase()
                      .trim() ===
                    row.Category
                      ?.toLowerCase()
                      .trim()
                );

      return {
        business_id: businessId,

        name: row.Name,

        category_id:
          category?.id || null,

        stock_quantity:
          Number(
            row.Stock || 0
          ),

        buying_price:
          Number(
            row[
              "Buying Price"
            ] || 0
          ),

        selling_price:
          Number(
            row[
              "Selling Price"
            ] || 0
          ),

        minimum_stock:
          Number(
            row[
              "Minimum Stock"
            ] || 0
          ),
      };
    }
  );

  const { error } =
    await supabase
      .from("products")
      .insert(products);

  if (error) {
    console.error(error);

    alert(
      "Import failed"
    );

    return;
  }

  alert(
    `${products.length} products imported successfully`
  );

  fetchProducts();
}

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Products
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage inventory products
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {/* ADD */}
          {permissions?.can_create && (
          <button
            onClick={() => {
              clearForm();

              setEditingProduct(null);

              setIsOpen(true);
            }}
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-md hover:bg-gray-100 text-sm"
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
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
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
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
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
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm"
          >
            History
          </button>

          <button
              onClick={() =>
                document
                  .getElementById("import-file")
                  ?.click()
              }
              className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
            >
              Import Products
            </button>

            <input
              id="import-file"
              type="file"
              accept=".xlsx,.csv"
              hidden
              onChange={handleImport}
            />

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

      {/* HEADER */}
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="text-left px-3 p-2 border border-gray-200">
            Name
          </th>
          <th className="text-left px-3 p-2 border border-gray-200">
            Product Category
          </th>
          <th className="text-left px-3 p-2 border border-gray-200">
            Buy Price
          </th>
          <th className="text-left px-3 p-2 border border-gray-200">
            Sell Price
          </th>
          <th className="text-left px-3 p-2 border border-gray-200">
            Stock
          </th>
          <th className="text-left px-3 p-2 border border-gray-200">
            Base UoM
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
            <td className="px-3 p-2 text-gray-700 border border-gray-200">
              {product.name}
            </td>
            <td className="px-3 p-2 text-gray-700 border border-gray-200">
              {product.categories?.name}
            </td>
            <td className="px-3 p-2 text-gray-700 border border-gray-200">
              UGX{" "}
              {formatCurrency(
                product.buying_price
              )}
            </td>

            <td className="px-3 p-2 text-gray-700 border border-gray-200">
              UGX{" "}
              {formatCurrency(
                product.selling_price
              )}
            </td>
            <td className="px-3 p-2 text-gray-700 border border-gray-200">

              <span
                className={`font-medium ${
                product.stock_quantity <=
                product.minimum_stock
                ? "text-red-700"
                : "text-green-600"
                 }`}
                >
                {Number(product.stock_quantity).toFixed(2)}
              </span>
            </td>
            <td className="px-3 p-2 text-gray-700 border border-gray-200">
            {product.units
              ? `${product.units.name} (${product.units.short_name})`
              : "-"}
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
          <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </Dialog.Title>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Product Name"
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                 className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
                value={stockQuantity}
                onChange={(e) =>
                  setStockQuantity(
                    e.target.value
                  )
                }
              />
              
              <select
                value={unitId}
                onChange={(e) =>
                  setUnitId(e.target.value)
                }
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              >
                <option value="">
                  Select UOM
                </option>

                {units.map((unit: any) => (
                  <option
                    key={unit.id}
                    value={unit.name}
                  >
                    {unit.name} ({unit.short_name})
                  </option>
                ))}
              </select>

<select
  value={conversionUnit}
  onChange={(e) => setConversionUnit(e.target.value)}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Conversion Unit</option>

  {units.map((unit: any) => (
    <option key={unit.id} value={unit.id}>
      {unit.name} ({unit.short_name})
    </option>
  ))}
</select>

<input
  type="number"
  step="0.01"
  placeholder="e.g. 20"
  value={conversionQuantity}
  onChange={(e) =>
    setConversionQuantity(e.target.value)
  }
  className="w-full border p-3 rounded-lg"
/>

             <input
                type="number"
                placeholder="Minimum Stock"
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
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
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
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
    <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">

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