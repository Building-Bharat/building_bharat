import Header from "@/components/Header";
import CourseDetails from "@/components/CourseDetails";

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
	const { slug } = params;
	return (
		<div className="min-h-screen overflow-x-hidden" style={{ background: "#E5E7EA" }}>
			<Header />
			<CourseDetails title={slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} />
		</div>
	);
}
