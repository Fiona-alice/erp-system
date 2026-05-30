import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      username,
      password,
      full_name,
      role,
    } = body;

    if (!username || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Normalize email (IMPORTANT FIX)
    // You MUST always login with same pattern
    const email = `${username.trim().toLowerCase()}@local.app`;

    // 2. Check if user already exists in auth
    const { data: existingUsers } =
      await supabaseAdmin.auth.admin.listUsers();

    const userExists = existingUsers.users.find(
      (u) => u.email === email
    );

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 3. Create auth user
    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authUser.user) {
      return NextResponse.json(
        { error: authError?.message || "Auth creation failed" },
        { status: 400 }
      );
    }

    // 4. Create profile (linked by auth user ID)
    const { error: profileError } =
      await supabaseAdmin.from("user_profiles").insert([
        {
          id: authUser.user.id,
          username,
          full_name: full_name || "",
          role,
          active: true,
        },
      ]);

    if (profileError) {
      // rollback auth user if profile fails (VERY IMPORTANT)
      await supabaseAdmin.auth.admin.deleteUser(
        authUser.user.id
      );

      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: authUser.user.id,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}