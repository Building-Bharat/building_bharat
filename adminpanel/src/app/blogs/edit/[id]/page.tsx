"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface SubHeading {
  title: string;
  description: string;
  image?: string; // backend image path
  _id?: string;   // optional (for updates)
}

interface BlogForm {
  name: string;
  description: string;
  createdBy: string;
  subHeadings: SubHeading[];
}

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [form, setForm] = useState<BlogForm>({
    name: "",
    description: "",
    createdBy: "",
    subHeadings: [],
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [subHeadingImages, setSubHeadingImages] = useState<(File | null)[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blog by ID
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
          createdBy: data.blog?.createdBy?.name || "",
          subHeadings: data.blog?.subHeadings || [],
        });

        // Initialize subheading images with null
        setSubHeadingImages((data.blog?.subHeadings || []).map(() => null));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  // ✅ Update subheading text
  const updateSubHeading = (
    index: number,
    key: keyof SubHeading,
    value: string
  ) => {
    const updated = [...form.subHeadings];
    updated[index][key] = value;
    setForm({ ...form, subHeadings: updated });
  };

  // ✅ Handle subheading image change
  const handleSubHeadingImage = (index: number, file: File | null) => {
    const updated = [...subHeadingImages];
    updated[index] = file;
    setSubHeadingImages(updated);
  };

  // ✅ Add new subheading
  const addSubHeading = () => {
    setForm({
      ...form,
      subHeadings: [...form.subHeadings, { title: "", description: "" }],
    });
    setSubHeadingImages([...subHeadingImages, null]);
  };

  // ✅ Remove subheading
  const removeSubHeading = (index: number) => {
    const updatedSubs = [...form.subHeadings];
    updatedSubs.splice(index, 1);
    setForm({ ...form, subHeadings: updatedSubs });

    const updatedImages = [...subHeadingImages];
    updatedImages.splice(index, 1);
    setSubHeadingImages(updatedImages);
  };

  // ✅ Submit update
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

      // Attach subheadings (without images here)
      formData.append("subHeadings", JSON.stringify(form.subHeadings));

      // Attach subheading images with index
      subHeadingImages.forEach((file, i) => {
        if (file) {
          formData.append(`subHeadingImages_${i}`, file);
        }
      });

      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update blog");
      alert("✅ Blog updated successfully!");
      router.push("/blogs");
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
        className="bg-white p-6 rounded-lg shadow w-full max-w-2xl space-y-4"
      >
        <h1 className="text-xl text-black text-center font-bold">
          Edit Blog
        </h1>

        {/* Blog name */}
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        {/* Description */}
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        {/* Created By */}
        <input
          type="text"
          value={form.createdBy}
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
          required
        />

        {/* Thumbnail */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-black text-black rounded-md"
        />

        {/* SubHeadings */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-2">
            Sub Headings
          </h2>
          {form.subHeadings.map((sub, index) => (
            <div
              key={index}
              className="mb-4 p-3 border rounded-md bg-gray-50 space-y-2"
            >
              <input
                type="text"
                placeholder="Sub Heading Title"
                value={sub.title}
                onChange={(e) =>
                  updateSubHeading(index, "title", e.target.value)
                }
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

              <button
                type="button"
                onClick={() => removeSubHeading(index)}
                className="text-red-500 text-sm mt-2"
              >
                Remove Sub Heading
              </button>
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
          Update Blog
        </button>
      </form>
    </div>
  );
}


