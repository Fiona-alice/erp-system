"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type UserProfile = {
  id: string;
  username: string;
  full_name: string;
  role: string;
  avatar_url?: string;
  created_at: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<"profile" | "security" | "settings">(
    "profile"
  );

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasChanges =
  profile &&
  (fullName !== profile.full_name ||
    username !== profile.username);

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
      setFullName(data.full_name);
      setUsername(data.username);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function updateProfile() {
    if (!profile) return;

    setLoading(true);

    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: fullName,
        username,
      })
      .eq("id", profile.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile updated successfully");
    fetchProfile();
  }

  async function changePassword() {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setNewPassword("");
    alert("Password updated successfully");
  }

  if (!profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">

     <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      {/* HEADER */}
      <h1 className="text-2xl font-bold text-blue-900 mb-4">
        My Profile
      </h1>

      {/* TABS */}
      <div className="flex gap-3 border-b mb-6">
        <button
          onClick={() => setTab("profile")}
          className={`pb-2 ${
            tab === "profile" ? "border-b-2 border-blue-900" : ""
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("security")}
          className={`pb-2 ${
            tab === "security" ? "border-b-2 border-blue-900" : ""
          }`}
        >
          Security
        </button>

        <button
          onClick={() => setTab("settings")}
          className={`pb-2 ${
            tab === "settings" ? "border-b-2 border-blue-900" : ""
          }`}
        >
          Settings
        </button>
      </div>

      {/* PROFILE TAB */}
      {tab === "profile" && (
        <div className="space-y-4">
          {/* AVATAR */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                {profile.full_name
                  ?.trim()
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "A"}
              </div>

            <div>
              <p className="font-semibold">{profile.full_name}</p>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
          </div>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex gap-2">
  <button
    onClick={updateProfile}
    disabled={loading}
    className="flex-1 bg-blue-900 text-white py-2 rounded-lg"
  >
    {loading ? "Saving..." : "Update Profile"}
  </button>

  <button
    onClick={() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/"); // fallback (dashboard/home)
    }
  }}
  className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
>
    Cancel
  </button>
   </div>
        </div>
      )}

      {/* SECURITY TAB */}
      {tab === "security" && (
        <div className="space-y-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={changePassword}
            className="w-full bg-blue-900 text-white py-2 rounded-lg"
          >
            Change Password
          </button>

          <div className="text-sm text-gray-500 pt-4">
            <p>Role: {profile.role}</p>
            <p>
              Member since:{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {tab === "settings" && (
        <div className="space-y-4 text-sm text-gray-600">
          <p>⚙️ Settings coming soon</p>
          <p>You can add themes, notifications, etc.</p>
        </div>
      )}
    </div>
   </div> 
  );
}