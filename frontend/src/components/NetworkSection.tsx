"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CompanyLogosSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h1
          className={`text-[16px] sm:text-[32px] leading-[24px] sm:leading-[38px] font-Montserrat font-weight:800 font-extrabold text-[#005451] mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our Learners Are Powering Governance & Campaigns Nationwide
        </h1>
        <p
          className={`text-black text-[14px] sm:text-[16px] leading-[20px] font-DMsans font-weight:400  max-w-auto mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          With top peers, field mentors, and live political projects, they now
          work in government offices, think tanks, and leading political
          consultancies.
        </p>
      </div>

      {/* Company Logos Grid */}
      <div
        className="
            grid 
     grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7
     gap-4 px-2 sm:px-4
   
        "
      >
        {/* Row 1 */}
        <div
          className={`h-16  border border-[#F97C04] rounded-lg  hidden sm:block bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm flex justify-center items-center mt-0 sm:mt-[14px] ">
            <Image
              src="/images/3c.png"
              alt="Icon"
              width={110}
              height={40}
              className="max-w-auto w-auto h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-blue-600 font-bold text-lg flex justify-center items-center mt-0 sm:mt-[8px]">
            <Image
              src="/images/lamp.jpg"
              alt="Icon"
              width={120}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm flex justify-center items-center">
            <Image
              src="/images/book.webp"
              alt="Icon"
              width={90}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-16  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="font-semibold text-sm flex justify-center items-center">
            <Image
              src="/images/cpr.jpg"
              alt="Icon"
              width={90}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] hidden sm:block  rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <span className=" font-semibold text-sm flex justify-center items-center sm:mt-[16px] mt-0">
            <Image
              src="/images/cvoter.png"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="font-semibold text-sm">
            <Image
              src="/images/dex.png"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-16  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">
            <Image
              src="/images/filings.png"
              alt="Icon"
              width={120}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 2 */}
        <div
          className={`h-23  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 hidden sm:block transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <span className="text-blue-600 font-bold text-sm flex justify-center items-center">
            <Image
              src="/images/gandhi.jpeg"
              alt="Icon"
              width={190}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 block md:hidden lg:block transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <span className="text-blue-600 font-bold text-sm flex justify-center items-center sm:mt-[8px] mt-0">
            <Image
              src="/images/ppgf.png"
              alt="Icon"
              width={110}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] rounded-lg flex items-center justify-center block md:hidden lg:block bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <span className="font-bold text-lg  flex justify-center items-center sm:mt-[8px] mt-0">
            <Image
              src="/images/indfound.png"
              alt="Icon"
              width={80}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
  className={`
    row-span-2 h-44 border border-[#F97C04] rounded-lg flex items-center justify-center 
    bg-gradient-to-t from-blue-400 via-blue-300 to-blue-200 
    hover:shadow-xl hover:scale-110 transition-all duration-500 
    ${isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-12"}
    col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 2xl:col-span-1
  `}
  style={{ transitionDelay: "1500ms" }}
>
  <div className="text-center">
    <div className="w-48 h-48 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300">
      <Image
        src="/images/bharat.png"
        alt="Icon"
        width={200}
        height={200}
        className="max-w-full h-auto object-contain"
      />
    </div>
  </div>
  </div>
  
  



        <div
          className={`h-24  border border-[#F97C04] rounded-lg flex items-center hidden lg:block justify-center  bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <span className="font-bold text-lg flex justify-center items-center">
            <Image
              src="/images/ipac.jpeg"
              alt="Icon"
              width={90}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex items-center justify-center hidden lg:block bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1700ms" }}
        >
          <span className="text-blue-600 font-bold text-lg flex justify-center items-center">
            <Image
              src="/images/jarvis.jpeg"
              alt="Icon"
              width={70}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] rounded-lg hidden lg:block flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1800ms" }}
        >
          <span className="text-red-600 font-bold text-lg flex justify-center items-center">
            <Image
              src="/images/jansuraj.png"
              alt="Icon"
              width={90}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 3 */}
        <div
          className={`h-24  border border-[#F97C04] hidden lg:block rounded-lg  bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1900ms" }}
        >
          <span className="text-blue-600 font-bold text-sm flex justify-center items-center mt-0 sm:mt-[32px]">
            <Image
              src="/images/mukherjee.png"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2000ms" }}
        >
          <span className="text-orange-500 font-bold text-sm flex justify-center items-center">
            <Image
              src="/images/orf.jpg"
              alt="Icon"
              width={120}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2100ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">
            <Image
              src="/images/prs.png"
              alt="Icon"
              width={70}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2200ms" }}
        >
          <span className="text-red-600 font-bold text-sm">
            <Image
              src="/images/rajneeti.jpeg"
              alt="Icon"
              width={70}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-16  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2300ms" }}
        >
          <span className="font-bold text-sm">
            <Image
              src="/images/showtime.jpeg"
              alt="Icon"
              width={50}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2400ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">
            <Image
              src="/images/taksa.webp"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 4 */}
        <div
          className={`h-24  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2500ms" }}
        >
          <span className="text-pink-600 font-semibold text-sm">
            <Image
              src="/images/teach.webp"
              alt="Icon"
              width={190}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex hidden sm:block items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2600ms" }}
        >
          <span className="font-bold text-lg flex justify-center items-center mt-0 sm:mt-[12px]">
            <Image
              src="/images/varahe.png"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2700ms" }}
        >
          <span className="text-green-600 font-bold text-sm flex justify-center items-center">
            <Image
              src="/images/smartneta.png"
              alt="Icon"
              width={80}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24 lg:h-16  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2800ms" }}
        >
          <span className="text-red-600 font-bold text-lg flex justify-center items-center">
            <Image
              src="/images/vidhi.jpg"
              alt="Icon"
              width={150}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] hidden sm:block rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2900ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm flex justify-center items-center mt-0 sm:mt-[20px]">
            <Image
              src="/images/namo.png"
              alt="Icon"
              width={100}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20  border border-[#F97C04] rounded-lg flex hidden sm:block items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3000ms" }}
        >
          <span className="text-blue-600 font-bold text-lg flex justify-center items-center mt-0 sm:mt-[24px]">
            <Image
              src="/images/democracy.png"
              alt="Icon"
              width={100}
              height={40}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-24  border border-[#F97C04] rounded-lg flex hidden sm:block items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3100ms" }}
        >
          <span className="text-red-600 font-bold text-lg flex justify-center items-center mt-0 sm:mt-[24px]">
            <Image
              src="/images/minds.png"
              alt="Icon"
              width={190}
              height={90}
              className="max-w-full h-auto object-contain"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
