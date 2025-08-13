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
        <h2 className="font-Montserrat text-[#004644] leading-[1.2] text-[24px] md:text-[29px] font-extrabold text-center mt-[24px]">
          Why Building Bharat Is Different
        </h2>
      </div>

      {/* Subtitle */}
      <div className="px-4 mt-2">
        <p className="font-DMsans text-[14px] md:text-[16px] flex justify-center items-center text-center text-[#0A0A0A] max-w-[800px] mx-auto mt-[16px]">
          India's most future-focused Political Consultancy and Public Policy
          platform — where real learning meets real opportunity.
        </p>
      </div>

      {/* Section 1 */}
      <section className="w-full max-w-[1312px] mx-auto px-4 md:px-8 py-6 md:py-8 grid md:grid-cols-2 gap-8 md:gap-[32px] items-center">
        <div className="text-center md:text-left">
          <h2 className="font-Montserrat font-extrabold text-[18px] md:text-[20px] leading-[1.4] text-[#0A0A0A]">
            Live Sessions with Nation-Builders
          </h2>
          <p className="font-DMsans text-[14px] md:text-[16px] leading-[1.5] text-[#0A0A0A] max-w-[484px] mx-auto md:mx-0 mt-3">
            Learn directly from policy experts, former MPs, senior bureaucrats,
            and top political consultants in weekly live sessions, interactive
            workshops, and real-world simulations.
          </p>
          <ul className="list-disc pl-8 mt-4 space-y-2 mx-auto md:mx-0 text-left">
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Weekly sessions with industry leaders
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Live Q&As with former parliamentarians
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Hands-on policy scenario workshops
            </li>
          </ul>
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src="/images/left.png"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[780px] h-auto object-contain rounded-lg"
            alt="Live Sessions"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full max-w-[1312px] mx-auto px-4 md:px-8 py-6 md:py-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-none flex justify-center mt-2 md:mt-0">
          <img
            src="/images/left1.png"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[600px] h-auto object-contain rounded-lg mt-8"
            alt="Internships"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-Montserrat font-extrabold text-[18px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-4 -mt-6">
            Internships & Jobs That Matter
          </h2>
          <p className="font-DMsans text-[14px] md:text-[16px] leading-[1.5] max-w-[484px] mx-auto md:mx-0 mb-6">
            Step into the field with guaranteed opportunities after course
            completion — through our network of 50+ partners across political
            offices, think tanks, and advocacy groups.
          </p>
          <ul className="list-disc pl-8 mt-4 space-y-2 mx-auto md:mx-0 text-left">
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Internships at MLAs', MPs', and policy organizations
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Direct placement support
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Access to exclusive networking events
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full max-w-[1312px] mx-auto px-4 md:px-8 py-6 md:py-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="font-Montserrat font-extrabold text-[18px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-4">
            Build a Standout Portfolio
          </h2>
          <p className="font-DMsans text-[14px] md:text-[16px] leading-[1.5] max-w-[484px] mx-auto md:mx-0 mb-6">
            Learn directly from policy experts, former MPs, senior bureaucrats,
            and top political consultants in weekly live sessions, interactive
            workshops, and real-world simulations.
          </p>
          <ul className="list-disc pl-8 mt-4 space-y-2 mx-auto md:mx-0 text-left">
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Applied research & consulting projects
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Governance-focused hackathons
            </li>
            <li className="font-DMsans text-[14px] md:text-[16px]">
              Opportunities to publish policy insights
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/left2.png"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[600px] h-auto object-contain rounded-lg"
            alt="Portfolio"
          />
        </div>
      </section>

      {/* Section 4 */}
      <section className="w-full max-w-[1312px] mx-auto px-4 md:px-8 py-6 md:py-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-none flex justify-center">
          <img
            src="/images/left3.png"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[600px] h-auto object-contain rounded-lg"
            alt="Interview"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-Montserrat font-extrabold text-[18px] md:text-[20px] leading-[1.4] text-[#0A0A0A] mb-4">
            Ace the Interview, Land the Role
          </h2>
          <p className="font-DMsans text-[14px] md:text-[16px] leading-[1.5] max-w-[484px] mx-auto md:mx-0 mb-6">
            Get hands-on prep with mock interviews and 1000+ real interview
            questions used by top consulting firms and policy institutions.
          </p>
          <ul className="list-disc pl-8 mt-4 space-y-2 mx-auto md:mx-0 text-left">
            <li className="font-DMsans font-weight:400 text-[14px] md:text-[16px]">
              Weekly mock interview sessions
            </li>
            <li className="font-DMsans font-weight:400 text-[14px] md:text-[16px]">
              Curated question banks
            </li>
            <li className="font-DMsans font-weight:400 text-[14px] md:text-[16px]">
              Personalized feedback and growth plans
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
