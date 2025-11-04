"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // 🚀 redirect if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  async function handleLogout() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Logout failed");
      }

      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Logout failed");
    }
  }

  // ⏳ Prevent UI flash before we know login state
  if (isLoggedIn === null) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#F97C04] text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white text-[#F97C04] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Welcome, Admin 👋
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium text-gray-700">Analytics</h3>
            <p className="text-sm text-gray-500 mt-2">
              Track performance & insights
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium text-gray-700">Blogs</h3>
            <p className="text-sm text-gray-500 mt-2">Manage blog posts</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-medium text-gray-700">Users</h3>
            <p className="text-sm text-gray-500 mt-2">Manage registered users</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          >
            Uploaded Courses
          </button>
          <button
            onClick={() => router.push("/internship")}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition cursor-pointer"
          >
            Internship
          </button>
          <button
            onClick={() => router.push("/blogs")}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition cursor-pointer"
          >
            Blogs
          </button>
          <button
            onClick={() => router.push("/courses/create")}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition cursor-pointer"
          >
            Upload New Course
          </button>
          <button
            onClick={() => router.push("/coupons")}
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition cursor-pointer"
          >
            Coupon Management
          </button>
        </div>
      </main>
    </div>
  );
}


