import { DM_Sans } from "next/font/google";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function CareerSection() {
  return (
    <section className="flex flex-col md:flex-row w-full max-w-[95.0625rem] mx-auto p-0 justify-center items-stretch gap-0 bg-gradient-to-l from-[#007A77] to-[#001414] shadow-md">
      {/* Left Section */}
      <div
        className="flex flex-col justify-center w-full md:w-1/2 
                   gap-[2rem] p-[1.5rem] sm:p-[2rem] md:p-[2.5rem] lg:p-[3rem]
                   bg-gradient-to-r from-[#007A77] to-[#001414] text-white
                   items-center md:items-start text-center md:text-left"
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
          className="flex h-[2.5rem] sm:h-[2.75rem] md:h-[3rem] py-[0.5rem] px-[1.5rem] sm:px-[1.75rem] md:px-[2rem] justify-center items-center 
                     rounded-lg border border-[#F97C04] bg-[#E5E5E5] text-[#F97C04] 
                     font-black capitalize font-[Montserrat] text-[0.8125rem] sm:text-[0.84375rem] md:text-[0.875rem] 
                     leading-[1.5rem] md:leading-[2rem] mx-auto md:mx-0 transition-colors duration-300 hover:bg-[#F97C04] hover:text-white"
        >
          Start Learning For Free 
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-[#0A0A0A] min-h-[15rem] sm:min-h-[18rem] md:min-h-[20rem] lg:min-h-[24rem]">
        {/* Add image or video here */}
      </div>
    </section>
  );
}






