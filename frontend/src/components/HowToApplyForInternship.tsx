import React from 'react'

const HowToApplyForInternship = () => {


  return (
       <section>
             <div className='mt-8 sm:mt-16 mx-4 sm:mx-16 pb-8'>
                   <h1 className='font-bold text-base sm:text-xl text-[#005451] text-center'>How to Apply for Internships</h1>
                   <div className='flex w-full flex-col items-center justify-center mx-auto'> 
                        <p className='py-4 sm:py-8 w-full text-[14px] md:text-base text-center text-[#0A0A0A]'>To participate in Public Policy Internships, students must first enroll in one of our courses. This ensures you are fully prepared and guided for impactful contributions.</p>
                        <div className='flex space-y-28 sm:space-y-0 flex-col md:flex-row w-full items-center justify-center '>

                                <div className='max-w-[200px] flex flex-col items-center justify-center space-y-6'>
                                     <div className=' w-[64px] h-[64px] lg:w-[120px] lg:h-[120px] bg-white flex items-center justify-center rounded-full'>
                                         <img src="/icons/enroll_bharat.svg" alt="" /> 
                                     </div>
                                    <p className='text-[13px] w-44 text-black text-center'>Enroll in your preferred Building Bharat course</p>
                                </div>
                                       <img src="/icons/arrow.svg" alt="" className=' rotate-90 sm:rotate-0 w-auto sm:w-16 lg:w-auto ' />



                                <div className='  w-full md:max-w-[200px] flex flex-col items-center justify-center space-y-6'>
                                     <div className='w-[64px] h-[64px] lg:w-[120px] lg:h-[120px] bg-white flex items-center justify-center rounded-full'>
                                         <img src="/icons/guidance.svg" alt="" className='' /> 
                                     </div>
                                    <p className='text-[13px] w-44 text-black text-center'>Enroll in your preferred Building Bharat course</p>
                                </div>
                                        <img src="/icons/arrow.svg" alt="" className=' rotate-90 sm:rotate-0 w-auto sm:w-16 lg:w-auto ' />


                                <div className=' w-full md:max-w-[200px] flex flex-col items-center justify-center space-y-6'>
                                     <div className='w-[64px] h-[64px] lg:w-[120px] lg:h-[120px] bg-white flex items-center justify-center rounded-full'>
                                         <img src="/icons/policy.svg" alt="" /> 
                                     </div>
                                    <p className='text-[13px] w-44 break-words lg:w-full text-black text-center'>Enroll in your preferred Building Bharat course</p>
                                </div>  

                        </div>
                   </div>
             </div>
       </section>
  )
}

export default HowToApplyForInternship
