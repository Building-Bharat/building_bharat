"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LearnersSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h1
          className={`text-[18px] md:text-[32px] leading-[24px]  md:leading-[38px] font-extrabold font-Montserrat text-[#005451] mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Our Learners Are Powering Governance & Campaigns Nationwide
        </h1>
        <p
          className={`text-[16px] leading-[20px] text-gray-600 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          With top peers, field mentors, and live political projects, they now work in government offices, think tanks, and leading political consultancies.
        </p>
      </div>

      {/* Company Logos Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 px-4">
        {/* Row 1 */}
        <div
          className={` border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/cpr.png"
              alt="Icon"
              width={110}
              height={40}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={` rounded-lg flex items-center justify-center border border-[#F97C04] bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
             <Image
              src="/images/gandhi.png"
              alt="Icon"
              width={170}
              height={70}
             className="w-auto max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 rounded-lg flex items-center justify-center bg-white border border-[#F97C04] bg-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/filings.png"
              alt="Icon"
              width={120}
              height={70}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
               <Image
              src="/images/book.png"
              alt="Icon"
              width={80}
              height={30}
             className="max-w-full h-auto object-contain"
            />

          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/jansuraj.png"
              alt="Icon"
              width={70}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/ipac.png"
              alt="Icon"
              width={70}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/jarvis.png"
              alt="Icon"
              width={90}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 2 */}
        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/mukherjee.png"
              alt="Icon"
              width={150}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/orf.png"
              alt="Icon"
              width={120}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/nitiayog.png"
              alt="Icon"
              width={80}
              height={20}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`row-span-2 border border-[#F97C04] rounded-lg flex items-center justify-center bg-blue-50 hover:shadow-xl hover:scale-110 transition-all duration-500 ${
            isVisible
              ? "opacity-100 translate-y-0 rotate-0"
              : "opacity-0 translate-y-12 rotate-12"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <div className="text-center">
            <div className="w-auto sm:w-50 h-auto sm:h-50 bg-teal-700 rounded-full mx-auto mb-2 flex items-center justify-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
              <span className="flex items-center justify-center w-full h-full p-2">
                <Image
              src="/images/bharat.png"
              alt="Icon"
              width={150}
              height={50}
             className="max-w-full h-auto object-contain"
            />
              </span>
            </div>
          </div>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/showtime.png"
              alt="Icon"
              width={100}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1700ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/rajneeti.png"
              alt="Icon"
              width={100}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1800ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/prs.png"
              alt="Icon"
              width={180}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 3 */}
        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1900ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/taksa.png"
              alt="Icon"
              width={180}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-orange-200 rounded-lg flex items-center justify-center bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2000ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/varahe.png"
              alt="Icon"
              width={180}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2100ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/vidhi.png"
              alt="Icon"
              width={200}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2200ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/cvoter.png"
              alt="Icon"
              width={190}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2300ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/bimarc.png"
              alt="Icon"
              width={90}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        <div
          className={`h-20 border border-[#F97C04] rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2400ms" }}
        >
          <span className="flex items-center justify-center w-full h-full p-2">
            <Image
              src="/images/smartneta.png"
              alt="Icon"
              width={150}
              height={50}
             className="max-w-full h-auto object-contain"
            />
          </span>
        </div>

        {/* Row 4 */}
        <div
          className={`h-20 border border-pink-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2500ms" }}
        >
          <span className="text-pink-600 font-semibold text-sm"></span>
        </div>

        <div
          className={`h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2600ms" }}
        >
          <span className="font-bold text-lg"></span>
        </div>

        <div
          className={`h-20 border border-green-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2700ms" }}
        >
          <span className="text-green-600 font-bold text-sm"></span>
        </div>

        <div
          className={`h-20 border border-red-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2800ms" }}
        >
          <span className="text-red-600 font-bold text-lg"></span>
        </div>

        <div
          className={`h-20 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2900ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">
            
          </span>
        </div>

        <div
          className={`h-20 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3000ms" }}
        >
          <span className="text-blue-600 font-bold text-lg"></span>
        </div>

        <div
          className={`h-20 border border-red-200 rounded-lg flex items-center justify-center bg-white hidden sm:block hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3100ms" }}
        >
          <span className="text-red-600 font-bold text-lg "></span>
        </div>
      </div>
    </section>
  );
}
