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
      <div className="gap-4 w-full max-w-[1480px] h-auto flex justify-center items-center px-4 sm:px-6 md:px-8">
        <h2 className="font-Montserrat text-[#004644] leading-[1.2] text-xl sm:text-2xl md:text-[29px] font-extrabold text-center mt-4 sm:mt-6 md:mt-[24px] px-2">
          Why Building Bharat Is Different
        </h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 sm:px-6 md:px-8 mt-2 sm:mt-4">
        <p className="font-DMsans text-sm sm:text-base md:text-[16px] flex justify-center items-center text-center text-[#0A0A0A] max-w-[800px] mx-auto mt-4 sm:mt-6 md:mt-[16px] px-2">
          India's most future-focused Political Consultancy and Public Policy
          platform — where real learning meets real opportunity.
        </p>
      </div>

      {/* Section 1 */}
      <section className="w-full max-w-[1150px] mx-auto px-4 md:px-3 py-4 md:py-6 grid md:grid-cols-2 gap-1 md:gap-[16px] items-center">
        <div className="text-center md:text-left mb-[74px] order-2 sm:order-1">
          <h2 className="font-Montserrat font-extrabold sm:font-semibold font-weight:600 text-[14px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-[16px]">
            Live Sessions by the best in their domain
          </h2>
          <p className="font-DMsans text-xs sm:text-sm md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-3 sm:mt-4 md:mt-6 px-2">
           Gain firsthand insight into how decisions are made, policies are shaped, and campaigns are led. These sessions help you think like a strategist, act like a policymaker, and grow into a leader.
          </p>
          <ul className="list-disc pl-6 sm:pl-8 mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 md:space-y-6 mx-auto md:mx-0 text-left px-2">
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
             Weekly sessions with consultants and ex-IAS officers
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
            Live Q&As with former parliamentarians 
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
              War-room simulations, crisis drills & campaign strategy games
            </li>
          </ul>
        </div>
        <div className="w-full flex items-center justify-center order-1 sm:order-2">
          <img
            src="/images/left.png"
            className="w-full max-w-[424px] h-auto max-h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Live Sessions"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full max-w-[1312px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-[32px] items-center">
        <div className="order-1 sm:order-2 flex justify-center mt-4 sm:mt-6 md:mt-0">
          <img
            src="/images/left1.png"
            className="w-full max-w-[424px] h-auto max-h-[350px] object-contain rounded-lg lg:w-[544px] lg:h-[524.3077px] lg:p-4 sm:w-[424px] sm:h-[392.9231px] sm:p-2"
            alt="Internships"
          />
        </div>
        <div className="text-center md:text-left order-2 sm:order-1">
          <h2 className="font-Montserrat font-extrabold sm:font-semibold font-weight:600 text-sm sm:text-base md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-4 sm:mb-6 md:mb-[16px] px-2">
            Internships & Jobs That Matter
          </h2>
          <p className="font-DMsans text-xs sm:text-sm md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-3 sm:mt-4 md:mt-6 px-2">
            We're not just handing out certificates. Get mapped to high-trust roles in political consultancies and government offices through our curated hiring ecosystem.
          </p>
          <ul className="list-disc pl-6 sm:pl-8 mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 md:space-y-6 mx-auto md:mx-0 text-left px-2">
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
              Partnered job pipelines with 15+ organizations and offices
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
             Internship & Jobs for top learners via our exclusive portal
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
              Post-course career support through alumni network & mentor connects
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full max-w-[1150px] mx-auto px-4 md:px-3 py-4 md:py-6 grid md:grid-cols-2 gap-8 md:gap-[32px] items-center">
        <div className="text-center md:text-left mb-[74px] order-2 sm:order-1">
          <h2 className="font-Montserrat font-extrabold sm:font-semibold font-weight:600 text-[14px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-[16px]">
           Build What Actually Gets You Hired
          </h2>
          <p className="font-DMsans text-xs sm:text-sm md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-3 sm:mt-4 md:mt-6 px-2">
           Go beyond generic CV points. Turn every module into a resume-worthy milestone with assignments, and case studies that reflect real industry work
          </p>
          <ul className="list-disc pl-6 sm:pl-8 mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 md:space-y-6 mx-auto md:mx-0 text-left px-2">
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
            10+ hands-on assignments across all modules
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
            Covers 20+ political and policy job roles 
            </li>
            <li className="font-DMsans text-xs sm:text-sm md:text-[16px]">
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
          <h2 className="font-Montserrat font-extrabold sm:font-semibold font-weight:600 text-[14px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-[16px]">
          Ace the Interview, Land the Role
          </h2>
          <p className="font-DMsans text-[13px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-2 sm:mt-6">
           Get hands-on prep with mock interviews and 1000+ real interview questions used by top consulting firms and policy institutions.
          </p>
          <ul className="list-disc pl-8 mt-4 sm:mt-8 space-y-4 sm:space-y-6 mx-auto md:mx-0 text-left">
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
