"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SubHeading {
  title: string;
  description: string;
}

export default function CreateBlog() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [subHeadings, setSubHeadings] = useState<SubHeading[]>([
    { title: "", description: "" },
  ]);

  const router = useRouter();

  // ✅ Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Add subheading
  const addSubHeading = () => {
    setSubHeadings([...subHeadings, { title: "", description: "" }]);
  };

  // Update subheading text
  const updateSubHeading = (
    index: number,
    key: keyof SubHeading,
    value: string
  ) => {
    const updated = [...subHeadings];
    updated[index][key] = value;
    setSubHeadings(updated);
  };

  // Submit form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not logged in!");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // ✅ Add subheadings (no images)
      formData.append("subHeadings", JSON.stringify(subHeadings));

      const res = await fetch("http://localhost:5000/api/blogs/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create blog");
      alert("✅ Blog created successfully!");
      router.push("/blogs");
    } catch (err) {
      console.error("❌ Error creating blog:", err);
      alert("Failed to create blog");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg space-y-4"
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

        {/* Thumbnail */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Main Blog Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-md text-black"
          required
        />

        {/* SubHeadings */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-2">Sub Headings</h2>
          {subHeadings.map((sub, index) => (
            <div
              key={index}
              className="mb-4 p-3 border rounded-md bg-gray-50 space-y-2"
            >
              <input
                type="text"
                placeholder="Sub Heading Title"
                value={sub.title}
                onChange={(e) => updateSubHeading(index, "title", e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-black"
                required
              />
              <textarea
                placeholder="Sub Heading Description"
                value={sub.description}
                onChange={(e) =>
                  updateSubHeading(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md text-black"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSubHeading}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
          >
            + Add Sub Heading
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}







