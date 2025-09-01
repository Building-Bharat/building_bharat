import Header from "@/components/Header";
import CourseDetails from "@/components/CourseDetails";

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<div className="min-h-screen overflow-x-hidden" style={{ background: "#E5E7EA" }}>
			<Header />
			<CourseDetails title={slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} />
		</div>
	);
}
