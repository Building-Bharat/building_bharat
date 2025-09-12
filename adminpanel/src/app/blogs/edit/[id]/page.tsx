"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface BlogForm {
  name: string;
  description: string;
  createdBy: string;
}

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [form, setForm] = useState<BlogForm>({
    name: "",
    description: "",
    createdBy: "",
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch blog");

        setForm({
          name: data.blog?.name || "",
          description: data.blog?.description || "",
          createdBy: data.blog?.createdBy || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

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

      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update blog");
      alert("✅ Blog updated successfully!");
      router.push("/blogs"); // ✅ redirect here
    } catch (err) {
      console.error(err);
      alert("Failed to update blog");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-xl text-black text-center font-bold">Edit Blog</h1>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Admin name"
          value={form.createdBy}
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Update
        </button>
      </form>
    </div>
  );
}
