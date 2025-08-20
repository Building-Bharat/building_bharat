// app/bharatmatters/page.jsx
"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({ subsets: ["latin"] });

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function BharatMatters() {
  return (
    <main
      className={`${montserrat.className} bg-[#F1F1F1] text-[#001414] max-w-[1521px] mx-auto`}
    >
      {/* Heading */}
      <div className="gap-4 w-full max-w-[1480px] flex justify-center items-center px-4">
        <h2 className="font-Montserrat text-[#004644] leading-tight text-[18px] md:text-[32px] font-extrabold text-center mt-8 md:mt-14">
          Why Building Bharat Is Different!
        </h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 mt-2">
        <p className="font-DMsans text-[13px] sm:text-[14px] leading-[20px] flex justify-center items-center text-center text-[#0A0A0A] max-w-[800px] mx-auto mt-4">
          India&apos;s most future-focused Political Consultancy and Public Policy
          platform — where real learning meets real opportunity.
        </p>
      </div>

      {/* Section 1 */}
      <section className="w-full max-w-[1500px] mx-auto px-4 py-16 sm:py-6 grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex items-center justify-center order-1 md:order-2"
        >
          <img
            src="/images/left.png"
            className="w-full  max-w-[1100px] h-auto object-contain rounded-lg"
            alt="Live Sessions"
          />
        </motion.div>
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center md:text-left order-2 md:order-1"
        >
          <h2 className="font-Montserrat font-bold text-[16px]  md:text-[20px] leading-snug mx-4 text-[#0A0A0A]">
            Live Sessions by the best in their domain
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-relaxed text-[#0A0A0A] max-w-[650px] mx-auto md:mx-4 mt-4">
            Gain firsthand insight into how decisions are made, policies are shaped, and campaigns are led. These sessions help you think like a strategist, act like a policymaker, and grow into a leader.
          </p>
          <ul className="list-disc pl-6 mt-6 space-y-4 mx-auto md:mx-4 text-left">
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Weekly sessions with consultants and ex-IAS officers
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px] ">
              Live Q&As with former parliamentarians
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px]">
              War-room simulations, crisis drills & campaign strategy games
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className="w-full max-w-[1500px] mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="order-1 md:order-1 flex justify-center"
        >
          <img
            src="/images/left1.png"
            className="w-full max-w-[1100px] h-auto object-contain rounded-lg"
            alt="Internships"
          />
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center md:text-left order-2 md:order-2"
        >
          <h2 className="font-Montserrat font-bold text-[16px] md:text-[20px] leading-snug mx-4 text-[#0A0A0A] mb-4">
            Internships & Jobs That Matter
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-relaxed text-[#0A0A0A] max-w-[650px] mx-auto md:mx-4 mt-2">
            We&apos;re not just handing out certificates. Get mapped to high-trust roles in political consultancies and government offices through our curated hiring ecosystem.
          </p>
          <ul className="list-disc pl-6 mt-6 space-y-4 mx-auto md:mx-4 text-left">
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Partnered job pipelines with 15+ organizations and offices
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Internship & Jobs for top learners via our exclusive portal
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Post-course career support through alumni network & mentor connects
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Section 3 */}
      <section className="w-full max-w-[1500px] mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex items-center justify-center order-1 md:order-2"
        >
          <img
            src="/images/left2.png"
            className="w-full max-w-[1100px] h-auto object-contain rounded-lg"
            alt="Portfolio Projects"
          />
        </motion.div>
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center md:text-left order-2 md:order-1"
        >
          <h2 className="font-Montserrat font-bold text-[16px] md:text-[20px] mx-4 leading-snug text-[#0A0A0A] mb-4">
            Build What Actually Gets You Hired
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-relaxed text-[#0A0A0A] max-w-[650px] mx-auto md:mx-4 mt-2">
            Go beyond generic CV points. Turn every module into a resume-worthy milestone with assignments, and case studies that reflect real industry work.
          </p>
          <ul className="list-disc pl-6 mt-6 space-y-4 mx-auto md:mx-4 text-left">
            <li className="font-DMsans text-[13px] md:text-[16px]">
              10+ hands-on assignments across all modules
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px] ">
              Covers 20+ political and policy job roles
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Final Capstone project, and portfolio review
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Section 4 */}
      <section className="w-full max-w-[1500px] mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex items-center justify-center order-1 md:order-1"
        >
          <img
            src="/images/left3.png"
            className="w-full max-w-[1100px] h-auto object-contain rounded-lg"
            alt="Interview Preparation"
          />
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center md:text-left order-2 md:order-2"
        >
          <h2 className="font-Montserrat font-bold text-[16px] md:text-[20px] leading-snug text-[#0A0A0A] mb-4">
            Ace the Interview, Land the Role
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-relaxed text-[#0A0A0A] max-w-[650px] mx-auto md:mx-0 mt-2">
            Get hands-on prep with mock interviews and 1000+ real interview questions used by top consulting firms and policy institutions.
          </p>
          <ul className="list-disc pl-6 mt-6 space-y-4 mx-auto md:mx-0 text-left">
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Live resume & mock interview sessions
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px] ">
              Personalized weekly feedback from our mentors
            </li>
            <li className="font-DMsans text-[13px] md:text-[16px]">
              Live resume & mock interview sessions
            </li>
          </ul>
        </motion.div>
      </section>
    </main>
  );
}


