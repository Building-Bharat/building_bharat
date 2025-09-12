"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/admin/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Password changed successfully!");
      router.push("/login"); // ✅ Redirect after success
    } else {
      alert(data.message || "Failed to change password");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-black text-center mb-6">Change Password</h2>
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
            placeholder="OTP"
            className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.otp}
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

