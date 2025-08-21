
"use client";
import { Montserrat, DM_Sans } from "next/font/google";
import { FormEvent } from "react";
import { toast,ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // ExtraBold
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "300"], // Regular
});

export default function SuccessGuide() {

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ⬅️ stops page reload

  const form = e.currentTarget; // HTMLFormElement
  const emailInput = form.elements.namedItem("email") as HTMLInputElement;
  const email = emailInput.value;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  toast.success("Email submitted successfully!");
};


  return (
    <section className="w-full max-w-ful min-h-full bg-[#0A0A0A] mx-auto flex flex-col md:flex-row md:items-center gap-6 p-4">
      {/* Left Section - Text + Form */}
      <div className="flex-1 flex flex-col gap-10 p-4 w-full md:max-w-[544px] min-h-[400px] md:ml-8 order-2 md:order-1">
        {/* Heading */}
        <h3
          className={`${montserrat.className} font-bold text-[16px] sm:text-[20px] font-weight:700 leading-[24px] sm:leading-[28px] text-[#F1F1F1]`}
        >
          Download the Free Political Career Success Guide
        </h3>

        {/* List Items */}
        <ul className="flex flex-col gap-6">
          {[
            "Master Behavioral & HR Interview Rounds with targeted preparation strategies.",
            "Access top industry questions asked in political, policy, and governance interviews.",
            "Leverage proven answer templates to leave a strong impression.",
          ].map((item, i) => (
            <li
              key={i}
              className={`${dmSans.className} text-[16px] leading-[20px] text-[#F1F1F1] font-regular font-weight:400 flex gap-2`}
            >
              <span className="text-[#F9FAFB]">•</span> {item}
            </li>
          ))}
        </ul>

        {/* Email Form */}
        <>
        <form
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[512px] mt-2">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className=" h-[48px] w-full sm:w-[327px] font-light rounded-[8px] px-3 py-2 font-DMsans font-weight:300 text-[#6D717F] text-[13px] sm:text-[13px] leading-[16px] sm:leading-[20px] border border-[#F97C04] focus:outline-none"
            />
            <button className="bg-[#F97C04] w-full sm:w-[137px] h-[48px] ml-[0px] sm:ml-[24px] px-6 rounded-[8px] text-black font-semibold">
              Submit
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
        </>
      </div>

      {/* Right Section - Grey Box */}
      <div className="flex-1 flex justify-center p-4 mb-[16px] order-1 md:order-2">
        <div className="w-full max-w-[512px] h-auto aspect-[16/10] bg-[#394050]" />
      </div>
    </section>
  );
}
