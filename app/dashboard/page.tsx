"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getBusinessId } from "@/lib/getBusinessId";
import { supabase } from "@/lib/supabase";

import {
  formatCurrency,
} from "@/lib/formatCurrency";

type Sale = {
  total_amount: number;
  profit: number;
  sale_date: string;
  created_at: string;
};

type Expense = {
  amount: number;
  expense_date: string;
};

type Rental = {
  total_amount: number;
  created_at: string;
};

type Product = {
  stock_quantity: number;
  buying_price: number;
};

export default function DashboardPage() {

  const [businessId, setBusinessId] =
  useState<string>("");
  
  const [roleLoading, setRoleLoading] =
  useState(true);

  const [isAdmin, setIsAdmin] =
  useState(false);

  const [sales, setSales] =
    useState<Sale[]>([]);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [rentals, setRentals] =
    useState<Rental[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const router = useRouter(); 
  
  useEffect(() => {
  async function checkRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    const { data } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role === "admin") {
      setIsAdmin(true);
    } else {
      router.replace(
        "/dashboard/products"
      );
    }

    setRoleLoading(false);
  }

  checkRole();
}, [router]);

 

  // FETCH SALES
  async function fetchSales( businessId: string) {
    const { data, error } =
      await supabase
        .from("sales")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setSales(data || []);
  }

  // FETCH EXPENSES
  async function fetchExpenses( businessId: string) {
    const { data, error } =
      await supabase
        .from("expenses")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setExpenses(data || []);
  }

  // FETCH RENTALS
  async function fetchRentals( businessId: string) {
    const { data, error } =
      await supabase
        .from("rentals")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setRentals(data || []);
  }

  // FETCH PRODUCTS
  async function fetchProducts( businessId: string) {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

 useEffect(() => {
  async function loadData() {
    const id = await getBusinessId();

    if (!id) return;

    setBusinessId(id);

    fetchSales(id);
    fetchExpenses(id);
    fetchRentals(id);
    fetchProducts(id);
  }
  loadData();
}, []);

  // FILTER SALES
  const filteredSales =
    useMemo(() => {
      return sales.filter(
        (sale) => {
          const saleDate =
            new Date(
              sale.sale_date
            );

          const start =
            startDate
              ? new Date(
                  startDate
                )
              : null;

          const end =
            endDate
              ? new Date(
                  endDate
                )
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
      sales,
      startDate,
      endDate,
    ]);

  // FILTER EXPENSES
  const filteredExpenses =
    useMemo(() => {
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

          const end =
            endDate
              ? new Date(
                  endDate
                )
              : null;

          if (
            start &&
            expenseDate <
              start
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
              expenseDate >
              end
            ) {
              return false;
            }
          }

          return true;
        }
      );
    }, [
      expenses,
      startDate,
      endDate,
    ]);

  // FILTER RENTALS
  const filteredRentals =
    useMemo(() => {
      return rentals.filter(
        (rental) => {
          const rentalDate =
            new Date(
              rental.created_at
            );

          const start =
            startDate
              ? new Date(
                  startDate
                )
              : null;

          const end =
            endDate
              ? new Date(
                  endDate
                )
              : null;

          if (
            start &&
            rentalDate < start
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
              rentalDate >
              end
            ) {
              return false;
            }
          }

          return true;
        }
      );
    }, [
      rentals,
      startDate,
      endDate,
    ]);

  // TOTAL SALES
  const totalSales =
    filteredSales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.total_amount
        ),
      0
    );

  // GROSS PROFIT
  const grossProfit =
    filteredSales.reduce(
      (sum, sale) =>
        sum +
        Number(sale.profit),
      0
    );

  // TOTAL EXPENSES
  const totalExpenses =
    filteredExpenses.reduce(
      (sum, expense) =>
        sum +
        Number(
          expense.amount
        ),
      0
    );

  // RENTAL INCOME
  const rentalIncome =
    filteredRentals.reduce(
      (sum, rental) =>
        sum +
        Number(
          rental.total_amount
        ),
      0
    );

  // INVENTORY COST
  const inventoryCost =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.stock_quantity
        ) *
          Number(
            product.buying_price
          ),
      0
    );

  // NET PROFIT
  const netProfit =
    grossProfit +
    rentalIncome -
    totalExpenses;

  // GROSS PROFIT MARGIN
  const grossProfitMargin =
    totalSales > 0
      ? (grossProfit /
          totalSales) *
        100
      : 0;

  // NET PROFIT MARGIN
  const netProfitMargin =
    totalSales > 0
      ? (netProfit /
          totalSales) *
        100
      : 0;

  // CHART DATA
  const chartData =
    useMemo(() => {
      const monthlyData: Record<
        string,
        {
          month: string;
          sales: number;
          profit: number;
          expenses: number;
        }
      > = {};

      // SALES
      filteredSales.forEach(
        (sale) => {
          const month =
            new Date(
              sale.sale_date
            ).toLocaleString(
              "default",
              {
                month:
                  "short",
                year:
                  "numeric",
              }
            );

          if (
            !monthlyData[
              month
            ]
          ) {
            monthlyData[
              month
            ] = {
              month,
              sales: 0,
              profit: 0,
              expenses: 0,
            };
          }

          monthlyData[
            month
          ].sales += Number(
            sale.total_amount
          );

          monthlyData[
            month
          ].profit += Number(
            sale.profit
          );
        }
      );

      // EXPENSES
      filteredExpenses.forEach(
        (expense) => {
          const month =
            new Date(
              expense.expense_date
            ).toLocaleString(
              "default",
              {
                month:
                  "short",
                year:
                  "numeric",
              }
            );

          if (
            !monthlyData[
              month
            ]
          ) {
            monthlyData[
              month
            ] = {
              month,
              sales: 0,
              profit: 0,
              expenses: 0,
            };
          }

          monthlyData[
            month
          ].expenses +=
            Number(
              expense.amount
            );
        }
      );

      return Object.values(
        monthlyData
      );
    }, [
      filteredSales,
      filteredExpenses,
    ]);  

 if (roleLoading) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      Loading...
    </div>
  );
}

