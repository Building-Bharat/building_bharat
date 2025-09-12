"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", adminKey: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/admin/forgetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Password reset OTP sent!");
      router.push("/changePassword"); // ✅ Redirect to Change Password
    } else {
      alert(data.message || "Request failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-black text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Admin Key"
            className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.adminKey}
            onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#F97C04] text-white rounded-md hover:bg-[#e0922b] transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

