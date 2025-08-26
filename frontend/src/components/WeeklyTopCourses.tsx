import React from 'react'

const WeeklyTopCourses = () => {



  return (
    <div className='w-full min-h-[510px] mx-auto pt-16 md:pt-32 lg:pt-16'>

            <div className='w-full lg:max-w-[1152px] min-h-[510px] px-[16px] lg:px-[64px] mx-auto'>
                    <h1 className= 'text-lg w-full text-black lg:text-[32px] leading-[38px] text-center font-extrabold py-2'>Weekly Top Courses</h1>
                    <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                            <WeeklyTopCoursesItem />
                            <WeeklyTopCoursesItem />
                    </div>
                    
            </div>  

    </div>
  )
}




const WeeklyTopCoursesItem = () => {
  return (
    <div className="w-full max-w-[528px] min-h-[356px] lg:min-h-[408px] m-4 p-4 border border-slate-400 rounded-lg flex flex-col">
      
      {/* Image */}
      <div className="w-full h-[216px] bg-slate-600 rounded-lg">
        {/* image */}
      </div>

      {/* Content */}
      <div className="flex flex-col items-start justify-between w-full my-4 md:my-8 space-y-4 md:space-y-8">
        <h2 className="w-full font-bold text-base md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <p className="w-full text-[14px] md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
        </p>
      </div>

      {/* Button */}
      <button className="h-12 w-full text-base font-bold text-center bg-orange-500 rounded-lg mt-auto">
        View Course Details
      </button>
    </div>
  );
};




export default WeeklyTopCourses






