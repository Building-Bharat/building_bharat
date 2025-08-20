import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const initiatives = [
  {
    title: "College Students",
    description:
      "For students aspiring to lead in politics, governance, and public service.",
    image: "/icons/college.png",
  },
  {
    title: "Emerging Professionals",
    description:
      "For professionals entering or transitioning into politics, public policy, and governance.",
    image: "/icons/college.png",
  },
  {
    title: "Ex-UPSC Students",
    description:
      "For ex-upsc minds turning preparation into purpose through careers in policy and governance.",
    image: "/icons/college.png",
  },
  {
    title: "Policy Enthusiasts",
    description:
      "For those driven by public service and passionate about creating real social change.",
    image: "/icons/college.png",
  },
];

export default function InitiativeSection() {
  return (
    <section className="bg-gray-200 w-full max-w-[1520px] mx-auto px-4 sm:px-8 md:px-10 lg:px-20 py-8 sm:py-12 md:py-[64px]">
      <div className="w-full max-w-[1312px] mx-auto text-center rounded-2xl">
        <h2 className="font-[Montserrat] font-extrabold text-[18px] mt-[4px] sm:text-[32px] text-[#004644] leading-[28px] sm:leading-[36px] md:leading-[48px]">
          Who Is This Initiative For?
        </h2>
        <p
          className={`${dmSans.className} mt-3 sm:mt-4 text-gray-600 text-[14px] sm:text-[16px] md:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[24px] text-[#0A0A0A]`}
        >
          Perfect for aspirants from all backgrounds
        </p>

        <div className="mt-3 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 justify-items-center">
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-[264px] sm:max-w-[164px] md:max-w-[304px] opacity-100 rounded-[8px] sm:rounded-[16px] bg-[#F1F1F1] p-4 flex flex-col items-center gap-4 mt-[56px] cursor-pointer flex-shrink-0"
            >
              <div className="w-[64px] h-[64px] sm:w-[64px] sm:h-[64px] shadow-[0_4px_4px_0_rgba(150,150,150,0.3)] flex items-center justify-center bg-[#F1F1F1] rounded-full -mt-12 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={25}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="font-Montserrat text-[13px] sm:text-[14px] md:text-[15px] font-bold font-weight:700 text-[#005451] text-center px-2 mt-[4px]">
                {item.title}
              </h3>
              <p
                className={`${dmSans.className} leading-[20px] font-weight:400 sm:leading-[20px] text-[#0A0A0A] mt-1 text-[14px] md:text-[16px] flex-grow flex items-center justify-center text-center px-2 break-words`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

