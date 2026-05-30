"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";
import {
  Package,
  ShoppingCart,
  Users,
  Truck,
  Layers,
  BarChart3,
  Receipt,
  LayoutDashboard,
  HandCoins,
  PenSquareIcon,
  Menu,
  LogOut,
  User,
  Settings,
} from "lucide-react";

type UserProfile = {
  full_name: string;
  role: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("user_profiles")
        .select(`full_name, role`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error(error);
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      setUserProfile(data as UserProfile);
      setCheckingAuth(false);

      const businessId =
  await getBusinessId();

const { data: business } =
  await supabase
    .from("businesses")
    .select("logo_url")
    .eq("id", businessId)
    .single();

if (business?.logo_url) {
  setLogoUrl(
    business.logo_url
  );
}
    }

    loadUser();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const role = userProfile?.role || "";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative z-50 h-screen bg-gray-500 text-white p-5 transition-all duration-300
          ${open ? "w-64" : "w-0 md:w-20 overflow-hidden"}
          `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 relative" ref={menuRef}>

           {open && logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-20 w-auto object-contain bg-transparent"
            />
            )}

            {open && !logoUrl && (
              <h1 className="text-2xl font-bold text-gray-800">
                BMSys
              </h1>
            )}

            {/* PROFILE BUTTON */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200 transition"
            >
              {userProfile?.full_name?.charAt(0).toUpperCase()}
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b text-sm text-gray-500">
                  {userProfile?.full_name}
                  <div className="text-xs capitalize">
                    {userProfile?.role}
                  </div>
                </div>

                <button 
                onClick={() => router.push("/profile")}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                  <User size={16} />
                  Profile
                </button>

                <button 
                onClick={() => router.push("/settings")}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-left text-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-gray-600"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-1 flex-1">
          {/* ADMIN ONLY */}
            {role === "admin" && (
          <>
            <Link
        href="/dashboard"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <LayoutDashboard size={20} />
        {open && "Dashboard"}
      </Link>

      <Link
        href="/dashboard/products"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Package size={20} />
        {open && "Products"}
      </Link>

      <Link
        href="/dashboard/categories"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Layers size={20} />
        {open && "Categories"}
      </Link>

      <Link
        href="/dashboard/sales"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <ShoppingCart size={20} />
        {open && "Sales"}
      </Link>

      <Link
        href="/dashboard/purchases"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Truck size={20} />
        {open && "Purchases"}
      </Link>

      <Link
        href="/dashboard/rentals"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <HandCoins size={20} />
        {open && "Rentals"}
      </Link>

      <Link
        href="/dashboard/customers"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Users size={20} />
        {open && "Customers"}
      </Link>

      <Link
        href="/dashboard/expenses"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Receipt size={20} />
        {open && "Expenses"}
      </Link>

      <Link
        href="/dashboard/stock-adjustment"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <PenSquareIcon size={20} />
        {open && "Stock Adjustment"}
      </Link>

      <Link
        href="/dashboard/reports"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <BarChart3 size={20} />
        {open && "Reports"}
      </Link>

      <Link
        href="/dashboard/users"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Users size={20} />
        {open && "Users"}
      </Link>
    </>
  )}

  {/* STAFF ONLY */}
  {role === "staff" && (
    <>
      <Link
        href="/dashboard/products"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Package size={20} />
        {open && "Products"}
      </Link>

      <Link
        href="/dashboard/sales"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <ShoppingCart size={20} />
        {open && "Sales"}
      </Link>

      <Link
        href="/dashboard/rentals"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <HandCoins size={20} />
        {open && "Rentals"}
      </Link>

      <Link
        href="/dashboard/customers"
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-600"
      >
        <Users size={20} />
        {open && "Customers"}
      </Link>
    </>
  )}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-3 md:p-6">{children}</main>
    </div>
  );
}