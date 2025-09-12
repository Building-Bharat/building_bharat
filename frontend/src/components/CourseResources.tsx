import React from 'react'
import CTAButton from './CTAButton'

const CourseResources = () => {



  return (
                          <div id="second" className=' z-10 sm:bg-[#F1F1F1] h-full text-[#0A0A0A] shadow-0 md:shadow-xl py-0 md:py-4 lg:p-8 rounded-0 w-[260px] lg:w-[339px] md:rounded-lg flex flex-col justify-start'>
                                         <div className='sm:px-4'>
                                                <h3 className='whitespace-nowrap text-base md:text-xl py-4 md:py-2 lg:py-4 font-bold text-[#005451] '>This course include : </h3>
                                                 <ul className='py-4 grid grid-cols-2 md:grid-cols-1 gap-3 lg:gap-8 w-full list-disc list-inside '>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Video Content</li>
                                                     <li className='whitespace-nowrap text-[14px] sm:text-base marker:text-teal-700' >Download Resources</li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                     <li className='text-[14px] sm:text-base whitespace-nowrap marker:text-teal-700'>Practical assignment </li>
                                                 </ul>
                                         </div>
                                     
                                         <div className='space-y-4 w-full mt-2 lg:mt-8 sm:px-4'>
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
