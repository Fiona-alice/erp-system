import { supabase } from "@/lib/supabase";

export async function logAction(
  action: string,
  tableName: string,
  recordId: string,
  details?: any
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile } =
      await supabase
        .from("user_profiles")
        .select(
          "username,business_id"
        )
        .eq("id", user.id)
        .single();

    await supabase
      .from("audit_logs")
      .insert([
        {
          business_id:
            profile?.business_id,
          user_id: user.id,
          username:
            profile?.username,
          action,
          table_name:
            tableName,
          record_id: recordId,
          details,
        },
      ]);
  } catch (error) {
    console.error(
      "Audit log failed",
      error
    );
  }
}