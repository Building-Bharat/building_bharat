import Header from "@/components/Header";
import CourseDetail from "@/components/CourseDetail";

export default async function CourseDetailsPage({ params }: { params: { slug: string } }) {
	const { slug } =  await params;
	return (
		<div className="min-h-screen overflow-x-hidden" style={{ background: "#E5E7EA" }}>
			<Header />
			<CourseDetail title={slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} />
		</div>
	);
}
