import Image from 'next/image'
import React from 'react'
import CourseModules from './CourseModules'
import MeetYourCourseMentor from './MeetYourCourseMentor'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'
import CourseResources from './CourseResources'



const CourseView = () => {

     const listContent = [
        {
            text: "Build and manage high-performing volunteer teams"
        },
        {
            text: "Develop targeted constituency outreach programs"
        },
        {
            text: "Design and execute effective GOTV operations"
        },
        {
            text: "Coordinate field activities with central campaign strategy"
        },
        {
            text: "Utilize technology for field team coordination"
        },

    ]


  return (
    
    <section className='flex flex-col h-full md:flex-row gap-4 md:gap-8 mb-4 '>
           <div className='h-full'>
                   <div className='w-full h-full flex flex-col md:flex-row items-start justify-center gap-8'>
                             {/* column -1  */}
                            <div id='first' className='flex flex-col items-center justify-center '>
                                     
                                   <div className='w-full'>
                                      {/* video section  */}
                                       <div className='flex-col items-center justify-center'>     
                                            <div id='video' className='mb-4 w-full h-[240px] md:h-[400px] lg:h-[530px] bg-black  rounded-lg flex items-center justify-center'>
                                                {/* video  */}
                                                <Image src="/icons/play_circle.png" width={40} height={40} alt="" />
                                            </div>
                                            <p className='text-sm md:text-base text-black py-4'>Master the art of field operations for political campaigns. Learn how to build and manage ground teams, volunteer coordination, canvassing strategies, and voter outreach programs.</p>
                                       </div> 
                                    </div>


                                   <div className='block sm:hidden mb-4 w-full'>
                                         <CourseResources/>
                                   </div>


                                      {/* list section  */}
                                       <div className='grid w-full grid-cols-1 space-y-4 mt-4'>
                                            <div className='space-y-4 md:space-y-8 '>
                                                <h1 className='text-base md:text-xl font-bold text-[#005451]'>What you will learn</h1>
                                            </div>
                                            {/* details points  */}
                                            <div className=''>
                                                <ul className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full list-disc list-inside'>
                                                    {listContent.map((list) => (
                                                        <li key={list.text} className='text-[#0A0A0A] text-[14px] lg:text-base '>{list.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                 

                                   <div className='grid w-full grid-cols-1 mt-8 space-y-8'>
                                     {/* module section  */}
                                      <h1 className='text-base md:text-xl font-bold text-[#005451]'>Course Content</h1>
                                       <CourseModules/>  
                                   </div> 


                                   <div className='w-full'>
                                       {/* meet mentor  */}
                                       <MeetYourCourseMentor/>
                                   </div>
                                   <div className='w-full'>
                                       {/* frequntly asked  */}
                                       <FrequentlyAskedQuestions/>
                                   </div>
                                  

                            </div>


                             {/* second column   */}
                            <div id='second' className='hidden sm:block h-[400px] lg:h-[530px] sticky top-0 ' > 
                                <CourseResources/>
                            </div>
                   </div>
           </div>
    </section>


  )
}

export default CourseView
