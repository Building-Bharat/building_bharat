"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UpdateModulePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // module id

  useEffect(() => {
    // fetch current module data
    const fetchModule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/v1/admin/module/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setName(data.name);
        }
      } catch (err) {
        console.error("Failed to load module", err);
      }
    };
    if (id) fetchModule();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/v1/course/module/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        alert("Module updated!");
        router.back();
      } else {
        const error = await res.json();
        alert("Error: " + error.message);
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
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-black">Update Module</h1>

        <div>
          <label className="block text-sm text-black font-medium">Module Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border text-black rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Module"}
        </button>
      </form>
    </div>
  );
}