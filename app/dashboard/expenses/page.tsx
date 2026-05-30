"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { formatCurrency, } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getBusinessId } from "@/lib/getBusinessId";

type Expense = {
  id: number;

  title: string;

  category: string;

  amount: number;

  notes: string;

  expense_date: string;

  created_at: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);

  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // FORM STATES
  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [expenseDate, setExpenseDate] =
    useState("");

  // FETCH EXPENSES
  async function fetchExpenses() {
    const { data, error } =
      await supabase
        .from("expenses")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.error(error);

      return;
    }

    setExpenses(data || []);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  // CLEAR FORM
  function clearForm() {
    setTitle("");

    setCategory("");

    setAmount("");

    setNotes("");

    setExpenseDate("");
  }

  // SAVE EXPENSE
  async function saveExpense() {
    if (
      !title ||
      !category ||
      !amount ||
      !expenseDate
    ) {
      alert("Fill all fields");

      return;
    }
    
    const businessId = await getBusinessId();
    const { error } = await supabase
      .from("expenses")
      .insert([
        {
           
          business_id: businessId,
          title,

          category,

          amount: Number(amount),

          notes,

          expense_date: expenseDate,
        },
      ]);

    if (error) {
      console.error(error);

      alert("Failed to save expense");

      return;
    }

    clearForm();

    setIsOpen(false);

    fetchExpenses();
  }

  // OPEN EDIT MODAL
  function openEditModal(
    expense: Expense
  ) {
    setEditingExpense(expense);

    setTitle(expense.title);

    setCategory(expense.category);

    setAmount(
      String(expense.amount)
    );

    setNotes(expense.notes || "");

    setExpenseDate(
      expense.expense_date
    );

    setIsOpen(true);
  }

  // UPDATE EXPENSE
  async function updateExpense() {
    if (!editingExpense) return;

    const { error } = await supabase
      .from("expenses")
      .update({
        title,

        category,

        amount: Number(amount),

        notes,

        expense_date: expenseDate,
      })
      .eq("id", editingExpense.id);

    if (error) {
      console.error(error);

      alert("Failed to update expense");

      return;
    }

    clearForm();

    setEditingExpense(null);

    setIsOpen(false);

    fetchExpenses();
  }

  // DELETE EXPENSE
  async function deleteExpense(
    expense: Expense
  ) {
    const confirmDelete = confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expense.id);

    if (error) {
      console.error(error);

      return;
    }

    setSelectedExpense(null);

    fetchExpenses();
  }

  // SEARCH FILTER
  const filteredExpenses =
    expenses.filter((expense) =>
      expense.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // TOTAL EXPENSES
  const totalExpenses =
    filteredExpenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Expenses
        </h1>

        <p className="text-gray-500 mt-1">
          Manage business expenses
        </p>
      </div>

      {/* SUMMARY */}
      {/* <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="text-lg font-semibold">
          Total Expenses
        </h2>

        <p className="text-2xl font-bold text-red-600 mt-2">
          UGX{" "}
          {totalExpenses.toFixed(2)}
        </p>
      </div> */}

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-wrap gap-2 items-center justify-between text-sm">
        <div className="flex gap-3">
          {/* ADD */}
          <button
            onClick={() => {
              clearForm();

              setEditingExpense(null);

              setIsOpen(true);
            }}
             className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-100"
          >
            New
          </button>

          {/* EDIT */}
          <button
            disabled={!selectedExpense}
            onClick={() =>
              selectedExpense &&
              openEditModal(
                selectedExpense
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            disabled={!selectedExpense}
            onClick={() =>
              selectedExpense &&
              deleteExpense(
                selectedExpense
              )
            }
            className="bg-gray-100 text-blue-700 border px-3 py-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Delete
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search expenses..."
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
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 border border-gray-200">
                Title
              </th>

              <th className="text-left p-2 border border-gray-200">
                Category
              </th>

              <th className="text-left p-2 border border-gray-200">
                Amount
              </th>

              <th className="text-left p-2 border border-gray-200">
                Date
              </th>

              <th className="text-left p-2 border border-gray-200">
                Notes
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map(
              (expense) => (
                <tr
                  key={expense.id}
                  onClick={() =>
                    setSelectedExpense(
                      expense
                    )
                  }
                  className={`border-t cursor-pointer hover:bg-gray-50 ${
                    selectedExpense?.id ===
                    expense.id
                      ? "bg-blue-100"
                      : ""
                  }`}
                >
                  <td className="p-2 text-gray-700 border border-gray-200">
                    {expense.title}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {expense.category}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    UGX{" "}
                    UGX {formatCurrency(expense.amount)}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {formatDate(expense.expense_date)}
                  </td>

                  <td className="p-2 text-gray-700 border border-gray-200">
                    {expense.notes}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      {/* MODAL */}
      <Dialog
        open={isOpen}
        onClose={() =>
          setIsOpen(false)
        }
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-2xl font-bold mb-4">
              {editingExpense
                ? "Edit Expense"
                : "Add Expense"}
            </Dialog.Title>

            <div className="space-y-3">
              {/* TITLE */}
              <input
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* CATEGORY */}
              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">
                  Select Category
                </option>

                <option>
                  Rent
                </option>

                <option>
                  Transport
                </option>

                <option>
                  Fuel
                </option>

                <option>
                  Salaries
                </option>

                <option>
                  Electricity
                </option>

                <option>
                  Internet
                </option>

                <option>
                  Repairs
                </option>

                <option>
                  Other
                </option>
              </select>

              {/* AMOUNT */}
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* DATE */}
              <input
                type="date"
                value={expenseDate}
                onChange={(e) =>
                  setExpenseDate(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* NOTES */}
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg"
              />

              {/* BUTTON */}
              <button
                onClick={
                  editingExpense
                    ? updateExpense
                    : saveExpense
                }
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {editingExpense
                  ? "Update Expense"
                  : "Save Expense"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}