import React from 'react'
import CTAButton from './CTAButton'
import Image from 'next/image'

const InternshipDetail = () => {


  return (
     <section>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 m-4 sm:m-16'>

                {/* left  */}
               <div className='w-full'>

                    <div className='space-y-4'>
                        <h1 className='text-[#0A0A0A] text-xl font-bold '>Internship Title</h1>
                        <p className='text-base text-[#0A0A0A] font-[450]'>Firm Name</p>
                    </div>


                    <div className=''> 
                         <div className='bg-gray-700 w-full h-56 my-8 relative'>
                             {/* image  */}
                             <Image src="/images/internship.svg" fill alt='Internship' className=' object-cover' /> 
                         </div>

                         <h1 className='text-base font-bold text-[#0A0A0A]'>About the Internship</h1>
                         <p className='text-base font-[450] text-[#0A0A0A] mt-4'>FOX Corporation is hiring for the role of Video Engineering Intern !</p>
                    </div>

                    <div className='my-8 space-y-8'>
                         <h1 className="text-base font-bold mb-2 text-[#0A0A0A]">Responsibilities of the Intern:</h1>
                         <div className='ml-2'>
                              <ul className="list-disc list-inside text-[#0A0A0A] space-y-2 text-base font-[450]">
                                   <li>Design and build components of comprehensive video workflow pipelines — from content ingestion to final delivery.</li>
                                   <li>Build and optimize transcoding workflows for various formats and resolutions using cloud-native platforms.</li>
                                   <li>Apply AI/ML models to improve video quality.</li>
                                   <li>Detection and correction of visual artifacts or noise.</li>
                                   <li>Create real-time video monitoring tools.</li>
                              </ul>
                         </div>
                    </div>

                </div>



               {/* right  */}
               <div className='w-full lg:w-[328px] m-4 mx-auto'>
                   <div className='bg-[#F1F1F1] w-full mx-auto border rounded-lg p-4 space-y-8 '> 
                         <h1 className='text-base font-bold text-[#0A0A0A]'>Additional Informations:</h1>
                         <div className='space-y-4'>
                               <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Location(s)</h2>
                               <p className='text-base font-[450] text-[#0A0A0A]'>Bengaluru</p>
                         </div> 
                         <div className='space-y-4'>
                              <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Duration</h2>
                              <p className='text-base font-[450] text-[#0A0A0A]'>3 months</p>
                         </div>
                         <div className='space-y-4'>
                              <h2 className='text-base font-bold text-[#0A0A0A]'>Stipend</h2>
                              <p className='text-base font-[450] text-[#0A0A0A]'>Not Disclosed</p>
                         </div>
                         <div className='space-y-4'>
                              <h2 className='text-base font-bold text-[#0A0A0A]'>Internship Type</h2>
                              <p className='text-base font-[450] text-[#0A0A0A]'>Hybrid</p>
                         </div>
                         <div className=''>
                             <CTAButton 
                                   label='Apply Now'
                                   textColor='#0A0A0A'
                                   width={'100%'}
                                   arrowColor='#0A0A0A'
                                   disableBorderRadiusChange={true}
                                   keepFixedSizeOnHover={true}
                              />
                         </div>
                   </div>
               </div>

          </div>
     </section>

  )
  
}

export default InternshipDetail
