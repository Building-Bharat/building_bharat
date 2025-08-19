"use client";

import Image from "next/image";
import { Montserrat, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"], // ExtraBold
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], // Regular
});


const container = {
  hidden: { opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // logos appear one by one
    },
  },
};


const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Logos
const logosRow1 = [
  "/images/indfound.png",
  "/images/cpr.png",
  "/images/nitiayog.png",
  "/images/vidhi.png",
  "/images/orf.png",
  "/images/ipac.png",
  "/images/jansuraj.png",
  "/images/filings.png",
  "/images/prs.png",
];

const logosRow2 = [
  "/images/ipac.png",
  "/images/jansuraj.png",
  "/images/filings.png",
  "/images/prs.png",
  "/images/mukherjee.png",
  "/images/gandhi.png",
  "/images/indfound.png",
  "/images/cpr.png",
  "/images/nitiayog.png",
  "/images/vidhi.png",
];

const logosBehind = [
  "/images/book.png",
  "/images/jarvis.png",
  "/images/teach.png",
  "/images/varahe.png",
  "/images/showtime.png",
  "/images/indfound.png",
  "/images/cpr.png",
  "/images/nitiayog.png",
  "/images/vidhi.png",
];

const buildingBharatLogo = "/images/bharat.png";

export default function LearnersSection() {
  return (
    <section className=" py-12 flex flex-col items-center bg-[#E5E7EA]">
      {/* Heading */}
      <h2
        className={`${montserrat.className} text-[16px] sm:text-[32px] font-extrabold leading-[24px] sm:leading-[38px] text-[#005451] text-center max-w-[1279px]`}
      >
        Our Learners Are Powering Governance & Campaigns Nationwide
      </h2>

      {/* Paragraph */}
      <p
        className={`${dmSans.className} mt-[10px] sm:mt-[32px] text-[14px] sm:text-[16px] font-normal leading-[20px] text-[#0A0A0A] text-center max-w-[1279px] px-4`}
      >
       With top peers, field mentors, and live political projects, they now work in government offices, think tanks, and leading political consultancies.
      </p>

      {/* Logos Section */}
      <div className="mt-12 w-full flex flex-col gap-8 relative">
        {/* Row 1 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {logosRow1.map((logo, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="inline-flex border border-[#9EA2AE] items-center justify-center bg-white rounded-lg shadow-sm p-2"
            >
              <Image
                src={logo}
                alt={`Logo ${idx}`}
                width={0} // let CSS handle sizing
                height={0}
                sizes="100vw"
                className="object-contain w-20 h-10 sm:w-28 sm:h-14 md:w-32 md:h-16"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Center Logo with row behind */}
        <div className="relative flex justify-center mt-4">
          {/* Behind row animates first */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-10 absolute inset-0 justify-center hidden sm:flex md:flex "
          >
            {logosBehind.map((logo, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="inline-flex items-center  justify-center bg-[#E5E7EA] rounded-lg shadow-sm p-2"
              >
                <Image
                  src={logo}
                  alt={`Logo Behind ${idx}`}
                  width={120}
                  height={100}
                  className="object-contain sm:hidden"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bharat Logo comes last */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: logosBehind.length * 0.25 }}
            viewport={{ once: true }}
            className="bg-white border border-[#F97C04] rounded-xl shadow-md relative z-10 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] flex items-center justify-center p-3"
          >
            <Image
              src={buildingBharatLogo}
              alt="Building Bharat"
              width={0} // let CSS handle sizing
              height={0}
              sizes="100vw"
              className="object-contain w-[120px] h-[120px] sm:w-[200px] sm:h-[200px]"
            />
          </motion.div>
        </div>

        {/* Row 2 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mt-4"
        >
          {logosRow2.map((logo, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="inline-flex border border-[#9EA2AE] items-center justify-center bg-white rounded-lg shadow-sm p-2"
            >
              <Image
                src={logo}
                alt={`Logo ${idx}`}
                width={0} // let CSS handle sizing
                height={0}
                sizes="100vw"
                className="object-contain w-20 h-10 sm:w-28 sm:h-14 md:w-32 md:h-16"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
