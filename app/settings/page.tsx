"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getBusinessId } from "@/lib/getBusinessId";

export default function SettingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [receiptFooter, setReceiptFooter] = useState("");
  const [currency, setCurrency] = useState("UGX");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");

  async function fetchBusiness() {
    const id = await getBusinessId();
    setBusinessId(id);

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setName(data.name || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setAddress(data.address || "");
    setReceiptFooter(data.receipt_footer || "");
    setCurrency(data.currency || "UGX");
    setLogoUrl(data.logo_url || "");
    setLoading(false);
  }

  useEffect(() => {
    fetchBusiness();
  }, []);

  async function uploadLogo(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("logos")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert("Logo upload failed");
    return null;
  }

  const { data } = supabase.storage
    .from("logos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  setLogoFile(file);

  const url = await uploadLogo(file);
  if (url) setLogoUrl(url);
}

  async function saveSettings() {
    const { error } = await supabase
      .from("businesses")
      .update({
        name,
        phone,
        email,
        address,
        receipt_footer: receiptFooter,
        currency,
        logo_url: logoUrl,
      })
      .eq("id", businessId);

    if (error) {
      console.error(error);
      alert("Failed to save settings");
      return;
    }

    alert("Settings saved");
  }

  function cancel() {
    router.push("/dashboard");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-3xl mx-auto space-y-4">

      {/* HEADER */}
      
        <h1 className="text-2xl font-bold text-blue-900">
          Business Settings
        </h1>
       
    
    <div className="flex items-center gap-2 mb-5">

  {/* PREVIEW */}
  <div className="w-16 h-16 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center">
    {logoUrl ? (
      <img
        src={logoUrl}
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-xs text-gray-400">
        No Logo
      </span>
    )}
  </div>

  {/* UPLOAD */}
  <div>
    <label className="text-sm text-gray-600">
      Business Logo
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={handleLogoChange}
      className="block text-sm mt-1"
    />
  </div>

</div>

      {/* CARD */}
      <div className="bg-white border rounded-xl shadow-sm p-4 space-y-2">

        {/* BUSINESS INFO */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Business Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            >
              <option value="UGX">UGX</option>
              <option value="KES">KES</option>
              <option value="TZS">TZS</option>
              <option value="USD">USD</option>
            </select>

          </div>

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-4 border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

        {/* RECEIPT */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Receipt Settings
          </h2>

          <textarea
            placeholder="Receipt Footer Message"
            value={receiptFooter}
            onChange={(e) => setReceiptFooter(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            onClick={cancel}
            className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={saveSettings}
            className="px-5 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
          >
            Save Settings
          </button>

        </div>
       </div>
      </div>
    </div>
  );
}