'use client'
import React, { useState } from 'react'
import CTAButton from './CTAButton'
import CourseResources from './CourseResources'
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
            <div className='flex-1 py-4  '>
                <div id='video' className='w-full mb-4 bg-black min-h-[400px] rounded-lg flex items-center justify-center'>
                    {/* video  */}
                </div>
                <div className='grid w-full grid-cols-1 space-y-8'>
                    <div className='space-y-4 md:space-y-8 '>
                        <p className='text-sm md:text-base text-black'>Master the art of field operations for political campaigns. Learn how to build and manage ground teams, volunteer coordination, canvassing strategies, and voter outreach programs.</p>
                        <h1 className='text-base md:text-xl font-bold text-[#008C85]'>What you will learn</h1>

                        <div id='dynamic' className='border fixed left-4 md:left-16 mx-auto top-[550px] right-4 md:right-[300px]  z-10  px-4 bg-white border-gray-300 py-2 md:py-4 rounded-lg flex items-center justify-between'>
                            <p className='text-base md:text-xl font-bold text-[#0A0A0A] font-Montserrat ' >&#8377;6,999</p>
                            <CTAButton label='Enroll Now'
                                textColor='#0A0A0A'
                                width='min-w-4'
                                arrowColor='#0A0A0A'
                            />
                        </div>
                    </div>
                    {/* details points  */}
                    <div className=''>
                        <ul className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full list-disc list-inside'>
                            {listContent.map((list) => (
                                <li key={list.text} className='text-[#0A0A0A] text-[14px] lg:text-base'>{list.text}</li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className='grid w-full grid-cols-1 mt-8 space-y-8'>
                    <h1 className='text-base md:text-xl font-bold text-teal-800'>Course Content</h1>
                    <div className=' '>
                        {
                            modules.map((module, index) => (

                                <div key={index} className='border border-gray-400'>
                                    <div className='px-4 py-2 md:py-4'>
                                        <div className='flex items-center justify-between'>
                                            <button
                                                onClick={() => toggleIndex(index)}
                                                className="flex justify-between items-start w-full text-left"
                                            >
                                                <div className='flex space-x-8'>
                                                    <Image
                                                        src="/icons/book.png"
                                                        alt="book icon"
                                                        width={26}
                                                        height={33}
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
                                                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                                >
                                                <p className="mt-3 text-[#0A0A0A] pl-14 overflow-hidden">
                                                    {module.answer}
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


            <div className='md:self-auto'>
                <CourseResources />
            </div>

        </section>

    )

}

export default CourseVideo
