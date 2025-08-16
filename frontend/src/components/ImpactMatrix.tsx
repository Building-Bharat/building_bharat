import { NextPage } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { useState, useEffect } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return count;
};

const ImpactMatrix: NextPage = () => {
  return (
    <main
      className={`${montserrat.className} relative w-full bg-gradient-to-l from-[#001414] to-[#007a77] text-white overflow-hidden `}
    >
      {/* Background India Vector - Desktop */}
      <div className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 hidden md:block max-w-[1440px] w-full z-0">
        <Image
          src="/images/indiaVector.png"
          alt="India Vector"
          width={1440}
          height={1637}
          style={{ width: "100%", height: "auto", maxWidth: "1440px" }}
          priority
        />
      </div>

      {/* Background India Vector - Mobile */}
      <div className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 block md:hidden w-full z-0">
        <Image
          src="/images/indiaVectorSmall.png"
          alt="India Vector Small"
          width={500}
          height={800}
          style={{ width: "100%", height: "auto", opacity: 1.0 }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-12 md:py-16 flex flex-col items-center gap-12 mb-[16px] sm:mb-[16px]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[600px] w-full px-4">
          <h2 className="text-xl sm:text-2xl md:text-[23px] font-extrabold leading-7 sm:leading-8 font-[Montserrat]">
            Building Bharat Till Date
          </h2>
          <p
            className={`${dmSans.className} text-xs sm:text-sm md:text-[13px] leading-5 sm:leading-6 text-[#F1F1F1] font-DMsans px-2`}
          >
            Our journey in shaping India's political and policy landscape
          </p>
        </div>

        {/* Stats */}
        <div className="w-full max-w-[1312px] flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-[34px] md:gap-x-[124px] gap-y-4 sm:gap-y-6 mt-[8px] px-4">
          {[
            { end: 1000, label: "Students Trained" },
            { end: 200, label: "Successful Placements" },
            { end: 50, label: "Partner Organizations" },
            { end: 15, label: "Specialized Courses" },
          ].map(({ end, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center sm:items-center justify-center gap-1 w-[120px] sm:w-[140px] md:w-[200px] text-center"
            >
              <span className="font-heading font-black text-lg sm:text-xl md:text-base text-[#F1F1F1]">
                <CountUpDisplay end={end} />+
              </span>
              <span
                className={`${dmSans.className} text-xs sm:text-sm md:text-[13px] text-[#F1F1F1] text-center leading-tight`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="w-full max-w-[1312px] flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 px-4 sm:px-6">
          {[
            {
              icon: "/images/Fellowship.png",
              title: "Excellence in Education",
              text: "Recognized as India's leading platform for political and policy education, with an industry-aligned curriculum designed for real-world impact.",
            },
            {
              icon: "/images/Network.png",
              title: "Strong Industry Network",
              text: "Backed by partnerships with leading think tanks, political offices, and governance institutions across India.",
            },
            {
              icon: "/images/Alumni.png",
              title: "Alumni Success",
              text: "Our alumni are driving change in Parliament, state governments, and top policy consulting roles nationwide.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center w-full sm:w-[360px] max-w-[360px]"
            >
              {/* Icon above card */}
              <div className="absolute -top-6 sm:-top-8 w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] p-2 bg-[#F1F1F1] rounded-full shadow-[0px_4px_4px_rgba(150,150,150,0.3)] flex items-center justify-center z-10 mt-[24px] sm:mt-[32px]">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={29}
                  height={24}
                  className="object-contain w-5 h-5 sm:w-7 sm:h-6"
                />
              </div>

              {/* Card body */}
              <div
                className={`mt-6 sm:mt-8 flex flex-col items-center text-center pt-6 sm:pt-[32px] pb-6 sm:pb-[32px] px-4 sm:px-[16px] gap-3 sm:gap-4 w-full sm:w-[360px] h-auto sm:h-[200px] min-h-[180px] sm:min-h-[200px] border border-[#F1F1F1] rounded-[16px] shadow-[0px_4px_4px_rgba(150,150,150,0.3)] bg-transparent ${dmSans.className}`}
              >
                <h3 className="font-bold font-[Montserrat] text-[#FFFFFF] text-sm sm:text-base md:text-[16px] leading-[18px] sm:leading-[20px] mt-[20px] sm:mt-[25px]">
                  {card.title}
                </h3>
                <p className="text-[#F1F1F1] text-xs sm:text-sm md:text-[13px] leading-[18px] sm:leading-[20px] mt-2 sm:mt-[6px]">
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

// CountUpDisplay component using the custom hook
const CountUpDisplay = ({ end }: { end: number }) => {
  const count = useCountUp(end, 15000);
  return <span>{count}</span>;
};

export default ImpactMatrix;
