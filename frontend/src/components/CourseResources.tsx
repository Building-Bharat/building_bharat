import React from 'react'
import CTAButton from './CTAButton'

const CourseResources = () => {

  return (
                          <div id="second" className=' z-10 lg:bg-[#F1F1F1] mb-4 lg:mb-0  h-full text-[#0A0A0A] py-0 md:py-4 xl:p-8  lg:rounded-xl lg:shadow-lg w-full lg:w-[260px] xl:w-[349px] flex flex-col justify-start p-0 lg:p-4'>
                                         <div className='w-full'>
                                                <h3 className='whitespace-nowrap text-base md:text-xl py-2 lg:py-4 font-bold text-[#005451] '>This course include : </h3>
                                                 <ul className='py-4 grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4 w-full list-disc list-inside '>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Video Content</li>
                                                     <li className='whitespace-nowrap text-[14px] sm:text-base marker:text-teal-700' >Download Resources</li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                 </ul>
                                         </div>
                                     
                                         <div className='space-y-4 w-full mt-2 lg:mt-8'>
                                                <p className='text-base md:text-xl font-bold text-[#0A0A0A] font-Montserrat ' >&#8377;6,999</p>
                                                 <CTAButton label='Enroll Now'
                                                      textColor='#0A0A0A'
                                                      width={'100%'}
                                                      arrowColor='#0A0A0A'
                                                      disableBorderRadiusChange={true}
                                                      keepFixedSizeOnHover={true}
                                                  />
                                         </div>
                                     </div>

  )
}

export default CourseResources
