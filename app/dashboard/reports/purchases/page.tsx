"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Select from "react-select";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import {
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import { getBusinessId } from "@/lib/getBusinessId";

type Purchase = {
  id: number;

  product_id: number;

  quantity: number;

  buying_price: number;

  other_costs: number;

  total_amount: number;

  purchase_date: string;

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

export default function PurchaseReportPage() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

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

  // FETCH PURCHASES
  async function fetchPurchases() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("purchases")
        .select(`
          *,
          products(
            name,
            categories(name)
          )
        `)
        .eq("business_id", businessId)
        .order("purchase_date", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setPurchases(data || []);
  }

  // FETCH PRODUCTS
  async function fetchProducts() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("products")
        .select("id, name")
        .eq("business_id", businessId)
        .order("name")

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
      fetchPurchases();
      fetchProducts();
    }
  }, [businessId]);
  // CATEGORIES
  const categories = useMemo(() => {
    const set = new Set(
      purchases.map(
        (p) =>
          p.products?.categories?.name
      )
    );

    return Array.from(set).filter(
      Boolean
    ) as string[];
  }, [purchases]);

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

  // FILTER REPORT
  const reportPurchases = useMemo(() => {
    if (!hasFilters) return [];

    return purchases.filter(
      (purchase) => {
        const category =
          purchase.products?.categories
            ?.name;

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
                  purchase.product_id
              );

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

        const purchaseDate =
          new Date(
            purchase.purchase_date
          );

        const start = startDate
          ? new Date(startDate)
          : null;

        const end = endDate
          ? new Date(endDate)
          : null;

        if (
          start &&
          purchaseDate < start
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

          if (
            purchaseDate > end
          ) {
            return false;
          }
        }

        return (
          matchesProduct &&
          matchesCategory
        );
      }
    );
  }, [
    purchases,
    selectedProducts,
    selectedCategories,
    startDate,
    endDate,
    hasFilters,
  ]);

  // TOTALS
  const totals = useMemo(() => {
    return reportPurchases.reduce(
      (acc, purchase) => {
        acc.quantity += Number(
          purchase.quantity
        );

        acc.cost += Number(
          purchase.total_amount
        );

        acc.otherCosts += Number(
          purchase.other_costs || 0
        );

        return acc;
      },
      {
        quantity: 0,
        cost: 0,
        otherCosts: 0,
      }
    );
  }, [reportPurchases]);

  // CLEAR FILTERS
  function clearFilters() {
    setSelectedProducts([]);
    setSelectedCategories([]);
    setStartDate("");
    setEndDate("");
  }

  // EXPORT EXCEL
  function exportToExcel() {
    if (
      reportPurchases.length === 0
    ) {
      alert("No data to export");
      return;
    }

    const exportData =
      reportPurchases.map(
        (purchase) => ({
          Product:
            purchase.products?.name,

          Category:
            purchase.products
              ?.categories?.name ||
            "Uncategorized",

          Quantity:
            purchase.quantity,

          Unit_Cost:
            purchase.buying_price,

          Other_Costs:
            purchase.other_costs,

          Total:
            purchase.total_amount,

          Date: formatDate(
            purchase.purchase_date
          ),
        })
      );

    exportData.push({
      Product: "TOTAL",
      Category: "",
      Quantity: totals.quantity,
      Unit_Cost: "",
      Other_Costs:
        totals.otherCosts,
      Total: totals.cost,
      Date: "",
    } as any);

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Purchase Report"
    );

    XLSX.writeFile(
      workbook,
      "purchase-report.xlsx"
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Purchase Report
        </h1>

        <p className="text-sm text-gray-500">
          Purchase and procurement analytics
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

        {/* PRODUCTS */}
        <div className="w-full">
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
            typeof window !== "undefined"
           ? document.body
           : undefined
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

        {/* CATEGORIES */}
        <div className="w-full">
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
            typeof window !== "undefined"
            ? document.body
            : undefined
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

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white appearance-none"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900 bg-white appearance-none"
        />

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

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Product
                </th>

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Category
                </th>

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Qty
                </th>

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Unit Cost
                </th>

                <th className="px-3 py-2text-left border border-gray-200 text-gray-700">
                  Other Costs
                </th>

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Total
                </th>

                <th className="px-3 py-2 text-left border border-gray-200 text-gray-700">
                  Date
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

              ) : reportPurchases.length ===
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

                  {reportPurchases.map(
                    (purchase) => (
                      <tr
                        key={
                          purchase.id
                        }
                        className="hover:bg-gray-50"
                      >

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {
                            purchase
                              .products
                              ?.name
                          }
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {purchase
                            .products
                            ?.categories
                            ?.name ||
                            "Uncategorized"}
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {
                            purchase.quantity
                          }
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {formatCurrency(
                            purchase.buying_price
                          )}
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {formatCurrency(
                            purchase.other_costs ||
                              0
                          )}
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {formatCurrency(
                            purchase.total_amount
                          )}
                        </td>

                        <td className="px-3 py-2 border border-gray-200 text-gray-700">
                          {formatDate(
                            purchase.purchase_date
                          )}
                        </td>

                      </tr>
                    )
                  )}

                  {/* TOTAL */}
                  <tr className="bg-gray-50 font-bold">

                    <td className="px-3 py-2 border border-gray-200 text-gray-700">
                      TOTAL
                    </td>

                    <td className="border border-gray-200 text-gray-700"></td>

                    <td className="px-3 py-2 border border-gray-200 text-gray-700">
                      {
                        totals.quantity
                      }
                    </td>

                    <td className="border border-gray-200 text-gray-700"></td>

                    <td className="px-3 py-2 border border-gray-200 text-gray-700">
                      {formatCurrency(
                        totals.otherCosts
                      )}
                    </td>

                    <td className="px-3 py-2 border border-gray-200 text-gray-700">
                      {formatCurrency(
                        totals.cost
                      )}
                    </td>

                    <td className="border border-gray-200 text-gray-700"></td>

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