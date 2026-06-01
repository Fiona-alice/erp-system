import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET() {
  const { data: businesses } = await supabaseAdmin
    .from("businesses")
    .select("id");

  if (!businesses) {
    return Response.json({ error: "No businesses found" });
  }

  for (const business of businesses) {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/backup?business_id=${business.id}`
    );
  }

  return Response.json({ message: "Cron backups completed" });
}