"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Module = {
  _id: string;
  name: string;
};

type Course = {
  _id: string;
  name: string;
  module: Module[];
};

export default function ModulesListPage() {
  const params = useParams();
  const id = params?.id as string; // courseId
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/course/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading modules...</p>;

  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modules of {course.name}</h1>

      {course.module?.length > 0 ? (
        <ul className="space-y-3">
          {course.module.map((mod) => (
            <li
              key={mod._id}
              className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
            >
              <span>{mod.name}</span>
              <Link
                href={`/admin/module/${mod._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No modules found for this course.</p>
      )}
    </div>
  );
}
