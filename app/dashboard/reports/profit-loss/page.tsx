"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import {
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { getBusinessId } from "@/lib/getBusinessId";
import { getBusinessType } from "@/lib/getBusinessType";

type Sale = {
  id: number;
  total_amount: number;
  cost_amount: number;
  sale_date: string;

  products?: {
    categories?: {
      name: string;
    } | null;
  } | null;
};

type Expense = {
  id: number;
  amount: number;
  expense_date: string;
  category: string;
};

type StockAdjustment = {
  id: number;
  pnl_amount: number;
  created_at: string;

  products?: {
    categories?: {
      name: string;
    } | null;
  } | null;
};

type OptionType = {
  value: string;
  label: string;
};

type ServiceSale = {
  total_amount: number;
  profit: number;
  cost_amount: number;
  service_date: string;
};

export default function ProfitLossReportPage() {
  const [sales, setSales] =
    useState<Sale[]>([]);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [adjustments, setAdjustments] =
    useState<StockAdjustment[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<OptionType[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [serviceSales, setServiceSales,] = 
  useState<ServiceSale[]>( []);

  const [businessId, setBusinessId] = useState<string>("");
  const [businessType, setBusinessType] = useState("");
  
     // GET BUSINESS ID
     async function loadBusiness() {
      const id = await getBusinessId(); 
      setBusinessId(id);
    }
    
    async function loadBusinessType() {
    const type =
    await getBusinessType();

    if (type) {
    setBusinessType(type);
    }
    }

  // -----------------------------
  // FETCH SALES
  // -----------------------------
  async function fetchSales() {
    if (!businessId) return;
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          id,
          total_amount,
          cost_amount,
          sale_date,
          products(
            categories(name)
          )
        `)
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setSales(
      (data as unknown as Sale[]) || []
    );
  }

  async function fetchServiceSales() {
    if (!businessId) return;
      const { data, error } =
        await supabase
          .from("service_sales")
          .select("*")
          .eq("business_id", businessId);

      if (error) {
        console.error(error);
        return;
      }

      setServiceSales(data || []);
    }

  // -----------------------------
  // FETCH EXPENSES
  // -----------------------------
  async function fetchExpenses() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("expenses")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setExpenses(
      (data as Expense[]) || []
    );
  }

  // -----------------------------
  // FETCH STOCK ADJUSTMENTS
  // -----------------------------
  async function fetchAdjustments() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("stock_adjustments")
        .select(`
          id,
          pnl_amount,
          created_at,
          products(
            categories(name)
          )
        `)
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setAdjustments(
      (data as unknown as StockAdjustment[]) || []
    );
  }

 useEffect(() => {
    loadBusiness();
    loadBusinessType();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchSales();
      fetchExpenses();
      fetchAdjustments();
      fetchServiceSales();
    }
  }, [businessId]);

  // -----------------------------
  // CATEGORY OPTIONS
  // -----------------------------
  const categories = useMemo(() => {
    const set = new Set<string>();

    sales.forEach((sale) => {
      const category =
        sale.products?.categories?.name;

      if (category) {
        set.add(category);
      }
    });

    adjustments.forEach((adj) => {
      const category =
        adj.products?.categories?.name;

      if (category) {
        set.add(category);
      }
    });

    return Array.from(set);
  }, [sales, adjustments]);

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

  const hasFilters =
    selectedCategories.length > 0 ||
    startDate ||
    endDate;

  // -----------------------------
  // SALES FILTER
  // -----------------------------
  const filteredSales =
    useMemo(() => {
      if (!hasFilters) return [];

      return sales.filter((sale) => {
        const category =
          sale.products?.categories?.name;

        const hasAll =
          selectedCategories.some(
            (c) =>
              c.value === "ALL"
          );

        const matchesCategory =
          hasAll ||
          selectedCategories.length === 0
            ? true
            : selectedCategories.some(
                (c) =>
                  c.value === category
              );

        const saleDate =
          new Date(sale.sale_date);

        const start = startDate
          ? new Date(startDate)
          : null;

        const end = endDate
          ? new Date(endDate)
          : null;

        if (
          start &&
          saleDate < start
        )
          return false;

        if (end) {
          end.setHours(
            23,
            59,
            59,
            999
          );

          if (saleDate > end)
            return false;
        }

        return matchesCategory;
      });
    }, [
      sales,
      selectedCategories,
      startDate,
      endDate,
      hasFilters,
    ]);

  
  const filteredServiceSales =
  useMemo(() => {
    return serviceSales.filter(
      (sale) => {
        const saleDate =
          new Date(
            sale.service_date
          );

        const start =
          startDate
            ? new Date(startDate)
            : null;

        const end =
          endDate
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

          if (
            saleDate > end
          ) {
            return false;
          }
        }

        return true;
      }
    );
  }, [
    serviceSales,
    startDate,
    endDate,
  ]);
    
  // -----------------------------
  // EXPENSE FILTER
  // -----------------------------
  const filteredExpenses =
    useMemo(() => {
      if (!hasFilters) return [];

      return expenses.filter(
        (expense) => {
          const expenseDate =
            new Date(
              expense.expense_date
            );

          const start =
            startDate
              ? new Date(
                  startDate
                )
              : null;

          const end = endDate
            ? new Date(endDate)
            : null;

          if (
            start &&
            expenseDate < start
          )
            return false;

          if (end) {
            end.setHours(
              23,
              59,
              59,
              999
            );

            if (
              expenseDate > end
            )
              return false;
          }

          return true;
        }
      );
    }, [
      expenses,
      startDate,
      endDate,
      hasFilters,
    ]);

  // -----------------------------
  // ADJUSTMENT FILTER
  // -----------------------------
  const filteredAdjustments =
    useMemo(() => {
      if (!hasFilters) return [];

      return adjustments.filter(
        (adj) => {
          const category =
            adj.products?.categories?.name;

          const hasAll =
            selectedCategories.some(
              (c) =>
                c.value === "ALL"
            );

          const matchesCategory =
            hasAll ||
            selectedCategories.length === 0
              ? true
              : selectedCategories.some(
                  (c) =>
                    c.value === category
                );

          const date =
            new Date(
              adj.created_at
            );

          const start =
            startDate
              ? new Date(
                  startDate
                )
              : null;

          const end = endDate
            ? new Date(endDate)
            : null;

          if (
            start &&
            date < start
          )
            return false;

          if (end) {
            end.setHours(
              23,
              59,
              59,
              999
            );

            if (date > end)
              return false;
          }

          return matchesCategory;
        }
      );
    }, [
      adjustments,
      selectedCategories,
      startDate,
      endDate,
      hasFilters,
    ]);

  // -----------------------------
  // CALCULATIONS
  // -----------------------------
  const serviceRevenue =
  filteredServiceSales.reduce(
    (sum, serviceSale) =>
      sum +
      Number(
        serviceSale.total_amount
      ),
    0
  );

  const serviceCogs =
  filteredServiceSales.reduce(
    (sum, serviceSale) =>
      sum +
      Number(
        serviceSale.cost_amount
      ),
    0
  );

  const serviceProfit =
  serviceRevenue -
  serviceCogs;

  const productRevenue =
    filteredSales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.total_amount
        ),
      0
    );

  const productCogs =
    filteredSales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.cost_amount
        ),
      0
    );

    const totalRevenue =
    businessType === "salon"
    ? productRevenue +
      serviceRevenue
    : productRevenue;

    const totalCogs =
    businessType === "salon"
    ? productCogs +
      serviceCogs
    : productCogs; 

  const grossProfit =
    totalRevenue -  totalCogs;

  const inventoryGain =
    filteredAdjustments
      .filter(
        (a) =>
          Number(a.pnl_amount) > 0
      )
      .reduce(
        (sum, a) =>
          sum +
          Number(a.pnl_amount),
        0
      );

  const inventoryLoss =
    filteredAdjustments
      .filter(
        (a) =>
          Number(a.pnl_amount) < 0
      )
      .reduce(
        (sum, a) =>
          sum +
          Math.abs(
            Number(a.pnl_amount)
          ),
        0
      );

  const expensesTotal =
    filteredExpenses.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount),
      0
    );

  const netProfit =
    grossProfit +
    inventoryGain -
    inventoryLoss -
    expensesTotal;

  const reportRows = [
    {
      item: "Sales Revenue",
      amount: productRevenue,
    },
     ...(businessType === "salon"
    ? [
        {
          item:
            "Service Revenue",
          amount:
            serviceRevenue,
        },
      ]
    : []),

    {
    item: "Total Revenue",
    amount: totalRevenue,
    },

    {
      item: "Cost of Goods Sold",
      amount: -productCogs,
    },

     ...(businessType === "salon"
    ? [
        {
          item:
            "Service Costs",
          amount:
            -serviceCogs,
        },
      ]
    : []),

    {
    item: "Total COGS",
    amount: -totalCogs,
    },
    {
      item: "Gross Profit",
      amount: grossProfit,
    },
    {
      item: "Inventory Gains",
      amount: inventoryGain,
    },
    {
      item: "Inventory Losses",
      amount: -inventoryLoss,
    },
    {
      item: "Operating Expenses",
      amount: -expensesTotal,
    },
    {
      item: "Net Profit",
      amount: netProfit,
    },
  ];

  function clearFilters() {
    setSelectedCategories([]);
    setStartDate("");
    setEndDate("");
  }

  function exportToExcel() {
    const worksheet =
      XLSX.utils.json_to_sheet(
        reportRows.map((row) => ({
          Description:
            row.item,
          Amount:
            row.amount,
        }))
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Profit & Loss"
    );

    XLSX.writeFile(
      workbook,
      "profit-loss-report.xlsx"
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Profit & Loss Report
        </h1>

        <p className="text-sm text-gray-500">
          Revenue, COGS, inventory adjustments
          and expenses
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
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
            menuPortalTarget={
              typeof window !==
              "undefined"
                ? document.body
                : undefined
            }
            menuPosition="fixed"
            styles={{
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
         className="w-full border rounded-lg px-3 py-2 text-sm text-gray-900"
        />

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

        <button
          onClick={clearFilters}
          className="w-full md:w-auto bg-white border text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50
          text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* Export */}
      <div className="flex justify-between sm:justify-end gap-2">
        <button>
          <FileText
            size={17}
            className="text-red-600"
          />
        </button>

        <button
          onClick={exportToExcel}
        >
          <FileSpreadsheet
            size={17}
            className="text-green-600"
          />
        </button>
      </div>

      {/* Report */}
      <div className="bg-white border rounded-xl shadow overflow-hidden">
         <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">
                Description
              </th>

              <th className="px-3 py-2 text-left">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {!hasFilters ? (
              <tr>
                <td
                  colSpan={2}
                  className="p-8 text-center text-gray-500"
                >
                  Select filters to generate report
                </td>
              </tr>
            ) : (
              <>
                {reportRows.map(
                  (row) => (
                    <tr
                      key={row.item}
                      className="border-t"
                    >
                      <td className="px-3 py-2">
                        {row.item}
                      </td>

                      <td
                        className={`px-3 py-2 font-medium ${
                          row.amount < 0
                            ? "text-red-600"
                            : row.item ===
                              "Net Profit"
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        {formatCurrency(
                          row.amount
                        )}
                      </td>
                    </tr>
                  )
                )}

                <tr className="bg-gray-50">
                  <td className="px-3 py-2 font-medium">
                    Report Period
                  </td>

                  <td className="px-3 py-2">
                    {startDate
                      ? formatDate(
                          startDate
                        )
                      : "Beginning"}
                    {" - "}
                    {endDate
                      ? formatDate(
                          endDate
                        )
                      : "Today"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}