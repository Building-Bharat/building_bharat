import Image from "next/image";

export default function NetworkSection() {
  const pattern = [
    ["black", "white", "black", "black", "white", "black", "white"], // Row 1
    ["white", "black", "white", "logo-merged", "white", "black", "white"], // Row 2
    ["white", "black", "white", "skip", "white", "black", "white"], // Row 3
    ["black", "white", "black", "black", "white", "black", "white"], // Row 4
  ];

  return (
    <section className="bg-[#EAEAEA] py-12 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-8 px-4 max-w-[1312px] mx-auto">
        <h2 className="font-black leading-[14px] tracking-[0] font-extrabold text-[16px] font-Montserrat text-[#005451] mb-[32px]">
          Our Network Of Influence
        </h2>

        <p className="mt-2 text-[13px] font-DMsans leading-[12px] tracking-[0] mx-auto">
          We’re proud to work with a trusted network of political leaders,
          institutions, and policy organizations — connecting you to the people
          and places where change happens.
        </p>
      </div>

      {/* Grid wrapper with clipped edges */}
      <div className="mx-auto overflow-hidden px-4 sm:px-6 md:px-8">
        <div
          className="grid justify-center"
          style={{
            gridTemplateColumns: "repeat(7, minmax(100px, 200px))",
            gridAutoRows: "76px",
            gap: "32px",
          }}
        >
          {pattern.flat().map((type, i) => {
            if (type === "skip") return null;

            return (
              <div
                key={i}
                className="flex items-center justify-center border border-[#1A1A1A] rounded-[8px]"
                style={{
                  backgroundColor:
                    type === "black"
                      ? "#000"
                      : type === "white"
                      ? "#F1F1F1"
                      : "transparent",
                  gridRow: type === "logo-merged" ? "span 2" : "auto",
                  height: type === "logo-merged" ? "200px" : undefined,
                }}
              >
                <div className="flex justify-center items-center">
                {type === "logo-merged" && (
                  <Image
                    src="/icons/logomid.png"
                    alt="Building Bharat"
                    width={200}
                    height={200}
                    className="object-contain  shadow-none border-none"
                    priority
                  />
                )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
