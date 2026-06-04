import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";

export async function getBusinessType() {
  const businessId =
    await getBusinessId();

  if (!businessId) return null;

  const { data, error } =
    await supabase
      .from("businesses")
      .select("business_type")
      .eq("id", businessId)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data.business_type;
}