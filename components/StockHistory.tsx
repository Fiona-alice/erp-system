"use client";

import { useEffect, useState } from "react";

import { supabase }
from "@/lib/supabase";

type Movement = {
  id: number;
  movement_type: string;
  quantity: number;
  notes: string;
  created_at: string;
};

export default function StockHistory({
  productId,
}: {
  productId: number;
}) {
  const [movements, setMovements] =
    useState<Movement[]>([]);

  async function fetchHistory() {
    const { data, error } =
      await supabase
        .from("stock_movements")
        .select("*")
        .eq(
          "product_id",
          productId
        )
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setMovements(data || []);
  }

  useEffect(() => {
    if (productId) {
      fetchHistory();
    }
  }, [productId]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">
              Date
            </th>

            <th className="p-2 border">
              Type
            </th>

            <th className="p-2 border">
              Quantity
            </th>

            <th className="p-2 border">
              Notes
            </th>
          </tr>
        </thead>

        <tbody>
          {movements.map(
            (movement) => (
              <tr key={movement.id}>
                <td className="p-2 border">
                  {new Date(
                    movement.created_at
                  ).toLocaleString()}
                </td>

                <td className="p-2 border capitalize">
                  {
                    movement.movement_type
                  }
                </td>

                <td className="p-2 border">
                  {
                    movement.quantity
                  }
                </td>

                <td className="p-2 border">
                  {movement.notes}
                </td>
              </tr>
            )
          )}
        </tbody>

      </table>
    </div>
  );
}