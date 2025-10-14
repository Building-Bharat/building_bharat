'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from "../app/courses/(component)/scrollbar-hide.module.css";
import Header from './Header';
import CourseResources from './CourseResources';
import CourseModules from './CourseModules';
import MeetYourCourseMentor from './MeetYourCourseMentor';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import CourseRes from '@/app/courses/(component)/CourseRes';

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

   const [scrolled, setScrolled] = useState(false);
   const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      console.log("scrollTop:", scrollContainer.scrollTop); // debug
      setScrolled(scrollContainer.scrollTop > 30);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);


  return (



    <div className=" bg-[#E5E7EA]">
      <Header />
      <div ref={scrollRef} className={`h-screen overflow-y-scroll mx-4 lg:mx-16 gap-4 xl:gap-8 flex items-stretch ${styles.scrollbarHide}`}>

        <div className="flex-1 min-h-screen">

            <div className="space-y-2 mt-[32px] mb-4">
              <h1 className="text-[#005451] text-[18px] md:text-[32px] font-extrabold">Political Field Operations Mastery</h1>
              <p className="text-[#0A0A0A] text-[13px] md:text-[16px] font-bold">Duration 8 hours </p>
            </div>
         
          <div className="">
            <div
              id="video-box"
              className="relative w-full  xl:h-[560px]
                      aspect-[16/9] lg:aspect-video
                      rounded-xl overflow-hidden shadow-md"
            >
              <video className="w-full h-full object-cover" controls>
                <source src="/sample.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-sm md:text-base text-black py-4 lg:py-8">
              Master the art of field operations for political campaigns. Learn how
              to build and manage ground teams, volunteer coordination, canvassing
              strategies, and voter outreach programs.
            </p>

            <div className="lg:hidden">
              {/* <CourseResources /> */}
               <CourseRes/>
            </div>

          </div>


            {/* list section  */}
          <div className="">
            <section>
              <h1 className="text-base md:text-xl pt-4  font-bold text-[#005451]">
                What you will learn
              </h1>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside mt-3">
                {listContent.map((list) => (
                  <li
                    key={list.text}
                    className="text-[#0A0A0A] text-sm md:text-base leading-relaxed"
                  >
                    {list.text}
                  </li>
                ))}
              </ul>
            </section>

          </div>


           {/* course modules section  */}
          <div className="">
            <section>
              <h1 className="text-base md:text-xl mt-8 mb-4 font-bold text-[#005451]">
                Course Content
              </h1>
              <CourseModules />
            </section>
          </div>


           {/* mentor section  */}
          <div className="">
            <section>
              <MeetYourCourseMentor />
            </section>
          </div>


          <div className="pb-16">
            <section>
              <FrequentlyAskedQuestions />
            </section>
          </div>

        </div>



        {/* card sticky  */}
        <div className={`sticky hidden lg:block top-[130px] ${scrolled ? "-top-[2px]":"top-0"}  transition-all duration-300`}>
          <div className="shadow-md bg-[#F1F1F1] rounded-xl">
            {/* <CourseResources /> */}
            <CourseRes/>
          </div>
        </div>

      </div>
    </div>

  )
}

export default CourseView
