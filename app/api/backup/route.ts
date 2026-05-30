import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const tables = [
      "products",
      "categories",
      "purchases",
      "stock_adjustments",
      "expenses",
      "rentals",
      "customers",
      "sales",
      "users",
      "stock_movements",
      "user_profiles",
    ];

    const backup: Record<string, any> = {};

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select("*");

      if (!error) {
        backup[table] = data;
      } else {
        console.error(`Error backing up ${table}`, error);
      }
    }

    return Response.json({
      created_at: new Date().toISOString(),
      backup,
    });
  } catch (err) {
    return Response.json(
      { error: "Backup failed", details: err },
      { status: 500 }
    );
  }
}