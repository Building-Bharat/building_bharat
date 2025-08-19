import { NextPage } from "next";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";



const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const CountUpDisplay = ({ end }: { end: number }) => {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // start only once
    threshold: 0.7,    // adjust visibility threshold
  });

  // Start counting when in view
  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  const count = useCountUp(startCount ? end : 0, 18000);

  return <span ref={ref}>{count}</span>;
};


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
          height={480}
          style={{ opacity: 0.8 }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 py-10 md:py-13 flex flex-col items-center gap-12 mb-[16px] sm:mb-[16px]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 max-w-[600px] w-full">
          <h2 className="text-[18px] sm:text-[32px] font-extrabold sm:font-extrabold leading-[24px] sm:leading-[38px] font-[Montserrat] text-[#F9FAFB] font-weight:800">
            Building Bharat Till Date
          </h2>
          <p
            className={`${dmSans.className} text-[13px] font-weight:400 sm sm:text-[16px]  leading-[20px] sm:leading-[20px] text-[#F9FAFB] font-DMsans`}
          >
            Our journey in shaping India&apos;s political and policy landscape
          </p>
        </div>

        {/* Stats */}
        <div className="w-full max-w-[1312px] flex flex-wrap items-center justify-center gap-x-[34px] sm:gap-x-[124px] gap-y-6 mt-[8px]">
          {[
            { end: 1000, label: "Students Trained" },
            { end: 200, label: "Successful Placements" },
            { end: 50, label: "Partner Organizations" },
            { end: 15, label: "Specialized Courses" },
          ].map(({ end, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center sm:items-center justify-center gap-1 w-[140px] sm:w-[200px] text-[20px] font-weight:600 font-[Montserrat]"
            >
              <span className="font-Montserrat font-weight:700 font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] text-[#F9FAFB]">
                <CountUpDisplay end={end} />+
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
        <div className="w-full max-w-[1312px] flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 px-2 sm:px-6  ">
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
              className="relative flex flex-col items-center w-[360px]"
            >
              {/* Icon above card */}
              <div className="absolute -top-10 w-[64px] h-[64px] sm:w-[64px] sm:h-[64px] p-2 bg-[#F1F1F1] rounded-full flex items-center justify-center z-10 mt-[32px] cursor-pointer">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={29}
                  height={24}
                  
                />
              </div>

              {/* Card body */}
              <div
                className={`mt-8 flex flex-col items-center text-center pt-[32px] pb-[32px] px-[16px] gap-4 w-[360px] h-[200px] border border-[#F1F1F1] rounded-[16px] bg-transparent ${dmSans.className}`}
              >
                <h3 className="font-bold font-DMsans font-weight:700 text-[#F1F1F1] text-[13px] sm:text-[16px] leading-[16px] sm:leading-[24px] mt-[12px]">
                  {card.title}
                </h3>
                <p className="text-[#F1F1F1] text-[13px] sm:text-[16px] leading-[20px] mt-[1px]">
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
