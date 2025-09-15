'use client'
import React, { useState } from 'react'
import CTAButton from './CTAButton'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const CourseVideo = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);
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

    const modules = [
        {
            question: "Module 1: Volunteer Recruitment & Management",
            answer: "Response"
        },
        {
            question: "Module 2: Door-to-Door Canvasing Strategies",
            answer: "Response"
        },
        {
            question: "Module 3: Event Organization & Management",
            answer: "Response"
        },
        {
            question: "Module 4: GOTV (Get Out the Vote) Operations",
            answer: "Response"
        },
        {
            question: "Module 5: Constituency Mapping & Targeting",
            answer: "Response"
        }
    ];

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }



    return (

        <section className='flex flex-col md:flex-row gap-4 md:gap-8 mb-4'>
            <div className='flex-1 py-4 '>
                <div className='md:space-x-8 '>
                    
                   <div id="first" className='w-full flex md:space-x-8 flex-col md:flex-row items-start justify-center'>
                             <div className='aspect-[16/9] w-full flex-col items-center justify-center'>     
                                <div id='video' className='mb-4 w-full bg-black aspect-[16/9] rounded-lg flex items-center justify-center'>
                                    {/* video  */}
                                    <Image src="/icons/play_circle.png" width={40} height={40} alt="" />
                                        
                                </div>
                                <p className='text-sm md:text-base text-black py-4'>Master the art of field operations for political campaigns. Learn how to build and manage ground teams, volunteer coordination, canvassing strategies, and voter outreach programs.</p>
                             </div>
                                
                          
        
                           <div id="second" className=' text-[#0A0A0A] shadow-0 md:shadow-xl p-0 sm:p-4 lg:p-8 rounded-0  md:rounded-lg w-full  md:w-[360px] lg:w-[600px] flex flex-col justify-start'>
                                <div>
                                    <h3 className='whitespace-nowrap text-base md:text-xl py-4 font-bold text-[#005451] '>This course include : </h3>
                                    <ul className='py-4 grid grid-cols-2 md:grid-cols-1 gap-4 lg:gap-8 w-full list-disc list-inside '>
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
                                />
                           </div>
                         </div>


                   </div>
  
              </div>


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
                    <h1 className='text-base md:text-xl font-bold text-[#005451]'>Course Content</h1>
                    <div className=' space-y-4'>
                        {
                            modules.map((module, index) => (

                                <div key={index} className='border border-gray-400 rounded-2xl bg-[#F1F1F1] '>
                                    <div className='px-4 py-2 md:py-4'>
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={() => toggleIndex(index)}
                                                className="flex justify-between items-start w-full text-left"
                                            >
                                                <div className='flex space-x-8'>
                                                    <Image
                                                        src="/icons/book.svg"
                                                        alt="book icon"
                                                        width={16}
                                                        height={24}
                                                        className="w-6 h-6"
                                                    />
                                                    <p className=' text-sm sm:text-base text-[#0A0A0A]  font-normal'> {module.question} </p>
                                                </div>
                                                <ChevronDown
                                                    className={`w-8 h-8 ml-8 font-extrabold text-orange-500 transform transition-transform duration-500 ${
                                                    openIndex === index ? "rotate-180" : ""
                                                    }`}
                                                />

                                            </button>
                                        </div>


                                        {/* response  */}
                                        <div>
                                            <div
                                                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                                                    openIndex === index ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0 "
                                                }`}
                                                >
                                                <p className={` ${openIndex===index ? "pt-2":"pt-0"} text-[#0A0A0A] text-sm sm:text-base px-14 overflow-hidden `}>
                                                    {module.answer}
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ad, porro veritatis repellat nostrum consequatur voluptatibus quo magnam cupiditate alias unde vitae corrupti nam error obcaecati voluptatem nisi sed sequi.
                                                </p>
                                             </div>

                                        </div>

                                    </div>
                                </div>

                            ))
                        }

                    </div>
                </div>
            </div>

        </section>

    )

}

export default CourseVideo
