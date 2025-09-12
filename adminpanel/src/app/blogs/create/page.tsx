"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    createdBy: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  // ✅ Check login on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // redirect if not logged in
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not logged in!");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("createdBy", form.createdBy);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const res = await fetch("http://localhost:5000/api/blogs/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ no Content-Type
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create blog");
      alert("✅ Blog created successfully!");
      window.location.href = "/blogs"; // redirect after creation
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-gray-800">Create Blog</h1>

        {/* Blog Name */}
        <input
          type="text"
          placeholder="Blog Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        {/* Thumbnail Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        {/* Created By */}
        <input
          type="text"
          placeholder="Created By"
          value={form.createdBy}
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
}



