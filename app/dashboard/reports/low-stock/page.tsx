"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import { getBusinessId } from "@/lib/getBusinessId";

type Product = {
  id: number;
  name: string;
  stock_quantity: number;
  minimum_stock: number;
  buying_price: number;
  selling_price: number;
  categories?: {
    name: string;
  } | null;
};

type OptionType = {
  value: string | number;
  label: string;
};

export default function LowStockReportPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<OptionType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);

  const [businessId, setBusinessId] = useState<string>("");
  
     // GET BUSINESS ID
     async function loadBusiness() {
      const id = await getBusinessId(); 
      setBusinessId(id);
    }  

  // FETCH PRODUCTS
  async function fetchProducts() {
     if (!businessId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories(name)
      `)
      .eq("business_id", businessId)
      .order("name");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProducts((data as Product[]) || []);
    setLoading(false);
  }

   useEffect(() => {
      loadBusiness();
    }, []);

    useEffect(() => {
    if (businessId) {
      fetchProducts();
    }
  }, [businessId]);


  // LOW STOCK FILTER (CORE LOGIC)
  const lowStockProducts = useMemo(() => {
    return products.filter(
      (p) => p.stock_quantity <= p.minimum_stock
    );
  }, [products]);

  // CATEGORY LIST
  const categories = useMemo(() => {
    const set = new Set(
      lowStockProducts.map((p) => p.categories?.name)
    );

    return Array.from(set).filter(Boolean) as string[];
  }, [lowStockProducts]);

  // OPTIONS
  const productOptions = [
    { value: "ALL", label: "All Products" },
    ...lowStockProducts.map((p) => ({
      value: p.id,
      label: p.name,
    })),
  ];

  const categoryOptions = [
    { value: "ALL", label: "All Categories" },
    ...categories.map((c) => ({
      value: c,
      label: c,
    })),
  ];

  const hasFilters =
    selectedProducts.length > 0 ||
    selectedCategories.length > 0;

  // FILTERED REPORT
  const reportProducts = useMemo(() => {
    let base = lowStockProducts;

    if (!hasFilters) return base;

    return base.filter((product) => {
      const category = product.categories?.name;

      const hasAllProducts = selectedProducts.some(
        (p) => p.value === "ALL"
      );

      const matchesProduct =
        hasAllProducts ||
        selectedProducts.length === 0 ||
        selectedProducts.some((p) => p.value === product.id);

      const hasAllCategories = selectedCategories.some(
        (c) => c.value === "ALL"
      );

      const matchesCategory =
        hasAllCategories ||
        selectedCategories.length === 0 ||
        selectedCategories.some((c) => c.value === category);

      return matchesProduct && matchesCategory;
    });
  }, [lowStockProducts, selectedProducts, selectedCategories, hasFilters]);

  // EXPORT
  function exportToExcel() {
    if (reportProducts.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData = reportProducts.map((p) => ({
      Product: p.name,
      Category: p.categories?.name || "Uncategorized",
      Stock: p.stock_quantity,
      Minimum_Stock: p.minimum_stock,
      Buying_Price: p.buying_price,
      Selling_Price: p.selling_price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Low Stock Report"
    );

    XLSX.writeFile(workbook, "low-stock-report.xlsx");
  }

  function clearFilters() {
    setSelectedProducts([]);
    setSelectedCategories([]);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Low Stock Report
        </h1>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

         <div className="w-full">
          <Select
            isMulti
            options={productOptions}
            value={selectedProducts}
            onChange={(value) =>
              setSelectedProducts(value as OptionType[])
            }
            placeholder="Select products..."
            menuPortalTarget={
            document.body }
            menuPosition="fixed"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius:
                  "0.5rem",
                minHeight: "42px",
              }),

              menuPortal: (
                base
              ) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>

         <div className="w-full">
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={(value) =>
              setSelectedCategories(value as OptionType[])
            }
            placeholder="Select categories..."
            menuPortalTarget={
              document.body
            }
            menuPosition="fixed"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius:
                  "0.5rem",
                minHeight: "42px",
              }),

              menuPortal: (
                base
              ) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>

        <button
          onClick={clearFilters}
          className="w-full md:w-auto bg-white border text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50
          text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* EXPORT */}
      <div className="flex justify-between sm:justify-end gap-2">

        <button className="p-1.5 rounded-md hover:bg-gray-100">
          <FileText
            size={17}
            className="text-red-600"
          />
        </button>

        <button
          onClick={exportToExcel}
          className="p-1.5 rounded-md hover:bg-gray-100"
        >
          <FileSpreadsheet
            size={17}
            className="text-green-600"
          />
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow overflow-hidden">
         <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
         <table className="min-w-[900px] w-full text-sm border-collapse">

          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">Product</th>
              <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">Category</th>
              <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">Stock</th>
              <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">Minimum</th>
              <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">Buying Price</th>
            </tr>
          </thead>

          <tbody>

            {!hasFilters ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500"
                  >
                    Select filters to generate a report
                  </td>
                </tr>

            ) : reportProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No low stock products found
                </td>
              </tr>

            ) : (

              reportProducts.map((p) => (
                <tr key={p.id} className="border-t">

                  <td className="px-3 py-2 border border-gray-200 text-gray-700">{p.name}</td>

                  <td className="px-3 py-2 border border-gray-200 text-gray-700">
                    {p.categories?.name || "Uncategorized"}
                  </td>

                  <td className="px-3 py-2 text-red-600 font-bold border border-gray-200">
                    {p.stock_quantity}
                  </td>

                  <td className="px-3 py-2 border border-gray-200 text-gray-700">{p.minimum_stock}</td>

                  <td className="px-3 py-2 border border-gray-200 text-gray-700">
                    {formatCurrency(p.buying_price)}
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}