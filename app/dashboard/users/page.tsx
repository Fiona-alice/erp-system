"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";
import { formatDate } from "@/lib/formatDate";
import { Search, X } from "lucide-react";

type UserProfile = {
  id: string;
  username: string;
  full_name: string;
  role: string;
  active: boolean;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(true);

  // CREATE
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newRole, setNewRole] = useState("staff");

  // EDIT
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("staff");

  // PASSWORD RESET
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<UserProfile | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState("");

  const [businessId, setBusinessId] = useState<string>("");

   // GET BUSINESS ID
   async function loadBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);
  }

  async function fetchUsers() {
    if (!businessId) return;

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });

    if (error) return console.error(error);
    setUsers((data as UserProfile[]) || []);
  }

  useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    if (businessId) {
      fetchUsers();
    }
  }, [businessId]);

  function openPasswordModal(user: UserProfile) {
    setPasswordUser(user);
    setNewPasswordValue("");
    setPasswordModalOpen(true);
  }

  function openNew() {
    setIsCreateMode(true);
    setSelectedUser(null);

    setNewUsername("");
    setNewPassword("");
    setNewFullName("");
    setNewRole("staff");

    setIsOpen(true);
  }

  function openEdit() {
    if (!selectedUser) return;

    setIsCreateMode(false);
    setUsername(selectedUser.username);
    setFullName(selectedUser.full_name);
    setRole(selectedUser.role);

    setIsOpen(true);
  }

  async function createUser() {
   const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Not authenticated");
    return;
  }

  const res = await fetch(
    "/api/users/create",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        "x-user-id": user.id,
      },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        full_name: newFullName,
        role: newRole,
      }),
    }
  );

  const result =
    await res.json();

  if (!res.ok) {
    alert(result.error);
    return;
  }

    setIsOpen(false);
    fetchUsers();
  }

  async function updateUser() {
    if (!selectedUser) return;

    const { error } = await supabase
      .from("user_profiles")
      .update({
        username,
        full_name: fullName,
        role,
      })
      .eq("id", selectedUser.id)
      .eq("business_id", businessId);

    if (error) return console.error(error);

    setIsOpen(false);
    setSelectedUser(null);
    fetchUsers();
  }

  async function toggleUser(user: UserProfile) {
    const { error } = await supabase
      .from("user_profiles")
      .update({ active: !user.active })
      .eq("id", user.id)
      .eq("business_id", businessId);

    if (error) return console.error(error);

    fetchUsers();
  }

  // RESET PASSWORD
  async function handleResetPassword() {
   if (!passwordUser) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Not authenticated");
    return;
  }

  const res = await fetch(
    "/api/users/reset-password",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        "x-user-id": user.id,
      },
      body: JSON.stringify({
        userId: passwordUser.id,
        password:
          newPasswordValue,
      }),
    }
  );

  const result =
    await res.json();

  if (!res.ok) {
    alert(result.error);
    return;
  }

    setPasswordModalOpen(false);
    setPasswordUser(null);
    setNewPasswordValue("");
  }

  const filteredUsers = users.filter((u) =>
    [u.username, u.full_name, u.role]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
          User Management
        </h1>
        <p className="text-sm text-gray-500 mt-1"> Manage system users </p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-2 rounded-lg shadow mb-3 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={openNew} className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-md hover:bg-gray-100 text-sm">
            New
          </button>

          <button
            disabled={!selectedUser}
            onClick={openEdit}
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Edit
          </button>

          <button
            disabled={!selectedUser}
            onClick={() => selectedUser && toggleUser(selectedUser)}
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            {selectedUser?.active ? "Disable" : "Enable"}
          </button>

          <button
            disabled={!selectedUser}
            onClick={() =>
              selectedUser && openPasswordModal(selectedUser)
            }
            className="border bg-gray-50 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-gray-100 text-sm disabled:opacity-50"
          >
            Reset Password
          </button>
        </div>

        <div className="relative w-full md:w-50">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border
              rounded-md
              pl-9
              pr-10
              py-1.5
              text-sm
              text-gray-900
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-gray-700
              "
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-200">
        <div className="overflow-x-auto">
         <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-[800px] w-full text-sm border-collapse"></table><table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-3 p-2 border border-gray-200">Username</th>
              <th className="text-left px-3 p-2 border border-gray-200">Full Name</th>
              <th className="text-left px-3 p-2 border border-gray-200">Role</th>
              <th className="text-left px-3 p-2 border border-gray-200">Status</th>
              <th className="text-left px-3 p-2 border border-gray-200">Created</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`cursor-pointer border-t hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? "bg-blue-100" : ""
                }`}
              >
                <td className="px-3 p-2 text-gray-700 border border-gray-200">{user.username}</td>
                <td className="px-3 p-2 text-gray-700 border border-gray-200">{user.full_name}</td>
                <td className="px-3 p-2 text-gray-700 border border-gray-200">{user.role}</td>
                <td className="px-3 p-2 text-gray-700 border border-gray-200">
                  {user.active ? "Active" : "Inactive"}
                </td>
                <td className="px-3 p-2 text-gray-700 border border-gray-200">
                  {formatDate(user.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}
        className="relative z-50" >
        
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold mb-4">
              {isCreateMode ? "New User" : "Edit User"}
            </Dialog.Title>

            <div className="space-y-4">
              <input
                placeholder="Username"
                value={isCreateMode ? newUsername : username}
                onChange={(e) =>
                  isCreateMode
                    ? setNewUsername(e.target.value)
                    : setUsername(e.target.value)
                }
               className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

              {isCreateMode && (
                <input
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
                />
              )}

              <input
                placeholder="Full Name"
                value={isCreateMode ? newFullName : fullName}
                onChange={(e) =>
                  isCreateMode
                    ? setNewFullName(e.target.value)
                    : setFullName(e.target.value)
                }
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              />

              <select
                value={isCreateMode ? newRole : role}
                onChange={(e) =>
                  isCreateMode
                    ? setNewRole(e.target.value)
                    : setRole(e.target.value)
                }
                className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>

              <button
                onClick={isCreateMode ? createUser : updateUser}
                className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                {isCreateMode ? "Create User" : "Update User"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* PASSWORD RESET MODAL */}
      <Dialog
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)} 
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold mb-4">
              Reset Password
            </Dialog.Title>

            <input
              type="password"
              placeholder="New Password"
              value={newPasswordValue}
              onChange={(e) => setNewPasswordValue(e.target.value)}
              className=" w-full border rounded-lg px-3 py-3 text-base text-gray-900"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-gray-100 text-blue-900 border px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              Update Password
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}