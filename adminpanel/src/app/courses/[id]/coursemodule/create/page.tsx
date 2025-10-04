"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CreateModulePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const params = useParams(); 
  const id = params?.id as string; // ✅ this is your courseId

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, please login again.");
        return;
      }

      const res = await fetch(
        `http://localhost:5000/api/v1/course/admin/${id}/module`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + error.message);
      } else {
        alert("Module created successfully!");
        router.push(`/courses`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-black font-Montserrat">Create Module</h1>

        <div>
          <label className="block text-sm text-black font-Dmsans font-medium">Module Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border text-black font-DMsans rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Module"}
        </button>
      </form>
    </div>
  );
}