if (!isAdmin) {
  return null;
} 
    
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Dashboard Analytics
          </h1>

          <p className="text-gray-500 mt-1">
            Business performance overview
          </p>
        </div>

        {/* DATE FILTERS */}
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="border rounded-lg px-2 py-1.5 bg-white"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="border rounded-lg px-2 py-1.5 bg-white"
          />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* SALES */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Total Sales
            (UGX)
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {formatCurrency(
              totalSales
            )}
          </h2>
        </div>

        {/* GROSS PROFIT */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Gross Profit
            (UGX)
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {formatCurrency(
              grossProfit
            )}
          </h2>
        </div>

        {/* RENTALS */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Rental Income
            (UGX)
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {formatCurrency(
              rentalIncome
            )}
          </h2>
        </div>

        {/* EXPENSES */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Total Expenses
            (UGX)
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {formatCurrency(
              totalExpenses
            )}
          </h2>
        </div>

        {/* NET PROFIT */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Net Profit
            (UGX)
          </p>

          <h2
            className={`text-2xl font-bold mt-2 ${
              netProfit >= 0
                ? "text-gray-500"
                : "text-red-600"
            }`}
          >
            {formatCurrency(
              netProfit
            )}
          </h2>
        </div>

        {/* GROSS MARGIN */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Gross Profit
            Margin
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {grossProfitMargin.toFixed(
              2
            )}
            %
          </h2>
        </div>

        {/* NET MARGIN */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Net Profit
            Margin
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {netProfitMargin.toFixed(
              2
            )}
            %
          </h2>
        </div>

        {/* INVENTORY */}
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm font-bold text-blue-900">
            Inventory Cost
            (UGX)
          </p>

          <h2 className="text-2xl font-bold text-gray-500 mt-2">
            {formatCurrency(
              inventoryCost
            )}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-900">
            Monthly
            Financial
            Trends
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Sales, Profit &
            Expenses by Month
          </p>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#93c5fd"
                radius={[
                  4,
                  4,
                  0,
                  0,
                ]}
              />

              <Bar
                dataKey="profit"
                fill="#93c5fd"
                radius={[
                  4,
                  4,
                  0,
                  0,
                ]}
              />

              <Bar
                dataKey="expenses"
                fill="#93c5fd"
                radius={[
                  4,
                  4,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}