"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";
import { getBusinessType } from "@/lib/getBusinessType";
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
  X,
  Sparkles,
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
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [businessType, setBusinessType,] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          useEffect(() => {
          loadBusinessType();
        }, []);

      async function loadBusinessType() {
      const type =
        await getBusinessType();

      if (type) {
        setBusinessType(type);
      }
    }

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
 
  const navClass = (path: string) =>
  `flex items-center ${
    open ? "justify-start gap-2 px-3" : "justify-center"
  } py-2 rounded-lg text-sm transition ${
    pathname === path
      ? "bg-blue-400 text-white"
      : "hover:bg-gray-500"
  }`;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

        {mobileMenuOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              md:hidden
            "
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />
        )}  

      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen bg-gray-600 text-white z-50 transition-transform duration-300 overflow-y-auto
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          md:translate-x-0
          ${
            open
              ? "w-64"
              : "w-25"
          }
        `}
      >
       
        {/* HEADER */}
        <div className="px-3 flex items-center justify-between border-b border-gray-600">
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
        <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1 custom-scrollbar">
          {/* ADMIN ONLY */}
            {role === "admin" && (
          <>
        <Link
        href="/dashboard"
        className={navClass("/dashboard")}
       >
        <LayoutDashboard size={18} />
        {open && "Dashboard"}
      </Link>

      <Link
        href="/dashboard/products"
       className={navClass("/dashboard/products")}
      >
        <Package size={18} />
        {open && "Products"}
      </Link>

      {businessType === "salon" && (
        <>
          <Link
            href="/dashboard/services"
            className={navClass("/dashboard/services")}
          >
            <Sparkles size={18} />
            {open && "Services"}
          </Link>
          </>
          )}

      <Link
        href="/dashboard/categories"
        className={navClass("/dashboard/categories")}
      >
        <Layers size={18} />
        {open && "Categories"}
      </Link>

      <Link
        href="/dashboard/sales"
        className={navClass("/dashboard/sales")}
      >
        <ShoppingCart size={18} />
        {open && "Sales"}
      </Link>

      {businessType === "salon" && (
        <>
        <Link
            href="/dashboard/service-sales"
           className={navClass("/dashboard/service-sales")}
          >
            <ShoppingCart size={18} />
            {open && "Service Sales"}
          </Link>
        </>
      )}

      <Link
        href="/dashboard/purchases"
        className={navClass("/dashboard/purchases")}
      >
        <Truck size={18} />
        {open && "Purchases"}
      </Link>

      <Link
        href="/dashboard/rentals"
        className={navClass("/dashboard/rentals")}
      >
        <HandCoins size={18} />
        {open && "Rentals"}
      </Link>

      <Link
        href="/dashboard/customers"
        className={navClass("/dashboard/customers")}
      >
        <Users size={18} />
        {open && "Customers"}
      </Link>

      <Link
        href="/dashboard/expenses"
        className={navClass("/dashboard/expenses")}
      >
        <Receipt size={18} />
        {open && "Expenses"}
      </Link>

      <Link
        href="/dashboard/stock-adjustment"
        className={navClass("/dashboard/stock-adjustment")}
      >
        <PenSquareIcon size={18} />
        {open && "Stock Adjustment"}
      </Link>

      <Link
        href="/dashboard/reports"
        className={navClass("/dashboard/reports")}
      >
        <BarChart3 size={18} />
        {open && "Reports"}
      </Link>

      <Link
        href="/dashboard/users"
        className={navClass("/dashboard/users")}
      >
        <Users size={18} />
        {open && "Users"}
      </Link>
    </>
  )}

  {/* STAFF ONLY */}
  {role === "staff" && (
    <>
      <Link
        href="/dashboard/products"
       className={navClass("/dashboard/products")}
            >
        <Package size={18} />
        {open && "Products"}
      </Link>

      <Link
        href="/dashboard/sales"
        className={navClass("/dashboard/sales")}
      >
        <ShoppingCart size={18} />
        {open && "Sales"}
      </Link>

      <Link
        href="/dashboard/rentals"
       className={navClass("/dashboard/rentals")}
      >
        <HandCoins size={18} />
        {open && "Rentals"}
      </Link>

      <Link
        href="/dashboard/customers"
        className={navClass("/dashboard/customers")}
      >
        <Users size={18} />
        {open && "Customers"}
      </Link>
    </>
  )}
        </nav>
      </aside>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() =>
            setMobileMenuOpen(true)
          }
          className="
            p-2
            bg-white
            rounded-lg
            shadow
          "
        >
          <Menu size={22} />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto p-3 sm:p-4 md:p-6">{children}</main>
    </div>
  );
}