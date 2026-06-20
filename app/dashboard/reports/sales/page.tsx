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
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";

type Sale = {
  id: number;
  product_id: number;
  quantity: number;
  selling_price: number;
  total_amount: number;
  profit: number;
  sale_date: string;

  products: {
    name: string;

    categories?: {
      name: string;
    };
  };
};

type Product = {
  id: number;
  name: string;
};

type OptionType = {
  value: string | number;
  label: string;
};

export default function SalesReportPage() {
  const [sales, setSales] =
    useState<Sale[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [selectedProducts, setSelectedProducts] =
    useState<OptionType[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<OptionType[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [businessId, setBusinessId] = useState<string>("");
  
     // GET BUSINESS ID
     async function loadBusiness() {
      const id = await getBusinessId(); 
      setBusinessId(id);
    }  

  // FETCH SALES
  async function fetchSales() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          *,
          products(
            name,
            categories(name)
          )
        `)
        .eq("business_id", businessId)
        .order("sale_date", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setSales(data || []);
  }

  // FETCH PRODUCTS
  async function fetchProducts() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("products")
        .select("id, name")
        .eq("business_id", businessId)
        .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

 useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchSales();
      fetchProducts();
    }
  }, [businessId]);

  // CATEGORIES
  const categories = useMemo(() => {
    const set = new Set(
      sales.map(
        (s) =>
          s.products?.categories?.name
      )
    );

    return Array.from(set).filter(
      Boolean
    ) as string[];
  }, [sales]);

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
    selectedCategories.length > 0 ||
    startDate ||
    endDate;

  // FILTERED REPORT
  const reportSales = useMemo(() => {
    if (!hasFilters) return [];

    return sales.filter((sale) => {
      const category =
        sale.products?.categories?.name;

      // PRODUCT FILTER
      const hasAllProducts =
  selectedProducts.some(
    (p) => p.value === "ALL"
  );

const matchesProduct =
  hasAllProducts ||
  selectedProducts.length === 0
    ? true
    : selectedProducts.some(
        (p) =>
          p.value ===
          sale.product_id
      );

      // CATEGORY FILTER
      const hasAllCategories =
  selectedCategories.some(
    (c) => c.value === "ALL"
  );

const matchesCategory =
  hasAllCategories ||
  selectedCategories.length === 0
    ? true
    : selectedCategories.some(
        (c) =>
          c.value === category
      );

      // DATE FILTER
      const saleDate = new Date(
        sale.sale_date
      );

      const start = startDate
        ? new Date(startDate)
        : null;

      const end = endDate
        ? new Date(endDate)
        : null;

      if (
        start &&
        saleDate < start
      ) {
        return false;
      }

      if (end) {
        end.setHours(
          23,
          59,
          59,
          999
        );

        if (saleDate > end) {
          return false;
        }
      }

      return (
        matchesProduct &&
        matchesCategory
      );
    });
  }, [
    sales,
    selectedProducts,
    selectedCategories,
    startDate,
    endDate,
    hasFilters,
  ]);

  // TOTALS
  const totals = useMemo(() => {
    return reportSales.reduce(
      (acc, sale) => {
        acc.quantity += Number(
          sale.quantity
        );

        acc.sales += Number(
          sale.total_amount
        );

        acc.profit += Number(
          sale.profit
        );

        return acc;
      },
      {
        quantity: 0,
        sales: 0,
        profit: 0,
      }
    );
  }, [reportSales]);

  // CLEAR FILTERS
  function clearFilters() {
    setSelectedProducts([]);
    setSelectedCategories([]);
    setStartDate("");
    setEndDate("");
  }

  // EXPORT EXCEL
  function exportToExcel() {
    if (reportSales.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData =
      reportSales.map((sale) => ({
        Product:
          sale.products?.name,

        Category:
          sale.products?.categories
            ?.name ||
          "Uncategorized",

        Quantity: sale.quantity,

        Sales: sale.total_amount,

        Profit: sale.profit,

        Date: new Date(
          sale.sale_date
        ).toLocaleDateString(),
      }));

    // TOTAL ROW
    exportData.push({
      Product: "TOTAL",
      Category: "",
      Quantity: totals.quantity,
      Sales: totals.sales,
      Profit: totals.profit,
      Date: "",
    });

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sales Report"
    );

    XLSX.writeFile(
      workbook,
      "sales-report.xlsx"
    );
  }

  const totalSalesAmount =
  reportSales.reduce(
    (sum, sale) =>
      sum +
      Number(
        sale.total_amount
      ),
    0
  );

  const totalProfit =
  reportSales.reduce(
    (sum, sale) =>
      sum +
      Number(sale.profit),
    0
  );
  
  const overallMargin =
  totalSalesAmount > 0
    ? (
        (totalProfit /
          totalSalesAmount) *
        100
      ).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Sales Report
        </h1>

        <p className="text-sm text-gray-500">
          Filtered business analytics
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

        {/* PRODUCTS */}
        <div className="w-full">
          <Select
            isMulti
            options={productOptions}
            value={selectedProducts}
            onChange={(value) =>
              setSelectedProducts(
                value as OptionType[]
              )
            }
            placeholder="Select products..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                minHeight: "42px",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
                }),
            }}
          />
        </div>

        {/* CATEGORIES */}
        <div className="w-full">
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={(value) =>
              setSelectedCategories(
                value as OptionType[]
              )
            }
            placeholder="Select categories..."
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                minHeight: "42px",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
               }),
            }}
          />
        </div>

        {/* START DATE */}
        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900"
        />

        {/* END DATE */}
        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900"
        />

        {/* CLEAR */}
        <button
          onClick={clearFilters}
          className="w-full md:w-auto bg-white border text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50
          text-sm font-medium"
        >
          Clear
        </button>

      </div>

      {/* EXPORT ICONS */}
      <div className="flex justify-between sm:justify-end gap-2">

        {/* PDF */}
        <button
          title="Export PDF"
          className="p-1.5 rounded-md hover:bg-gray-100"
        >
          <FileText
            size={17}
            className="text-red-600"
          />
        </button>

        {/* EXCEL */}
        <button
          title="Export Excel"
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
                <th className="px-3 py-2 text-left border border-gray-200">
                  Product
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Category
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Qty
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Sales
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Profit
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Margin %
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>

              {/* EMPTY STATE */}
              {!hasFilters ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500"
                  >
                    Select filters to generate a report
                  </td>
                </tr>
              ) : reportSales.length === 0 ? (

                /* NO RESULTS */
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

                  {/* DATA */}
                  {reportSales.map(
                    (sale) => (
                      <tr
                        key={sale.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-3 py-2 border border-gray-200">
                          {
                            sale.products
                              ?.name
                          }
                        </td>

                        <td className="px-3 py-2 text-blue-900 border border-gray-200">
                          {sale.products
                            ?.categories
                            ?.name ||
                            "Uncategorized"}
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {
                            sale.quantity
                          }
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {formatCurrency(
                            sale.total_amount
                          )}
                        </td>

                        <td className="px-3 py-2 text-green-700 border border-gray-200">
                          {formatCurrency(
                            sale.profit
                          )}
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {sale.total_amount > 0
                            ? (
                                (sale.profit /
                                  sale.total_amount) *
                                100
                              ).toFixed(2)
                            : "0"}
                          %
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                        {formatDate(sale.sale_date)}
                        </td>
                      </tr>
                    )
                  )}

                  {/* TOTAL ROW */}
                  <tr className="bg-gray-50 font-bold border-t">
                    <td className="px-3 py-2 border border-gray-200">
                      TOTAL
                    </td>

                    <td></td>

                    <td className="px-3 py-2 border border-gray-200">
                      {
                        totals.quantity
                      }
                    </td>

                    <td className="px-3 py-2 text-blue-900 border border-gray-200">
                      {formatCurrency(
                        totals.sales
                      )}
                    </td>

                    <td className="px-3 py-2 text-green-700 border border-gray-200">
                      {formatCurrency(
                        totals.profit
                      )}
                    </td>

                    <td className="px-3 py-2 border border-gray-200 font-bold">
                      {overallMargin}%
                    </td>

                    <td></td>
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