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

type ServiceSale = {
  id: number;
  service_id: number;
  quantity: number;
  selling_price: number;
  total_amount: number;
  profit: number;
  service_date: string;

  services: {
    name: string;
  };
};

type Service = {
  id: number;
  name: string;
};

type OptionType = {
  value: string | number;
  label: string;
};

export default function SalesReportPage() {
  const [serviceSales, setServiceSales] =
    useState<ServiceSale[]>([]);

  const [services, setServices] =
    useState<Service[]>([]);

  const [selectedServices, setSelectedServices] =
    useState<OptionType[]>([]);

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
  async function fetchServiceSales() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("service_sales")
        .select(`
          *,
          services(
            name
          )
        `)
        .eq("business_id", businessId)
        .order("service_date", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setServiceSales(data || []);
  }

  // FETCH SERVICES
  async function fetchServices() {
    if (!businessId) return;

    const { data, error } =
      await supabase
        .from("services")
        .select("id, name")
        .eq("business_id", businessId)
        .order("name");

    if (error) {
      console.error(error);
      return;
    }

    setServices(data || []);
  }

 useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchServiceSales();
      fetchServices();
    }
  }, [businessId]);

 
  // OPTIONS
  const serviceOptions = [
  {
    value: "ALL",
    label: "All Services",
  },

  ...services.map((p) => ({
    value: p.id,
    label: p.name,
  })),
];

  // CHECK FILTERS
  const hasFilters =
    selectedServices.length > 0 ||
    startDate ||
    endDate;

  // FILTERED REPORT
  const reportServiceSales = useMemo(() => {
    if (!hasFilters) return [];

    return serviceSales.filter((serviceSale) => {
      const category =
        serviceSale.services;

      // SERVICE  FILTER
      const hasAllServices =
  selectedServices.some(
    (p) => p.value === "ALL"
  );

const matchesService =
  hasAllServices ||
  selectedServices.length === 0
    ? true
    : selectedServices.some(
        (p) =>
          p.value ===
          serviceSale.service_id
      );

      // DATE FILTER
      const saleDate = new Date(
        serviceSale.service_date
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
        matchesService 
      );
    });
  }, [
    serviceSales,
    selectedServices,
    startDate,
    endDate,
    hasFilters,
  ]);

  // TOTALS
  const totals = useMemo(() => {
    return reportServiceSales.reduce(
      (acc, serviceSale) => {
        acc.quantity += Number(
          serviceSale.quantity
        );

        acc.sales += Number(
          serviceSale.total_amount
        );

        acc.profit += Number(
          serviceSale.profit
        );

        return acc;
      },
      {
        quantity: 0,
        sales: 0,
        profit: 0,
      }
    );
  }, [reportServiceSales]);

  // CLEAR FILTERS
  function clearFilters() {
    setSelectedServices([]);
    setStartDate("");
    setEndDate("");
  }

  // EXPORT EXCEL
  function exportToExcel() {
    if (reportServiceSales.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData =
      reportServiceSales.map((serviceSale) => ({
        Service:
          serviceSale.services?.name,

        Quantity: serviceSale.quantity,

        Sales: serviceSale.total_amount,

        Profit: serviceSale.profit,

        Date: new Date(
          serviceSale.service_date
        ).toLocaleDateString(),
      }));

    // TOTAL ROW
    exportData.push({
      Service: "TOTAL",
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
      "Service Sales Report"
    );

    XLSX.writeFile(
      workbook,
      "sales-report.xlsx"
    );
  }

  const totalServiceSales =
  reportServiceSales.reduce(
    (sum, sale) =>
      sum +
      Number(
        sale.total_amount
      ),
    0
  );

const totalServiceProfit =
  reportServiceSales.reduce(
    (sum, sale) =>
      sum +
      Number(sale.profit),
    0
  );

const overallServiceMargin =
  totalServiceSales > 0
    ? (
        (totalServiceProfit /
          totalServiceSales) *
        100
      ).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          Services Sales Report
        </h1>

        <p className="text-sm text-gray-500">
          Filtered business analytics
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

        {/* SERVICES */}
        <div className="w-full">
          <Select
            isMulti
            options={serviceOptions}
            value={selectedServices}
            onChange={(value) =>
              setSelectedServices(
                value as OptionType[]
              )
            }
            placeholder="Select Services..."
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
                 Service
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Qty
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Service Sales
                </th>

                <th className="px-3 py-2 text-left border border-gray-200">
                  Profit
                </th>

                <th className="px-3 py-2 border border-gray-200">
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
              ) : reportServiceSales.length === 0 ? (

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
                  {reportServiceSales.map(
                    (serviceSale) => (
                      <tr
                        key={serviceSale.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-3 py-2 border border-gray-200">
                          {
                            serviceSale.services
                              ?.name
                          }
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {
                            serviceSale.quantity
                          }
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {formatCurrency(
                            serviceSale.total_amount
                          )}
                        </td>

                        <td className="px-3 py-2 text-green-700 border border-gray-200">
                          {formatCurrency(
                            serviceSale.profit
                          )}
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                          {serviceSale.total_amount > 0
                            ? (
                                (serviceSale.profit /
                                  serviceSale.total_amount) *
                                100
                              ).toFixed(2)
                            : "0"}
                          %
                        </td>

                        <td className="px-3 py-2 border border-gray-200">
                        {formatDate(serviceSale.service_date)}
                        </td>
                      </tr>
                    )
                  )}

                  {/* TOTAL ROW */}
                  <tr className="bg-gray-50 font-bold border-t">
                    <td className="px-3 py-2 border border-gray-200">
                      TOTAL
                    </td>

                 

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
                      {overallServiceMargin}%
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