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
      <div className="mt-12 w-full flex flex-col gap-8 relative">
        {/* Row 1 */}
        <div className=" w-full">
          <div className="animate-marquee">
            {[...logosRow1, ...logosRow1].map((logo, idx) => (
              <div
                key={idx}
                className="inline-flex border border-[#9EA2AE] items-center justify-center flex-shrink-0 bg-white rounded-lg shadow-sm w-auto h-auto p-2 mx-8"
              >
                <Image
                  src={logo}
                  alt={`Logo ${idx}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Logo with row behind */}
        <div className="relative flex justify-center mt-4">
          {/* Row Behind */}
          <div className="absolute inset-0 flex gap-[16px] animate-marquee opacity-100">
            {[...logosBehind, ...logosBehind].map((logo, idx) => (
              <div
                key={idx}
                className="inline-flex items-center border border-[#9EA2AE] justify-center flex-shrink-0 bg-white rounded-lg shadow-sm w-auto h-auto p-2"
              >
                <Image
                  src={logo}
                  alt={`Logo Behind ${idx}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Building Bharat Logo */}
          <div className="bg-white border border-[#9EA2AE] rounded-xl shadow-md relative z-10 w-[180px] h-[100px] flex items-center justify-center p-3">
            <Image
              src={buildingBharatLogo}
              alt="Building Bharat"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className=" w-full mt-4">
          <div className="animate-marquee-reverse">
            {[...logosRow2, ...logosRow2].map((logo, idx) => (
              <div
                key={idx}
                className="inline-flex items-center border border-[#9EA2AE] justify-center flex-shrink-0 bg-white rounded-lg shadow-sm w-auto h-auto p-2 mx-4"
              >
                <Image
                  src={logo}
                  alt={`Logo ${idx}`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
