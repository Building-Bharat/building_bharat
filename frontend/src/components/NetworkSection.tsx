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

// List of logos
const logosRow1 = [
  "/images/indfound.png",
  "/images/cpr.png",
  "/images/nitiayog.png",
  "/images/vidhi.png",
  "/images/orf.png",
];

const logosRow2 = [
  "/images/ipac.png",
  "/images/jansuraj.png",
  "/images/filings.png",
  "/images/prs.png",
  "/images/mukherjee.png",
  "/images/gandhi.png",
];

const logosBehind = [
  "/images/book.png",
  "/images/jarvis.png",
  "/images/teach.png",
  "/images/varahe.png",
  "/images/showtime.png",
];

const buildingBharatLogo = "/images/bharat.png";

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

      {/* Logos Section */}
      <div className="mt-12 w-full flex flex-col gap-8 relative overflow-hidden">
        {/* Row 1 */}
        <div className="flex gap-[64px] animate-marquee whitespace-nowrap">
          {[...logosRow1, ...logosRow1].map((logo, idx) => (
            <div key={idx} className="inline-block flex-shrink-0">
              <Image src={logo} alt={`Logo ${idx}`} width={120} height={60} />
            </div>
          ))}
        </div>

        {/* Center Logo with row behind */}
        <div className="relative flex justify-center mt-4">
          {/* Row Behind */}
          <div className="absolute inset-0 flex gap-[16px] animate-marquee opacity-30">
            {[...logosBehind, ...logosBehind].map((logo, idx) => (
              <div key={idx} className="inline-block flex-shrink-0">
                <Image
                  src={logo}
                  alt={`Logo Behind ${idx}`}
                  width={120}
                  height={60}
                />
              </div>
            ))}
          </div>

          {/* Building Bharat Logo */}
          <Image
            src={buildingBharatLogo}
            alt="Building Bharat"
            width={160}
            height={80}
            className="relative z-10"
          />
        </div>

        {/* Row 2 */}
        <div className="flex gap-[16px] animate-marquee-reverse whitespace-nowrap mt-4">
          {[...logosRow2, ...logosRow2].map((logo, idx) => (
            <div key={idx} className="inline-block flex-shrink-0">
              <Image src={logo} alt={`Logo ${idx}`} width={120} height={60} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
