import { NextPage } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { DM_Sans } from "next/font/google";
import CountUp from "react-countup";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const ImpactMatrix: NextPage = () => {
  return (
    <main
      className={`${montserrat.className} relative w-full bg-gradient-to-l from-[#001414] to-[#007a77] text-white overflow-hidden min-h-auto`}
    >
      {/* Background India Vector - Desktop only */}
      <div className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 hidden md:block max-w-[1440px] w-full z-0">
        <Image
          src="/images/indiaVector.png"
          alt="India Vector"
          width={1440}
          height={1637}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "1440px",
            opacity: 1.0, // Only the image is transparent
          }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16 flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[600px] w-full">
          <h2 className="text-[23px] font-extrabold leading-8 font-[Montserrat]">
            Building Bharat Till Date
          </h2>
          <p
            className={`${dmSans.className} text-[13px] leading-6 text-[#F1F1F1] font-DMsans`}
          >
            Our journey in shaping India’s political and policy landscape
          </p>
        </div>

        {/* Stats */}
        <div className="w-full max-w-[1312px] flex flex-wrap justify-center items-start gap-[34px] mt-[8px]">
          {[
            { end: 1000, label: "Students Trained" },
            { end: 200, label: "Successful Placements" },
            { end: 50, label: "Partner Organizations" },
            { end: 15, label: "Specialized Courses" },
          ].map(({ end, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-start text-center gap-1 w-[272px] sm:w-[200px] mr-[84px] font-[Montserrat]  "
            >
              <span className="font-heading font-black text-base text-[#F1F1F1]">
                <CountUp
                  end={end}
                  duration={15}
                  easingFn={(t, b, c, d) =>
                    c * (1 - Math.cos(((t / d) * Math.PI) / 2)) + b
                  }
                />
                +
              </span>
              <span
                className={`${dmSans.className} text-[13px] text-[#F1F1F1]`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div
          className="w-full max-w-[1312px]
    flex flex-col sm:flex-row
    flex-wrap
    justify-center items-stretch
    gap-4
    px-4 sm:px-6 lg:px-8"
        >
          {[
            {
              title: "Excellence in Education",
              text: "Recognized as India’s leading platform for political and policy education, with an industry-aligned curriculum designed for real-world impact.",
            },
            {
              title: "Strong Industry Network",
              text: "Backed by partnerships with leading think tanks, political offices, and governance institutions across India.",
            },
            {
              title: "Alumni Success",
              text: "Our alumni are driving change in Parliament, state governments, and top policy consulting roles nationwide.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`flex flex-col gap-4 p-6 border border-[#f1f1f1] rounded-[32px] shadow-[0px_4px_4px_rgba(150,150,150,0.3)] flex-1 cursor-pointer min-w-[100px] max-w-full ${dmSans.className}`}
            >
              <div className="relative w-[30px] h-[24px] mt-5 flex justify-start shrink-0">
                <Image
                  src="/images/Fellowship.png"
                  alt="Icon"
                  fill
                  sizes="(max-width: 768px) 30px, 30px"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col items-start gap-4 text-start mt-2">
                <h3 className="font-bold font-[Montserrat]">{card.title}</h3>
                <p className="leading-[24px] mt-8 font-DMsans font-weight:400 text-[#F1F1F1] text-[13px]">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ImpactMatrix;
