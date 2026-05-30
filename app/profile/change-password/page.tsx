"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNewPassword("");
    alert("Password updated successfully");
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold text-blue-900 mb-4">
        Change Password
      </h1>

      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}