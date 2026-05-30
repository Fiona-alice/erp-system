"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Select from "react-select";

import { supabase } from "@/lib/supabase";

import { formatCurrency } from "@/lib/formatCurrency";

import {
  FileText,
  FileSpreadsheet,
} from "lucide-react";

import * as XLSX from "xlsx";

type Product = {
  id: number;

  name: string;

  stock_quantity: number;

  buying_price: number;

  selling_price: number;

  categories?: {
    name: string;
  };
};

type OptionType = {
  value: string | number;
  label: string;
};

export default function InventoryReportPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState<OptionType[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<OptionType[]>([]);

  // FETCH PRODUCTS
  async function fetchProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select(`
          *,
          categories(name)
        `)
        .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // CATEGORIES
  const categories = useMemo(() => {
    const set = new Set(
      products.map(
        (p) =>
          p.categories?.name
      )
    );

    return Array.from(set).filter(
      Boolean
    ) as string[];
  }, [products]);

  // OPTIONS
  const productOptions = [
    {
      value: "ALL",
      label: "All Products",
    },

    ...products.map((p) => ({
      value: p.id,
      label: p.name,
    })),
  ];

  const categoryOptions = [
    {
      value: "ALL",
      label: "All Categories",
    },

    ...categories.map((c) => ({
      value: c,
      label: c,
    })),
  ];

  // CHECK FILTERS
  const hasFilters =
    selectedProducts.length > 0 ||
    selectedCategories.length > 0;

  // FILTER REPORT
  const reportProducts =
    useMemo(() => {
      if (!hasFilters) return [];

      return products.filter(
        (product) => {
          const category =
            product.categories?.name;

          const hasAllProducts =
            selectedProducts.some(
              (p) =>
                p.value === "ALL"
            );

          const matchesProduct =
            hasAllProducts ||
            selectedProducts.length ===
              0
              ? true
              : selectedProducts.some(
                  (p) =>
                    p.value ===
                    product.id
                );

          const hasAllCategories =
            selectedCategories.some(
              (c) =>
                c.value === "ALL"
            );

          const matchesCategory =
            hasAllCategories ||
            selectedCategories.length ===
              0
              ? true
              : selectedCategories.some(
                  (c) =>
                    c.value ===
                    category
                );

          return (
            matchesProduct &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      selectedProducts,
      selectedCategories,
      hasFilters,
    ]);

  // TOTALS
  const totals = useMemo(() => {
    return reportProducts.reduce(
      (acc, product) => {
        const stock =
          Number(
            product.stock_quantity
          );

        const buyingPrice =
          Number(
            product.buying_price
          );

        const sellingPrice =
          Number(
            product.selling_price
          );

        acc.stock += stock;

        acc.inventoryValue +=
          stock * buyingPrice;

        acc.salesValue +=
          stock * sellingPrice;

        return acc;
      },
      {
        stock: 0,
        inventoryValue: 0,
        salesValue: 0,
      }
    );
  }, [reportProducts]);

  // CLEAR FILTERS
  function clearFilters() {
    setSelectedProducts([]);
    setSelectedCategories([]);
  }

  // EXPORT
  function exportToExcel() {
    if (
      reportProducts.length === 0
    ) {
      alert("No data to export");
      return;
    }

    const exportData =
      reportProducts.map(
        (product) => ({
          Product: product.name,

          Category:
            product.categories
              ?.name ||
            "Uncategorized",

          Stock:
            product.stock_quantity,

          Buying_Price:
            product.buying_price,

          Selling_Price:
            product.selling_price,

          Inventory_Value:
            product.stock_quantity *
            product.buying_price,

          Sales_Value:
            product.stock_quantity *
            product.selling_price,
        })
      );

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Inventory Report"
    );

    XLSX.writeFile(
      workbook,
      "inventory-report.xlsx"
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Inventory Report
        </h1>

        <p className="text-gray-500">
          Inventory valuation and stock analysis
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3 items-start">

        <div className="min-w-[260px]">
          <Select
            isMulti
            options={productOptions}
            value={
              selectedProducts
            }
            onChange={(value) =>
              setSelectedProducts(
                value as OptionType[]
              )
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

        <div className="min-w-[260px]">
          <Select
            isMulti
            options={
              categoryOptions
            }
            value={
              selectedCategories
            }
            onChange={(value) =>
              setSelectedCategories(
                value as OptionType[]
              )
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
          className="bg-white border text-blue-900 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm"
        >
          Clear
        </button>

      </div>

      {/* EXPORT */}
      <div className="flex justify-end gap-2 mb-2">

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

          <table className="w-full text-sm border-collapse">

            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>

                <th className="p-3 text-left border border-gray-200">
                  Product
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Category
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Stock
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Buying Price
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Selling Price
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Inventory Value
                </th>

                <th className="p-3 text-left border border-gray-200">
                  Sales Value
                </th>

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

              ) : reportProducts.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500"
                  >
                    No results found
                  </td>
                </tr>

              ) : (
                <>

                  {reportProducts.map(
                    (product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50"
                      >

                        <td className="p-3 border border-gray-200">
                          {
                            product.name
                          }
                        </td>

                        <td className="p-3 border border-gray-200">
                          {product
                            .categories
                            ?.name ||
                            "Uncategorized"}
                        </td>

                        <td className="p-3 border border-gray-200">
                          {
                            product.stock_quantity
                          }
                        </td>

                        <td className="p-3 border border-gray-200">
                          {formatCurrency(
                            product.buying_price
                          )}
                        </td>

                        <td className="p-3 border border-gray-200">
                          {formatCurrency(
                            product.selling_price
                          )}
                        </td>

                        <td className="p-3 border border-gray-200">
                          {formatCurrency(
                            product.stock_quantity *
                              product.buying_price
                          )}
                        </td>

                        <td className="p-3 border border-gray-200">
                          {formatCurrency(
                            product.stock_quantity *
                              product.selling_price
                          )}
                        </td>

                      </tr>
                    )
                  )}

                  {/* TOTAL */}
                  <tr className="bg-gray-50 font-bold">

                    <td className="p-3 border border-gray-200">
                      TOTAL
                    </td>

                    <td className="border border-gray-200"></td>

                    <td className="p-3 border border-gray-200">
                      {
                        totals.stock
                      }
                    </td>

                    <td className="border border-gray-200"></td>

                    <td className="border border-gray-200"></td>

                    <td className="p-3 border border-gray-200">
                      {formatCurrency(
                        totals.inventoryValue
                      )}
                    </td>

                    <td className="p-3 border border-gray-200">
                      {formatCurrency(
                        totals.salesValue
                      )}
                    </td>

                  </tr>

                </>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}