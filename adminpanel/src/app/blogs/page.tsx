"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  name: string;         // ✅ backend uses "name"
  description: string;
  thumbnail?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchBlogs() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/blogs/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data.blogs || data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchBlogs();
    }
  }, [router]);

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/blogs/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
          >
            Create Blog
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow p-4">
              <img
                src={
                  blog.thumbnail
                    ? blog.thumbnail.startsWith("http")
                      ? blog.thumbnail
                      : `http://localhost:5000/${blog.thumbnail}`
                    : "/placeholder.png"
                }
                alt={blog.name}
                className="w-full h-40 object-cover rounded-md mb-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
              />

              {/* ✅ use blog.name instead of title */}
              <h2 className="text-lg font-bold">{blog.name}</h2>
              <p className="text-gray-600 mt-1 line-clamp-3">{blog.description}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => router.push(`/blogs/edit/${blog._id}`)}
                  className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


