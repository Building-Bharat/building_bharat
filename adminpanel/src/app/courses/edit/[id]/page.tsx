
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

type CourseFormInputs = {
  name: string;
  description: string;
  courseContain: string;
  instructorName: string;
  instructorDescription: string;
  courseThumbnail: FileList;
  instructorPicture: FileList;
};

export default function EditCoursePage() {
  const { id } = useParams(); // Get course id from URL
  const { register, handleSubmit, reset } = useForm<CourseFormInputs>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);

    // Fetch course details by id
    if (id) {
      fetch(`http://localhost:5000/api/v1/course/${id}`)
        .then((res) => res.json())
        
        .then((data) => {
          reset({
            name: data.name,
            description: data.description,
            courseContain: data.courseContain,
            instructorName: data.instructorName,
            instructorDescription: data.instructorDescription,
            instructorPicture: data.instructorPicture,
            courseThumbnail: data.courseThumbnail
          });
        })
        .catch(() => setMessage("❌ Failed to load course details"));
    }
  }, [id, reset]);

 const onSubmit = async (data: CourseFormInputs) => {
  try {
    setLoading(true);
    setMessage(null);

    if (!token) throw new Error("Authorization token not found. Please log in.");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("courseContain", data.courseContain);
    formData.append("instructorName", data.instructorName);
    formData.append("instructorDescription", data.instructorDescription);

   if (data.courseThumbnail) {
  formData.append("courseThumbnail", data.courseThumbnail[0]); 
}
    if (data.instructorPicture) {
  formData.append("instructorPicture", data.instructorPicture[0]);
}

    const res = await fetch(`http://localhost:5000/api/v1/course/admin/${id}`, {
      method: "PATCH", // or PATCH depending on your backend
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to update course");
    }

    setMessage("✅ Course updated successfully!");
  } catch (err: any) {
    setMessage("❌ " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-6 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Course Name"
          {...register("name", { required: true })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Course Description"
          {...register("description", { required: true })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Course Content"
          {...register("courseContain", { required: true })}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Instructor Name"
          {...register("instructorName", { required: true })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Instructor Description"
          {...register("instructorDescription", { required: true })}
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block mb-1">Update Course Thumbnail</label>
          <input
            type="file"
             accept="image/*"
            {...register("courseThumbnail")}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Update Instructor Picture</label>
          <input
            type="file"
            accept="image/*"
            {...register("instructorPicture")}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
}

