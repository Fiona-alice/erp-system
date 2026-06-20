"use client";

import { useEffect, useMemo, useState, } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  ShoppingCart,
  TrendingUp,
  Wallet,
  Package,
  Receipt,
  HandCoins,
  Coins,
  Banknote,
} from "lucide-react";
import { getBusinessId } from "@/lib/getBusinessId";
import { getBusinessType } from "@/lib/getBusinessType";
import { supabase } from "@/lib/supabase";

import {
  formatCurrency,
} from "@/lib/formatCurrency";

type Sale = {
  total_amount: number;
  profit: number;
  sale_date: string;
  created_at: string;
  quantity: number;
  products?: {
    name: string;
  };
};

type ServiceSale = {
  total_amount: number;
  profit: number;
  service_date: string;
};

type Expense = {
  amount: number;
  category: string;
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

type Purchase = {
  total_amount: number;
  purchase_date: string;
};

export default function DashboardPage() {

  const [businessId, setBusinessId] =
  useState<string>("");

  const [businessType, setBusinessType,] = 
  useState("");
  
  const [roleLoading, setRoleLoading] =
  useState(true);

  const [isAdmin, setIsAdmin] =
  useState(false);

  const [sales, setSales] =
    useState<Sale[]>([]);

  const [serviceSales, setServiceSales] =
  useState<ServiceSale[]>([]);

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [rentals, setRentals] =
    useState<Rental[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [purchases, setPurchases] =
  useState<Purchase[]>([]);  

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const router = useRouter(); 

  const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0891b2",
  "#ea580c",
  "#65a30d",
  "#7c3aed",
  "#db2777",
];

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

 async function loadBusinessType() {
  const type =
    await getBusinessType();

  if (type) {
    setBusinessType(type);
  }
}

  // FETCH SALES
  async function fetchSales( businessId: string) {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
        *,
        products (
          name
        )
      `)
        .eq("business_id", businessId);

    if (error) {
      console.error(error);
      return;
    }

    setSales(data || []);
  }

   // FETCH SERVICE SALES
    async function fetchServiceSales(
      businessId: string
    ) {
      const { data, error } =
        await supabase
          .from("service_sales")
          .select("*")
          .eq(
            "business_id",
            businessId
          );

      if (error) {
        console.error(error);
        return;
      }

      setServiceSales(data || []);
    }

     // FETCH PURCHASES
    async function fetchPurchases(
        businessId: string
      ) {
        const { data, error } =
          await supabase
            .from("purchases")
            .select("*")
            .eq("business_id", businessId);

        if (error) {
          console.error(error);
          return;
        }

        setPurchases(data || []);
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
    fetchServiceSales(id);
    fetchExpenses(id);
    fetchRentals(id);
    fetchProducts(id);
    fetchPurchases(id);
  }
  loadBusinessType();
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

    // FILTER SERVICE SALES    
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
        serviceSales,
        startDate,
        endDate,
      ]);

      // FILTER PURCHASES
      const filteredPurchases =
        useMemo(() => {
          return purchases.filter(
            (purchase) => {
              const purchaseDate =
                new Date(
                  purchase.purchase_date
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

              return true;
            }
          );
        }, [
          purchases,
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

  const totalServiceSales =
  filteredServiceSales.reduce(
    (sum, sale) =>
      sum +
      Number(
        sale.total_amount
      ),
    0
  );

  const combinedSales =
  totalSales +
  totalServiceSales;

  // GROSS PROFIT
  const grossProfit =
    filteredSales.reduce(
      (sum, sale) =>
        sum +
        Number(sale.profit),
      0
    );

  const serviceProfit =
  filteredServiceSales.reduce(
    (sum, sale) =>
      sum +
      Number(sale.profit),
    0
  );
   
  const combinedProfit =
  grossProfit +
  serviceProfit;

   // TOTAL PURCHASES
  const totalPurchases =
  filteredPurchases.reduce(
    (sum, purchase) =>
      sum +
      Number(
        purchase.total_amount
      ),
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
  combinedProfit +
  rentalIncome -
  totalExpenses;

  // GROSS PROFIT MARGIN
  const grossProfitMargin =
    combinedSales > 0
      ? (combinedProfit /
          combinedSales) *
        100
      : 0;

  // NET PROFIT MARGIN
  const netProfitMargin =
    combinedSales > 0
      ? (netProfit /
          combinedSales) *
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

      // SERVICE SALES
        if (
          businessType ===
          "salon"
        ) {
          filteredServiceSales.forEach(
            (sale) => {
              const month =
                new Date(
                  sale.service_date
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
        }

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

const topProductsData =
  useMemo(() => {
    const grouped: Record<
      string,
      number
    > = {};

    filteredSales.forEach(
      (sale) => {
        const name =
          sale.products
            ?.name ||
          "Unknown";

        grouped[name] =
          (grouped[name] ||
            0) +
          Number(
            sale.total_amount
          );
      }
    );

    return Object.entries(
      grouped
    )
      .map(
        ([name, value]) => ({
          name,
          value,
        })
      )
      .sort(
        (a, b) =>
          b.value -
          a.value
      )
      .slice(0, 7);
  }, [filteredSales]);

  const expensePieData =
  useMemo(() => {
    const grouped: Record<
      string,
      number
    > = {};

    filteredExpenses.forEach(
      (expense) => {
        const category =
          expense.category ||
          "Other";

        grouped[
          category
        ] =
          (grouped[
            category
          ] || 0) +
          Number(
            expense.amount
          );
      }
    );

    return Object.entries(
      grouped
    )
      .map(
        ([name, value]) => ({
          name,
          value,
        })
      )
      .sort(
        (a, b) =>
          b.value -
          a.value
      )
      .slice(0, 7);
  }, [filteredExpenses]);


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
    <div className="space-y-6 md:space-y-10 px-3 sm:px-4 md:px-0">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-900">
            Dashboard Analytics
          </h1>

          <p className="text-gray-500 mt-1">
            Business performance overview
          </p>
        </div>

        {/* DATE FILTERS */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="border rounded-lg px-3 py-2 bg-white w-full sm:w-auto"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="border rounded-lg px-3 py-2 bg-white w-full sm:w-auto"
          />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* SALES */}
        <div className="bg-white border border-blue-600 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Total Sales
            (UGX)
          </p>
          <HandCoins
            size={20}
            className="text-blue-600"
          />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              combinedSales
            )}
          </h2>
        </div>

        {businessType ===
          "salon" && (
          <div className="bg-white border border-blue-600 rounded-2xl shadow border p-4 md:p-5">
            <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-blue-900">
              Salon Revenue
              (UGX)
            </p>
           <HandCoins
            size={20}
            className="text-blue-600"
          />
          </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
              {formatCurrency(
                totalServiceSales
              )}
            </h2>
          </div>
        )}

        {/* GROSS PROFIT */}
        <div className="bg-white border border-green-500 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Gross Profit
            (UGX)
          </p>
           <Coins
            size={20}
            className="text-green-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              combinedProfit
            )}
          </h2>
        </div>

        {businessType ===
          "salon" && (
          <div className="bg-white border border-green-500 rounded-2xl shadow border p-4 md:p-5">
            <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-blue-900">
              Salon Profit
              (UGX)
            </p>
            <Coins
            size={20}
            className="text-green-600"
          />
         </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
              {formatCurrency(
                serviceProfit
              )}
            </h2>
          </div>
        )}

        {/* RENTALS */}
        <div className="bg-white border border-blue-600 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Rental Income
            (UGX)
          </p>
          <HandCoins
            size={20}
            className="text-blue-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              rentalIncome
            )}
          </h2>
        </div>

        {/* EXPENSES */}
        <div className="bg-white border border-red-500 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Total Expenses
            (UGX)
          </p>
          <Receipt
            size={20}
            className="text-red-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              totalExpenses
            )}
          </h2>
        </div>

        {/* PURCHASES */}
        <div className="bg-white border border-purple-600 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Total Purchases (UGX)
          </p>
          <ShoppingCart
            size={20}
            className="text-purple-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              totalPurchases
            )}
          </h2>
        </div>

        {/* NET PROFIT */}
        <div className="bg-white border border-green-500 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Net Profit
            (UGX)
          </p>
          <Coins
            size={20}
            className="text-green-600"
          />
         </div>
          <h2
            className={`text-lg sm:text-xl md:text-2xl font-bold mt-2 break-words ${
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
        <div className="bg-white rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Gross Profit
            Margin
          </p>
          <TrendingUp
            size={20}
            className="text-green-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {grossProfitMargin.toFixed(
              2
            )}
            %
          </h2>
        </div>

        {/* NET MARGIN */}
        <div className="bg-white rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Net Profit
            Margin
          </p>
          <TrendingUp
            size={20}
            className="text-green-600"
          />
         </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {netProfitMargin.toFixed(
              2
            )}
            %
          </h2>
        </div>

        {/* INVENTORY */}
        <div className="bg-white border border-purple-600 rounded-2xl shadow border p-4 md:p-5">
          <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-blue-900">
            Inventory Cost
            (UGX)
          </p>
          <Package
            size={20}
            className="text-purple-600"
          />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500 mt-2 break-words">
            {formatCurrency(
              inventoryCost
            )}
          </h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl shadow border p-4 md:p-6">
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

        <div className="overflow-x-auto">
        <div className="min-w-[700px] h-[280px] sm:h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />

              <YAxis
                tick={{ fontSize: 10 }}
                width={50}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
                 formatter={(value, name) => [
                  formatCurrency(
                    Number(value)
                  ),
                  name,
                ]}
                />

              <Legend />
              <Bar
                dataKey="sales"
                fill="#7bb0ff"
                radius={[
                  4,
                  4,
                  0,
                  0,
                ]}
              />

              <Bar
                dataKey="profit"
                fill="#5ace86"
                radius={[
                  4,
                  4,
                  0,
                  0,
                ]}
              />

              <Bar
                dataKey="expenses"
                fill="#eb7a7a"
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

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
  {/* TOP PRODUCTS */}
  <div className="bg-white rounded-2xl shadow border p-4 md:p-6">
  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-4">
    Top Selling Products
  </h2>

  <div className="h-[300px] md:h-[400px]">
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={topProductsData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          labelLine={false}
          label={({ percent }) =>
            (percent ?? 0) > 0.05
              ? `${(
                  (percent ?? 0) *
                  100
                ).toFixed(0)}%`
              : ""
          }
        >
          {topProductsData.map(
            (_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip
          formatter={(
            value,
            name
          ) => [
            formatCurrency(
              Number(value)
            ),
            name,
          ]}
        />

        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

  {/* EXPENSES */}
  <div className="bg-white rounded-2xl shadow border p-4 md:p-6">
  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-4">
      Top Expense Categories
    </h2>

    <div className="h-[300px] md:h-[400px]">
      <ResponsiveContainer
       width="100%"
       height="100%"
      >
        <PieChart>
          <Pie
            data={expensePieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            labelLine={false}
            label={({ percent }) =>
              (percent ?? 0) > 0.05
                ? `${(
                    (percent ?? 0) *
                    100
                  ).toFixed(0)}%`
                : ""
            }
          >
            {expensePieData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
                />
              )
            )}
          </Pie>

          <Tooltip
            formatter={(
              value,
              name
            ) => [
              formatCurrency(
                Number(
                  value
                )
              ),
               name,
            ]}
          />
          <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>
    </div>
  );
}