// components/SuccessGuide.tsx
import { Montserrat, DM_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"], // ExtraBold
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], // Regular
});

export default function SuccessGuide() {
  return (
    <section className="w-full max-w-[1521px] min-h-[528px] bg-[#0A0A0A] mx-auto flex flex-col md:flex-row md:items-center gap-6 p-4">
      {/* Left Section - Text + Form */}
      <div className="flex-1 flex flex-col gap-10 p-4 w-full md:max-w-[544px] min-h-[400px] md:ml-8 order-2 md:order-1">
        {/* Heading */}
        <h3
          className={`${montserrat.className} font-extrabold text-[20px] leading-[28px] text-[#F1F1F1]`}
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
              className={`${dmSans.className} text-[16px] leading-[20px] text-[#F1F1F1] font-normal flex gap-2`}
            >
              <span className="text-[#F9FAFB]">•</span> {item}
            </li>
          ))}
        </ul>

        {/* Email Form */}
<div className="flex flex-nowrap gap-1 w-full max-w-[512px] mt-2">
  <input
    type="email"
    placeholder="Enter your email address"
    className="flex-1 h-[52px] rounded-[8px] px-3 py-2 text-sm text-black border border-[#F97C04] focus:outline-none"
  />
  <button className="bg-[#F97C04] h-[52px] px-6 rounded-[8px] text-black font-semibold">
    Submit
  </button>
</div>

      </div>

      {/* Right Section - Grey Box */}
      <div className="flex-1 flex justify-center p-4 mb-[16px] order-1 md:order-2">
        <div className="w-full max-w-[512px] h-auto aspect-[16/10] bg-[#394050]" />
      </div>
    </section>
  );
}


