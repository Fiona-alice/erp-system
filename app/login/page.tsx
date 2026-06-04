"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      setLoading(true);

      const email = `${username.trim().toLowerCase()}@local.app`;

      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      const userId = authData.user?.id;

      if (!userId) return;

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role, active")
        .eq("id", userId)
        .single();

      if (!profile?.active) {
        await supabase.auth.signOut();
        alert("Account disabled");
        return;
      }

      router.replace(
        profile.role === "admin"
          ? "/dashboard"
          : "/dashboard/products"
      );
    } catch (err) {
      alert("Login error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 via-gray-100 to-blue-100 p-4">

      {/* CENTER CARD */}
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-gray-200 p-10 space-y-5">

        {/* LOGO AREA */}
        <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">
        <span className="text-black font-bold">BMS</span>
        <span className="text-green-500 font-semibold">ystem</span>
        </h1>

        <p className="text-sm text-gray-900 mt-1">
         Please log in to continue
        </p>
        </div>

        {/* USERNAME */}
        <div className="justify-center px-[15%]">
        <div className="mb-2">
          <label className="text-sm text-gray-900">
            User Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

            onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
            }}
            className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm text-gray-900">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

             onKeyDown={(e) => {
              if (e.key === "Enter") {
                login();
              }
              }}
            className="w-full mt-1 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
            
          />
        </div>

      
        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          disabled={loading || !username || !password}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log On"}
        </button>
</div>
        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © Business Management System
        </p>
      </div>
    </div>
  );
}