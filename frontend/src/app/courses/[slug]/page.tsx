import SuccessGuide from "@/components/successGuide";
import Footer from "@/components/CoontactUs";
import CourseView from "@/components/CourseView";


export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
	return (
		<>
        <CourseView slug={slug} />
	    <SuccessGuide/>
	    <Footer/>

       </>
	);
}
