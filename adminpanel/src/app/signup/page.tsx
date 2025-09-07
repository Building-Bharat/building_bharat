"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    adminKey: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      router.push("/login"); // ✅ Redirect to login
    } else {
      alert(data.message || "Signup failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-black text-center mb-6">Admin Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "password", "passwordConfirm", "adminKey"].map((field) => (
            <input
              key={field}
              type={field.includes("password") ? "password" : "text"}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              className="w-full px-3 py-2 border border-black text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={(form as any)[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-[#F97C04] text-white rounded-md hover:bg-[#e0922b] transition cursor-pointer"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
