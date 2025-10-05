import SuccessGuide from "@/components/successGuide";
import Footer from "@/components/CoontactUs";
import CourseView from "@/components/CourseView";


export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	return (
		<>
		<CourseView/>
	    <SuccessGuide/>
	    <Footer/>

       </>
	);
}
