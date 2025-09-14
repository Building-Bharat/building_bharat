"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();

        if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#F5F6FA] min-h-screen py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#005451]">
        Building Bharat Blogs
      </h1>

      <div className="max-w-7xl mx-auto">
        {/* Top Section - 2 Big Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-28 mb-10">
          {blogs.slice(0, 2).map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col w-full md:w-[560px] h-auto md:h-[430px] mx-auto"
            >
              {/* Thumbnail */}
              <img
                src={`http://localhost:5000/${blog.thumbnail}`}
                alt={blog.name}
                className="w-full h-48 md:h-[196px] rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 mt-4">
                <h2 className="text-center font-Montserrat font-bold text-lg md:text-[20px] leading-[28px] text-[#0A0A0A]">
                  {blog.name}
                </h2>

                <p className="text-[#0A0A0A] text-sm md:text-[16px] leading-[20px] text-center font-DMsans line-clamp-3">
                  {blog.description}
                </p>

                <Link href={`/blogs/${blog._id}`}>
                  <button className="mt-4 w-full border border-orange-400 text-orange-500 font-medium px-4 py-2 rounded-md hover:bg-orange-50 transition">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - 3 Medium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
          {blogs.slice(2, 5).map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col w-full sm:w-[362px] h-auto md:h-[430px] mx-auto"
            >
              <img
                src={`http://localhost:5000/${blog.thumbnail}`}
                alt={blog.name}
                className="w-full h-48 md:h-[196px] rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between flex-1 mt-4">
                <h2 className="text-lg text-center font-bold text-gray-800">
                  {blog.name}
                </h2>

                <p className="text-gray-600 text-center text-sm mt-2 line-clamp-3">
                  {blog.description}
                </p>

                <Link href={`/blogs/${blog._id}`}>
                  <button className="mt-4 w-full border border-orange-400 text-orange-500 font-medium px-4 py-2 rounded-md hover:bg-orange-50 transition">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


