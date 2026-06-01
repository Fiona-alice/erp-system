import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return Response.json(
      { error: "file required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin.storage
    .from("backups")
    .download(file);

  if (error || !data) {
    return Response.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }

  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}