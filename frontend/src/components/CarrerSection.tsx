import { DM_Sans } from "next/font/google";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



export default function CareerSection() {
  

  return (
    <section className="flex flex-col h-auto sm:h-[300px] md:h-auto md:flex-row w-full max-w-full mx-auto p-0 justify-center items-stretch gap-0 bg-gradient-to-l from-[#007A77] to-[#001414] shadow-md">
      {/* Left Section - Green Gradient */}
      <div
        className="flex flex-col justify-center w-full md:w-1/2 
                   gap-[2rem] p-[1.5rem] sm:p-[2rem] md:p-[2.5rem] lg:p-[3rem]
                   bg-gradient-to-r from-[#007A77] to-[#001414] text-white
                   items-center md:items-start text-center md:text-left
                   order-2 md:order-1"
      >
        <div className="flex flex-col space-y-[1rem] max-w-[31.25rem]">
          <h2 className="text-[#F1F1F1] font-[Montserrat] text-[0.875rem] sm:text-[0.9375rem] md:text-[1rem] font-black leading-[1.5rem] sm:leading-[1.625rem] md:leading-[2rem]">
            Ready to start your career in this domain?
          </h2>
          <p
            className={`${dmSans.className} text-[0.8125rem] sm:text-[0.84375rem] md:text-[0.875rem] font-normal leading-[1.25rem] sm:leading-[1.375rem] md:leading-[1.5rem] text-[#F1F1F1]`}
          >
            Our programs combine practical learning with exclusive exposure and
            assignment to help you secure internships and jobs across these six
            key ecosystems.
          </p>
        </div>

    <button
  className="group 
             relative inline-flex items-center justify-center
             px-8 py-3
             w-full md:w-auto
             bg-[#F1F1F1] text-[#F97C04] 
             border border-[#F97C04]
             rounded-lg hover:rounded-[1px]
             font-[DM Sans] font-bold text-[16px] leading-6
             transition-all duration-300 ease-in-out
             transform hover:scale-x-105 hover:translate-x-1"
>
  {/* Arrow (hidden until hover) */}
  <svg
    className="w-5 h-5 absolute left-4 
               opacity-0 -translate-x-2 
               transition-all duration-300 ease-in-out
               group-hover:opacity-100 group-hover:translate-x-0"
    fill="none"
    stroke="#F97C04"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>

  {/* Button text */}
  <span className="pl-2">Start Learning For Free</span>
</button>

      </div>

      {/* Right Section - Black Background */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-[#0A0A0A] min-h-[15rem] sm:min-h-[300px] order-1 md:order-2">
        {/* Add image or video here */}
      </div>
    </section>
  );
}






