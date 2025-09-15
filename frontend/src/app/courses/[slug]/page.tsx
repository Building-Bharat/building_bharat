import Header from "@/components/Header";
import CourseDetail from "@/components/CourseDetail";
import MeetYourCourseMentor from "@/components/MeetYourCourseMentor";
import SuccessGuide from "@/components/successGuide";
import Footer from "@/components/CoontactUs";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<div className="min-h-screen overflow-x-hidden" style={{ background: "#E5E7EA" }}>
			<Header />
			<CourseDetail title={slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())} />
			<MeetYourCourseMentor />
			<FrequentlyAskedQuestions/>
			<SuccessGuide/>
			<Footer/>
		</div>
	);
}
