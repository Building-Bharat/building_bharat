import CTAButton from '@/components/CTAButton'
import React from 'react'

const CourseRes = () => {
  return (

     <section className='w-full'>
           <div className=' py-0 px-0 lg:py-8 lg:px-8 w-full'>
                 <h1 className='whitespace-nowrap w-full font-Montserrat text-base md:text-xl py-2 lg:py-4 font-bold text-[#005451] '>This Course Includes:</h1>
                 <ul className='py-4 grid grid-cols-2 w-full overflow-hidden lg:grid-cols-1 text-[#0A0A0A] font-medium gap-3 lg:gap-5 list-disc list-inside '>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Video Content</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Downloadable resources</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignments</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Discussion forums</li>
                     <li className='text-[12px] w-full lg:min-w-[300px] sm:text-base whitespace-nowrap marker:text-teal-700'>Post course internship</li>
                 </ul>
                 <h1 className='text-base md:text-xl font-bold text-[#0A0A0A] font-Montserrat my-4 md:my-6 '>$6999</h1>
                  <CTAButton label='Enroll Now'
                        textColor='#0A0A0A'
                        width={'100%'}
                        arrowColor='#0A0A0A'
                        disableBorderRadiusChange={true}
                        keepFixedSizeOnHover={true}
                 />
           </div>
     </section>
  )
}

export default CourseRes
