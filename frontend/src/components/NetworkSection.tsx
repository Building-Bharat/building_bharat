import Image from "next/image";
import { Montserrat, DM_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"], // ExtraBold
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], // Regular
});

export default function LearnersSection() {
  return (
    <section className="bg-white py-12 flex flex-col items-center">
      {/* Heading */}
      <h2
        className={`${montserrat.className} text-[32px] font-extrabold leading-[38px] text-[#005451] text-center max-w-[1279px]`}
      >
        Our Learners Are Powering Governance & Campaigns Nationwide
      </h2>

      {/* Paragraph */}
      <p
        className={`${dmSans.className} mt-[32px] text-[16px] font-normal leading-[20px] text-[#0A0A0A] text-center max-w-[1279px] px-4`}
      >
        With top peers, field mentors, and live political projects, they now
        work in government offices, think tanks, and leading political
        consultancies.
      </p>

      {/* Desktop Image */}
      <div className="mt-8 hidden md:flex justify-center w-full">
        <div className="relative w-[1279px] h-[531px]">
          <Image
            src="/images/learners-network-desktop.png"
            alt="Learners Network Desktop"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="mt-8 flex md:hidden justify-center w-full">
        <div className="relative w-[440px] h-[531px]">
          <Image
            src="/images/learners-network-mobile.png"
            alt="Learners Network Mobile"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}


