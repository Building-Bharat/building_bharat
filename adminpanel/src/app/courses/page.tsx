"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

type Course = {
  _id: string;
  title: string;
  description: string;
  courseThumbnail?: string;
  instructorName?: string;
  instructorPicture?: string;
  instructorDescription?: string;
  averageRating?: number;
  totalRatings?: number;
  category?: string;
  module?: string[]; // assuming module is an array of strings
  faq?: {
    questions: ReactNode; question: string; answer: string 
}[]; // assuming faq is array of Q&A
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/course/");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data?.courses)) {
          setCourses(data.courses);
        } else if (Array.isArray(data?.data)) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-[#005451] items-center h-64 text-lg font-semibold">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#005451] min-h-screen">
      <h1 className="text-[32px] flex justify-center font-bold text-black mb-6">
        Uploaded Courses
      </h1>
      {courses.length === 0 ? (
        <p className="text-gray-700  text-center">No courses uploaded yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              {/* Course Thumbnail */}
              {course.courseThumbnail ? (
                <img
                  src={course.courseThumbnail}
                  alt={course.title}
                  className="w-full h-70 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-black">
                  No Image
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col">
                {/* Title */}
                <h2 className="text-lg font-bold text-center text-black">
                  {course.title}
                </h2>

                {/* Instructor */}
                {course.instructorPicture && (
                  <div className="mt-3 flex items-center space-x-3">
                    <img
                      src={course.instructorPicture}
                      alt={course.instructorName}
                      className="w-20 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-black">{course.instructorName}</p>
                      {course.instructorDescription && (
                        <p className="text-xs text-gray-600">
                          {course.instructorDescription}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Ratings */}
                {(course.averageRating !== undefined ||
                  course.totalRatings !== undefined) && (
                  <p className="text-sm text-gray-700 mt-2">
                    ⭐ {course.averageRating ?? "N/A"} (
                    {course.totalRatings ?? 0} ratings)
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {course.description}
                </p>

                {/* Module */}
                {course.module && course.module.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Modules:
                    </h3>
                    <ul className="list-disc list-inside text-xs text-gray-600">
                        
                      {course.module.length}
                    </ul>
                  </div>
                )}

                {/* FAQ */}
                {course.faq && course.faq.length && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-black">
                      FAQ:
                    </h3>
                    <ul className="text-xs text-gray-600">
                      {course.faq.slice(0, 2).map((f, i) => (
                        <li key={i} className="mb-1">
                          <span className="font-medium text-black">Q:</span>{" "}
                          {f.questions} <br />
                          <span className="font-medium text-black">A:</span>{" "}
                          {f.answer}
                        </li>
                      ))}
                      {course.faq.length > 2 && <li>...more</li>}
                    </ul>
                  </div>
                )}

                {/* Category */}
                {course.category && (
                  <span className="mt-3 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                )}

                {/* Edit Button */}
                <div className="mt-4">
                  <Link
                    href={`/edit/${course._id}`}
                    className="block w-full text-center bg-[#F97C04] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d76a03] transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

