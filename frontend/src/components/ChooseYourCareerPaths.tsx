'use client'
import React from 'react'
import CTAButton from './CTAButton'
import Link from 'next/link'

interface CourseItem {
  _id?: string;
  id?: string;
  slug?: string;
  title?: string; // frontend fallback
  name?: string;  // backend field
  description?: string;
}

const ChooseYourCareerPaths = ({ courses = [], loading = false }: { courses?: CourseItem[]; loading?: boolean }) => {

  return (

         <section className="mt-16 py-4 mx-0 lg:mx-16">
                  <div className="w-full space-y-0 sm:space-y-8 mx-auto px-8 lg:px-0">
                        <h1 className="text-lg  pb-8 sm:pb-0 w-full text-[#005451] lg:text-[32px] leading-[38px] text-center font-extrabold">
                              Choose Your Career Path
                        </h1>
                        <p className='text-base pb-4 sm:pb-0 text-[#0A0A0A] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.</p>

                        {/* Grid container */}
                        <div className="min-h-[440px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ">
                              {(loading ? Array.from({ length: 6 }) : courses.slice(0, 6)).map((c: any, idx: number) => (
                                <CareerPathCard key={c?._id || c?.id || idx} course={c} />
                              ))}
                        </div>
                  </div>
        </section>

      )
}



const CareerPathCard = ({ course }: { course?: CourseItem }) =>{
  const title = course?.title || course?.name || 'Course';
  const slug = course?.slug || String(title).toLowerCase().replace(/\s+/g,'-');
  
    return (

          <div className="w-full min-h-[356px] lg:min-h-[408px] p-4 border border-slate-400 rounded-lg flex flex-col">

                        {/* Image */}
                        <div className="w-full h-[216px] bg-slate-600 rounded-lg"></div>

                        {/* Content */}
                        <div className="flex flex-col items-start justify-between w-full my-4 md:my-8 space-y-4 md:space-y-8">
                              <h2 className="w-full text-[#0A0A0A] font-bold text-base md:text-xl">
                              {title}
                              </h2>
                              <p className="w-full text-[14px] md:text-base text-[#0A0A0A] line-clamp-3">
                              {course?.description || 'Learn with Building Bharat.'}
                              </p>
                        </div>
                <Link href={`/courses/${slug}`}>
                 <CTAButton label=' View Course Details'
                             height={48}
                             width={"100%"}
                             borderRadius={8}
                             fontWeight={700}
                             textColor='#0A0A0A'
                             fontSize={16}
                             keepFixedSizeOnHover={true}
                             arrowColor='text-black'
                             disableBorderRadiusChange={true}
                 ></CTAButton>
                 </Link>
         </div>


    )

}

export default ChooseYourCareerPaths
