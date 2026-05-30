import { supabase } from "@/lib/supabase";

export async function getBusinessId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const {
    data: profile,
    error,
  } = await supabase
    .from("user_profiles")
    .select("business_id")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error(
      "Business not found"
    );
  }

  return profile.business_id;
}