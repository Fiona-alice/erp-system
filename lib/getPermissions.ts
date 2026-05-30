import { supabase } from "@/lib/supabase";

export async function getPermissions(
  role: string,
  page: string
) {
  const { data } = await supabase
    .from("permissions")
    .select("*")
    .eq("role", role)
    .eq("page", page)
    .single();

  return data;
}