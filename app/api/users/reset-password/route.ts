import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const currentUserId =
      req.headers.get("x-user-id");

    if (!currentUserId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      data: currentUser,
      error: currentUserError,
    } = await supabaseAdmin
      .from("user_profiles")
      .select("role, business_id")
      .eq("id", currentUserId)
      .single();

    if (
      currentUserError ||
      !currentUser
    ) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ONLY ADMINS CAN RESET PASSWORDS
    if (
      currentUser.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const { userId, password } =
      await req.json();

    if (!userId || !password) {
      return NextResponse.json(
        {
          error:
            "User ID and password are required",
        },
        { status: 400 }
      );
    }

    // VERIFY TARGET USER BELONGS
    // TO SAME BUSINESS
    const {
      data: targetUser,
      error: targetError,
    } = await supabaseAdmin
      .from("user_profiles")
      .select("business_id")
      .eq("id", userId)
      .single();

    if (
      targetError ||
      !targetUser
    ) {
      return NextResponse.json(
        {
          error:
            "Target user not found",
        },
        { status: 404 }
      );
    }

    if (
      targetUser.business_id !==
      currentUser.business_id
    ) {
      return NextResponse.json(
        {
          error:
            "Cannot modify users from another business",
        },
        { status: 403 }
      );
    }

    const {
      data,
      error,
    } =
      await supabaseAdmin.auth.admin.updateUserById(
        userId,
        {
          password,
        }
      );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          err.message ||
          "Server error",
      },
      { status: 500 }
    );
  }
}