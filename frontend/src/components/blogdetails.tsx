"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface SubHeading {
  title: string;
  description: string;
}

interface Blog {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  subHeadings: SubHeading[];
}

export default function BlogDetailPage() {
  const { slug } = useParams(); // ✅ dynamic slug from URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        setBlog(data); // ⚡ Adjust if your API returns { blog: {...} }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // ✅ Function to scroll smoothly
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return <p className="p-10 text-gray-600">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="p-10 text-red-500">Blog not found</p>;
  }

  return (
    <div className="flex bg-gray-50 w-full min-h-screen relative">
      {/* Sidebar */}
      <div
        className="hidden sm:block fixed top-10 left-0 w-[264px] h-full bg-transparent shadow-md overflow-y-hidden"
        style={{ padding: "16px 32px" }}
      >
        <div className="space-y-8 pt-20 pb-8">
          <h2 className="font-bold text-lg text-black cursor-pointer">
            Heading
          </h2>
          {blog.subHeadings?.length > 0 ? (
            blog.subHeadings.map((sh, index) => (
              <div
                key={index}
                className="border-l-2 border-[#F97C04] pl-2 space-y-1"
              >
                <p
                  className="font-semibold text-gray-800 cursor-pointer"
                  onClick={() => handleScroll(`subheading-${index}`)}
                >
                  {sh.title}
                </p>
                <p
                  className="text-sm text-gray-600 cursor-pointer hover:underline"
                  onClick={() => handleScroll(`subheading-${index}`)}
                >
                  Description {index + 1}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No subheadings available</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-[264px] overflow-y-auto p-4 md:p-8 space-y-12">
        {/* Blog Title + Description */}
        <div className="w-full md:w-[998px] space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            {blog.name}
          </h1>
          <p className="text-gray-700">{blog.description}</p>
        </div>

        {/* Thumbnail */}
        <img
          src={`http://localhost:5000/${blog.thumbnail}`}
          alt="Thumbnail"
          className="w-full md:w-[998px] h-auto md:h-[500px] rounded-lg object-cover"
        />

        {/* SubHeadings */}
        {blog.subHeadings?.length > 0 ? (
          blog.subHeadings.map((sh, index) => (
            <div
              key={index}
              id={`subheading-${index}`} // ✅ target for scrolling
              className="w-full md:w-[998px] h-auto space-y-4 scroll-mt-20"
              style={{ gap: "8px" }}
            >
              <h2 className="text-lg md:text-xl font-semibold text-black">
                {sh.title}
              </h2>
              <p className="text-gray-700">{sh.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No subheadings available</p>
        )}
      </div>
    </div>
  );
}




