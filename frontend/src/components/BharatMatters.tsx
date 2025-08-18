// app/bharatmatters/page.jsx
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function BharatMatters() {
  return (
    <main
      className={`${montserrat.className} bg-white text-[#001414] max-w-[1521px] mx-auto`}
    >
      {/* Heading */}
      <div className="gap-4 w-full max-w-[1480px] h-auto flex justify-center items-center px-4">
        <h2 className="font-Montserrat text-[#004644] leading-[1.2] text-[18px] md:text-[32px] font-extrabold text-center mt-[24px]">
          Why Building Bharat Is Different!
        </h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 mt-2">
        <p className="font-DMsans text-[13px] sm:text-[14px] leading-[20px] font-weight:400 flex justify-center items-center text-center text-[#0A0A0A] max-w-[800px] mx-auto mt-[16px]">
          India's most future-focused Political Consultancy and Public Policy
          platform — where real learning meets real opportunity.
        </p>
      </div>

      {/* Section 1 */}
      <section className="w-full max-w-[1150px] mx-auto px-4 md:px-3 py-4 md:py-6 grid md:grid-cols-2 gap-1 md:gap-[16px] items-center">
        <div className="text-center md:text-left mb-[74px] order-2 sm:order-1">
          <h2 className="font-Montserrat font-bold sm:font-bold font-weight:700 text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] text-[#0A0A0A] mb-[16px]">
            Live Sessions by the best in their domain
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-2 sm:mt-6">
           Gain firsthand insight into how decisions are made, policies are shaped, and campaigns are led. These sessions help you think like a strategist, act like a policymaker, and grow into a leader.
          </p>
          <ul className="list-disc pl-6 mt-4 sm:mt-8 space-y-4 sm:space-y-6 mx-auto md:mx-0 text-left">
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
        </div>
        <div className="w-full flex items-center justify-center order-1 sm:order-2">
          <img
            src="/images/left.png"
            className="w-[544px] h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Live Sessions"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full max-w-[1312px] mx-auto px-3 md:px-3 py-2 md:py-2 grid md:grid-cols-2 gap-8 items-center ">
        <div className="order-1 sm:order-2 flex justify-center mt-2 md:mt-0">
          <img
            src="/images/left1.png"
            className="w-[544px] h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Internships"
          />
        </div>
        <div className="text-center md:text-left order-1 sm:order-2">
          <h2 className="font-Montserrat font-bold sm:font-bold font-weight:700 text-[16px] md:text-[20px] sm:leading-[28px] leading-[20px] text-[#0A0A0A] mb-[16px]">
            Internships & Jobs That Matter
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-2 sm:mt-6">
            We're not just handing out certificates. Get mapped to high-trust roles in political consultancies and government offices through our curated hiring ecosystem.
          </p>
          <ul className="list-disc pl-6 mt-4 sm:mt-8 space-y-4 sm:space-y-6 mx-auto md:mx-0 text-left">
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
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full max-w-[1150px] mx-auto px-4 md:px-3 py-4 md:py-6 grid md:grid-cols-2 gap-8 md:gap-[32px] items-center">
        <div className="text-center md:text-left mb-[74px] order-2 sm:order-1">
          <h2 className="font-Montserrat font-bold sm:font-bold font-weight:700 text-[16px] md:text-[20px] leading-[20px] sm:leading-[28px] text-[#0A0A0A] mb-[16px]">
           Build What Actually Gets You Hired
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-2 sm:mt-6">
           Go beyond generic CV points. Turn every module into a resume-worthy milestone with assignments, and case studies that reflect real industry work
          </p>
          <ul className="list-disc pl-6 mt-4 sm:mt-8 space-y-4 sm:space-y-6 mx-auto md:mx-0 text-left">
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
        </div>
        <div className="w-full flex items-center justify-center order-1 sm:order-2">
          <img
            src="/images/left2.png"
            className="w-[544px] h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Live Sessions"
          />
        </div>
      </section>

      {/* Section 4 */}
       <section className="w-full max-w-[1312px] mx-auto px-4 md:px-3 py-4 md:py-6 grid md:grid-cols-2 gap-8 md:gap-[32px] items-center">
        <div className="w-full flex items-center justify-center order-1 sm:order-1">
          <img
            src="/images/left3.png"
            className="w-[544px] h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Live Sessions"
          />
        </div>
        <div className="text-center md:text-left mb-[74px] order-2 sm:order-2">
          <h2 className="font-Montserrat font-bold sm:font-bold font-weight:700 text-[16px] md:text-[20px] leading-[20px] sm:leading-[28px] text-[#0A0A0A] mb-[16px]">
          Ace the Interview, Land the Role
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-2 sm:mt-6">
           Get hands-on prep with mock interviews and 1000+ real interview questions used by top consulting firms and policy institutions.
          </p>
          <ul className="list-disc pl-6 mt-4 sm:mt-8 space-y-4 sm:space-y-6 mx-auto md:mx-0 text-left">
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
        </div>
      </section>
    </main>
  );
}
