import Header from "@/components/Header";
import BlogDetails from "@/components/blogdetails";
import Footer from "@/components/CoontactUs";
import SuccessGuide from "@/components/successGuide";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ fetch blog from backend
  const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
    cache: "no-store",
  });
  const blog = await res.json();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#ffffff" }}>
      <Header />
      <BlogDetails blog={blog} /> 
    </div>
  );
}


