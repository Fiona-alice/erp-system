import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";

export async function logStockMovement(
  productId: number,
  movementType: string,
  quantity: number,
  referenceId?: string,
  notes?: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const businessId =
    await getBusinessId();

  await supabase
    .from("stock_movements")
    .insert([
      {
        business_id: businessId,
        product_id: productId,
        movement_type: movementType,
        quantity,
        reference_id: referenceId,
        notes,
        created_by: user.id,
      },
    ]);
}