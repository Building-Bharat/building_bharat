import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

const CourseModules = () => {

      const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                                                <div className='flex space-x-8 items-center justify-center'>
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
  )
}

export default CourseModules
