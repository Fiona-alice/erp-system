"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getBusinessType } from "@/lib/getBusinessType";


export default function ReportsPage() {
  const [businessType, setBusinessType] =
  useState("");

useEffect(() => {
  async function loadBusiness() {
    const type =
      await getBusinessType();

    setBusinessType(type);
  }

  loadBusiness();
}, []);


const reports = [
  {
    name: "Sales Report",
    href: "/dashboard/reports/sales",
    type: "Sales",
    description:
      "View sales transactions, revenue, quantities sold and profit.",
  },

  {
    name: "Purchase Report",
    href:
      "/dashboard/reports/purchases",
    type: "Purchases",
    description:
      "View supplier purchases, stock received and purchase costs.",
  },

    {
        name: "Salon Report",
        href: "/dashboard/reports/service-sales",
        type: "Saloon Sales",
        description:
          "View Service sales transactions, revenue, quantities sold and profit.",
      },

  {
    name: "Inventory Report",
    href:
      "/dashboard/reports/inventory",
    type: "Inventory",
    description:
      "View stock levels, inventory value and low stock products.",
  },

  {
    name: "Expense Report",
    href:
      "/dashboard/reports/expenses",
    type: "Expenses",
    description:
      "View expenses by category, date and expense trends.",
  },
  
  {
    name: "Low Stock Report",
    href:
      "/dashboard/reports/low-stock",
    type: "Inventory",
    description:
      "View low stocks of the different products.",
  },

  {
    name: "Profit & Loss",
    href:
      "/dashboard/reports/profit-loss",
    type: "Finance",
    description:
      "View revenue, expenses, gross profit and net profit.",
  },
];

const filteredReports =
  reports.filter((report) => {
    // Hide salon report
    // for non-salon businesses
    if (
      report.href ===
        "/dashboard/reports/service-sales" &&
      businessType !== "salon"
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Reports
        </h1>

        <p className="text-sm text-gray-500">
          Business reporting
          center
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2 border border-gray-200">
                Report Name
              </th>

              <th className="text-left px-3 py-2 border border-gray-200">
                Type
              </th>

              <th className="text-left px-3 py-2 border border-gray-200">
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((report) => (
              <tr
                key={report.name}
                className="border-t hover:bg-gray-50"
              >
                {/* LINK */}
                <td className="px-3 py-2 border border-gray-200">
                  <Link
                    href={report.href}
                    className="text-blue-700 hover:underline font-medium"
                  >
                    {report.name}
                  </Link>
                </td>

                {/* TYPE */}
                <td className="px-3 py-2 text-gray-600 border border-gray-200">
                  {report.type}
                </td>

                {/* DESCRIPTION */}
                <td className="px-3 py-2 text-gray-500 border border-gray-200">
                  {
                    report.description
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}