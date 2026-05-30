"use client";

import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import {
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  notes: string | null;
  expense_date: string;
  created_at: string;
};

type OptionType = {
  value: string;
  label: string;
};

export default function ExpenseReportPage() {
  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<OptionType[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  // FETCH EXPENSES
  async function fetchExpenses() {
    const { data, error } =
      await supabase
        .from("expenses")
        .select("*")
        .order("expense_date", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setExpenses(
      (data as unknown as Expense[]) ||
        []
    );
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  // CATEGORY OPTIONS
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        expenses.map(
          (expense) =>
            expense.category
        )
      )
    );
  }, [expenses]);

  const categoryOptions = [
    {
      value: "ALL",
      label: "All Categories",
    },

    ...categories.map(
      (category) => ({
        value: category,
        label: category,
      })
    ),
  ];

  // CHECK FILTERS
  const hasFilters =
    selectedCategories.length > 0 ||
    startDate ||
    endDate;

  // FILTER REPORT
  const reportExpenses =
    useMemo(() => {
      if (!hasFilters) return [];

      return expenses.filter(
        (expense) => {
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
                    expense.category
                );

          const expenseDate =
            new Date(
              expense.expense_date
            );

          const start = startDate
            ? new Date(startDate)
            : null;

          const end = endDate
            ? new Date(endDate)
            : null;

          if (
            start &&
            expenseDate < start
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
              expenseDate > end
            ) {
              return false;
            }
          }

          return matchesCategory;
        }
      );
    }, [
      expenses,
      selectedCategories,
      startDate,
      endDate,
      hasFilters,
    ]);

  // TOTALS
  const totalExpenses =
    reportExpenses.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount),
      0
    );

  // CLEAR FILTERS
  function clearFilters() {
    setSelectedCategories([]);
    setStartDate("");
    setEndDate("");
  }

  // EXPORT EXCEL
  function exportToExcel() {
    if (
      reportExpenses.length === 0
    ) {
      alert("No data to export");
      return;
    }

    const exportData =
      reportExpenses.map(
        (expense) => ({
          Title: expense.title,

          Category:
            expense.category,

          Amount:
            expense.amount,

          Notes:
            expense.notes || "",

          Date:
            expense.expense_date,
        })
      );

    exportData.push({
      Title: "TOTAL",
      Category: "",
      Amount: totalExpenses,
      Notes: "",
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
      "Expense Report"
    );

    XLSX.writeFile(
      workbook,
      "expense-report.xlsx"
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Expense Report
        </h1>

        <p className="text-gray-500">
          Analyze expenses by category
          and period
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3 items-start">

        {/* CATEGORY */}
        <div className="min-w-[260px]">
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
    typeof window !== "undefined"
      ? document.body
      : null
  }

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

    menu: (base) => ({
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
          className="border px-3 py-2 rounded-lg"
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
          className="border px-3 py-2 rounded-lg"
        />

        {/* CLEAR */}
        <button
          onClick={
            clearFilters
          }
          className="bg-white border text-blue-900 px-3 py-2 rounded-lg hover:bg-blue-50 text-sm"
        >
          Clear
        </button>

      </div>

      {/* EXPORTS */}
      <div className="flex justify-end gap-2">

        <button
          title="Export PDF"
          className="p-1.5 rounded-md hover:bg-gray-100"
        >
          <FileText
            size={17}
            className="text-red-600"
          />
        </button>

        <button
          title="Export Excel"
          onClick={
            exportToExcel
          }
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

          <table className="w-full text-sm">

            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>

                <th className="p-3 text-left">
                  Title
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Amount
                </th>

                <th className="p-3 text-left">
                  Notes
                </th>

                <th className="p-3 text-left">
                  Expense Date
                </th>

                <th className="p-3 text-left">
                  Created
                </th>

              </tr>
            </thead>

            <tbody>

              {!hasFilters ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-gray-500"
                  >
                    Select filters to
                    generate a report
                  </td>
                </tr>
              ) : reportExpenses.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                <>
                  {reportExpenses.map(
                    (expense) => (
                      <tr
                        key={
                          expense.id
                        }
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3">
                          {
                            expense.title
                          }
                        </td>

                        <td className="p-3 text-blue-900">
                          {
                            expense.category
                          }
                        </td>

                        <td className="p-3 text-red-600">
                          {formatCurrency(
                            expense.amount
                          )}
                        </td>

                        <td className="p-3">
                          {expense.notes}
                        </td>

                        <td className="p-3">
                          {formatDate(
                            expense.expense_date
                          )}
                        </td>

                        <td className="p-3">
                          {formatDate(
                            expense.created_at
                          )}
                        </td>
                      </tr>
                    )
                  )}

                  {/* TOTAL ROW */}
                  <tr className="bg-gray-50 font-bold border-t">

                    <td className="p-3">
                      TOTAL
                    </td>

                    <td></td>

                    <td className="p-3 text-red-600">
                      {formatCurrency(
                        totalExpenses
                      )}
                    </td>

                    <td></td>
                    <td></td>
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