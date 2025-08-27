import React from 'react'
import CTAButton from './CTAButton';
import Link from 'next/link';


const WeeklyTopCourses = () => {


  return (
    <div className="w-full min-h-[510px] mx-auto pt-16 md:pt-32 lg:pt-16">
      <div className="w-full min-h-[510px] px-[16px] lg:px-[64px] space-y-0 sm:space-y-8">
        <h1 className="text-lg w-full text-[#005451] pb-8 sm:pb-0 lg:text-[32px] leading-[38px] text-center font-extrabold">
          Weekly Top Courses
        </h1>
        <p className='text-sm pb-4 sm:pb-0 text-center font-normal text-[#0A0A0A]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa ai. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.</p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
            <WeeklyTopCoursesItem />
            <WeeklyTopCoursesItem />
        </div>
      </div>
    </div>
  );
};



const WeeklyTopCoursesItem = () => {
  return (
    <div className="w-full min-h-[356px] lg:min-h-[408px] p-4 border border-slate-400 rounded-lg flex flex-col">

      {/* Image */}
      <div className="w-full h-[216px] bg-slate-600 rounded-lg"></div>

      {/* Content */}
      <div className="flex flex-col items-start justify-between w-full my-4 md:my-8 space-y-4 md:space-y-8">
        <h2 className="w-full font-bold text-base md:text-xl text-[#0A0A0A]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <p className="w-full text-[14px] md:text-base text-[#0A0A0A]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
        </p>
      </div>
         <Link href="/courses/political-field-operations-mastery">
         <CTAButton label=' View Course Details'
                                     height={48}
                                     width={"100%"}
                                     borderRadius={8}
                                     fontWeight={700}
                                     textColor='#0A0A0A'
                                     fontSize={16}
                                     keepFixedSizeOnHover={true}
                                     arrowColor='text-black'
        ></CTAButton>
        </Link>
    </div>
  );
};




export default WeeklyTopCourses


