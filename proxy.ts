import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";

export async function proxy(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase =
    createServerClient(
      process.env
        .NEXT_PUBLIC_SUPABASE_URL!,
      process.env
        .NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)
              ?.value;
          },

          set(
            name: string,
            value: string,
            options: CookieOptions
          ) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },

          remove(
            name: string,
            options: CookieOptions
          ) {
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in
  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Load profile
  const {
    data: profile,
    error,
  } = await supabase
    .from("user_profiles")
    .select(`
      role,
      active
    `)
    .eq("id", user.id)
    .single();

  // Missing profile
  if (error || !profile) {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Disabled account
  if (!profile.active) {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const pathname =
    request.nextUrl.pathname;

  // Admin only pages
  const adminRoutes = [
    "/dashboard/users",
    "/dashboard/settings",
    "/dashboard/reports/profit-loss",
  ];

  const isAdminRoute =
    adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

  // Staff blocked from admin pages
  if (
    isAdminRoute &&
    profile.role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard/staff",
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};