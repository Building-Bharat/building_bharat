// components/InitiativeSection.tsx
import Image from "next/image";

const initiatives = [
  {
    title: "College Students",
    description:
      "For students aspiring to lead in politics, governance, and public service.",
    image:
      "https://res.cloudinary.com/dhyii4oiw/image/upload/v1754848401/college_cw5fmd.png",
  },
  {
    title: "Emerging Professionals",
    description:
      "For professionals entering or transitioning into politics, public policy, and governance.",
    image:
      "https://res.cloudinary.com/dhyii4oiw/image/upload/v1754848401/emerging_uavd3z.png",
  },
  {
    title: "Ex-UPSC Students",
    description:
      "For ex-upsc minds turning preparation into purpose through careers in policy and governance.",
    image:
      "https://res.cloudinary.com/dhyii4oiw/image/upload/v1754848401/upsc_drhmcr.png",
  },
  {
    title: "Policy Enthusiasts",
    description:
      "For those driven by public service and passionate about creating real social change.",
    image:
      "https://res.cloudinary.com/dhyii4oiw/image/upload/v1754848401/policy_y8qyqp.png",
  },
];

export default function InitiativeSection() {
  return (
    <section className="bg-gray-200 w-full max-w-[1520px] h-auto lg:h-[576px] mx-auto px-4 sm:px-8 md:px-[32px] py-8 sm:py-12 md:py-[64px]">
      <div className="w-full max-w-[1312px] mx-auto text-center rounded-2xl">
        <h2 className="w-full sm:text-3xl font-Montserrat font-extrabold text-[24px] sm:text-[29px] text-[#004644] leading-[32px] sm:leading-[48px] flex items-center justify-center">
          Who Is This Initiative For?
        </h2>
        <p className="mt-4 text-gray-600 font-DMsans text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#0A0A0A] flex items-center justify-center">
          Perfect for aspirants from all backgrounds
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="w-[90%] sm:w-[280px] rounded-[32px] shadow-[0px_0px_4px_0px_#1A1A1A40] p-6 flex flex-col items-center mt-[64px] bg-[#F1F1F1] cursor-pointer"
            >
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shadow-[0px_4px_4px_0px_#9696964D] flex items-center justify-center bg-[#F1F1F1] rounded-full -mt-12 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={25}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3 className="mt-6 font-Montserrat text-[12px] sm:text-[13px] font-extrabold cursor-pointer text-[#004644] w-full sm:w-[248px] text-center">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] sm:text-[16px] font-DMsans flex-grow flex items-center justify-center text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}