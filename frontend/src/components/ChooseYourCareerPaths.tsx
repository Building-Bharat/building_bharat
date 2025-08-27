'use client'
import React from 'react'
import CTAButton from './CTAButton'
import Link from 'next/link'

const ChooseYourCareerPaths = () => {

  return (

         <section className="mt-16 py-4 mx-0 lg:mx-16">
                  <div className="w-full space-y-0 sm:space-y-8 mx-auto px-8 lg:px-0">
                        <h1 className="text-lg  pb-8 sm:pb-0 w-full text-[#005451] lg:text-[32px] leading-[38px] text-center font-extrabold">
                              Choose Your Career Path
                        </h1>
                        <p className='text-sm pb-4 sm:pb-0 text-[#0A0A0A] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.</p>

                        {/* Grid container */}
                        <div className="min-h-[440px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ">
                              <CareerPathCard />
                              <CareerPathCard />
                              <CareerPathCard />
                              <CareerPathCard />
                        </div>
                  </div>
        </section>

      )
}



const CareerPathCard = () =>{
  
    return (

          <div className="w-full min-h-[356px] lg:min-h-[408px] p-4 border border-slate-400 rounded-lg flex flex-col">

                        {/* Image */}
                        <div className="w-full h-[216px] bg-slate-600 rounded-lg"></div>

                        {/* Content */}
                        <div className="flex flex-col items-start justify-between w-full my-4 md:my-8 space-y-4 md:space-y-8">
                              <h2 className="w-full text-[#0A0A0A] font-bold text-base md:text-xl">
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


    )

}

export default ChooseYourCareerPaths
