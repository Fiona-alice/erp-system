import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("business_id");

    if (!businessId) {
      return Response.json(
        { error: "business_id is required" },
        { status: 400 }
      );
    }

    const tables = [
      "products",
      "categories",
      "purchases",
      "stock_adjustments",
      "expenses",
      "rentals",
      "customers",
      "sales",
      "stock_movements",
    ];

    const backup: Record<string, any> = {};

    for (const table of tables) {
      const { data, error } = await supabaseAdmin
        .from(table)
        .select("*")
        .eq("business_id", businessId);

      if (!error) {
        backup[table] = data;
      }
    }

    const fileName = `backup-${businessId}-${Date.now()}.json`;
    const fileData = JSON.stringify({
      business_id: businessId,
      created_at: new Date().toISOString(),
      backup,
    });

    // 🔥 Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("backups")
      .upload(fileName, fileData, {
        contentType: "application/json",
      });

    if (uploadError) {
      return Response.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    return Response.json({
      message: "Backup created successfully",
      file: fileName,
    });
  } catch (err) {
    return Response.json(
      { error: "Backup failed", details: err },
      { status: 500 }
    );
  }
}