"use client";

import Image from "next/image";
import Header from "@/components/Header";
import HaveQuestionsLetsTalk from "@/components/HaveQuestionsLetsTalk";
import Footer from "@/components/CoontactUs";
import SuccessGuide from "@/components/successGuide";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import { useState } from "react";
import CTAButton from "@/components/CTAButton";
import "./style.css";

export default function CollegePage() {
  return (
    <main className="min-h-screen w-full bg-[#E5E7EA]">
      <Header />

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Mobile Layout */}
        <div className="block xl:hidden">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#E5E7EA] mb-8">
            <Image
              src="/images/child.png"
              alt="Students collaborating"
              width={560}
              height={560}
              className="h-auto w-full object-cover"
              priority
            />
            <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-full px-4">
              <div className="mx-auto w-full max-w-[340px] space-y-3">
                <FeatureCard
                  icon="/icons/book.png"
                  title="Expert-Led Workshop"
                  subtitle="Industry professionals"
                />
                <FeatureCard
                  icon="/images/assignment.png"
                  title="Real-World Projects"
                  subtitle="Hands-on policy challenges"
                />
                <FeatureCard
                  icon="/images/Network.png"
                  title="Networking Opportunities"
                  subtitle="Peers, alumni, and leaders"
                />
              </div>
            </div>
          </div>
          <div className="text-center px-4">
            <h1 className="text-xl font-bold tracking-tight text-[#005451] sm:text-3xl">
              Colleges Partnering for Change
            </h1>
            <p className="mt-6 text-sm leading-6 text-[#0A0A0A] sm:text-base sm:leading-7">
              Partner with Building Bharat to bring political education,
              real-world projects, and career-ready skills to your campus.
              Together, we prepare students to lead in governance, policy, and
              public service.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl">
                  10+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Partner Colleges
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl">
                  100+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Internships Secured
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl">
                  500+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Students Trained
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl">
                  95%
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden xl:grid grid-cols-2 items-center md:gap-12 lg:gap-20 xl:gap-24">
          <div className="md:-ml-6 lg:-ml-12 xl:-ml-20">
            <h1 className="text-2xl font-bold tracking-tight text-[#005451] sm:text-3xl md:text-4xl lg:text-4xl">
              Colleges Partnering for Change
            </h1>
            <p className="mt-8 md:mt-12 max-w-xl text-xs leading-5 text-[#0A0A0A] sm:text-sm sm:leading-6 md:text-base">
              Partner with Building Bharat to bring political education,
              real-world projects, and career-ready skills to your campus.
              Together, we prepare students to lead in governance, policy, and
              public service.
            </p>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl md:text-3xl">
                  10+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Partner Colleges
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl md:text-3xl">
                  100+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Internships Secured
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl md:text-3xl">
                  500+
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Students Trained
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#005451] sm:text-2xl md:text-3xl">
                  95%
                </div>
                <div className="mt-1 text-xs text-[#0A0A0A] sm:text-sm">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative ml-auto w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden rounded-2xl bg-[#E5E7EA]">
              <Image
                src="/images/child.png"
                alt="Students collaborating"
                width={560}
                height={560}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div
              className="pointer-events-none absolute md:top-[70%] lg:top-[75%] xl:top-[80%] -translate-y-1/2"
              style={{ right: "0px" }}
            >
              <div className="pointer-events-auto w-[300px] md:w-[320px] lg:w-[340px] xl:w-[400px] space-y-4 md:space-y-5 lg:space-y-6">
                <FeatureCard
                  icon="/icons/book.png"
                  title="Expert-Led Workshop"
                  subtitle="Industry professionals"
                />
                <FeatureCard
                  icon="/images/assignment.png"
                  title="Real-World Projects"
                  subtitle="Hands-on policy challenges"
                />
                <FeatureCard
                  icon="/images/Network.png"
                  title="Networking Opportunities"
                  subtitle="Peers, alumni, and leaders"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <PartnerInstitutionsSection />
      <BenefitsSection />
      <LegacySection />
      <EarlyBirdOfferSection />
      <FrequentQuestions />
      <CollegeContactSection />
      <SuccessGuideSection />
      <FooterSection />
    </main>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  subtitle: string;
};

function FeatureCard({ icon, title, subtitle }: FeatureCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 shadow-lg ring-1 ring-black/5 h-[72px] w-[300px] sm:h-[76px] sm:w-[320px] md:h-[80px] md:w-[320px] lg:h-[80px] lg:w-[340px] xl:h-[80px] xl:w-[400px]">
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[#005451] sm:h-10 sm:w-10">
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          className="sm:w-5 sm:h-5"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-[#0F172A] sm:text-sm">
          {title}
        </div>
        <div className="text-xs text-[#6B7280]">{subtitle}</div>
      </div>
    </div>
  );
}

export function CollegeContactSection() {
  return <HaveQuestionsLetsTalk />;
}
export function FooterSection() {
  return <Footer />;
}

export function SuccessGuideSection() {
  return <SuccessGuide />;
}

export function FrequentQuestions() {
  return <FrequentlyAskedQuestions />;
}

function PartnerInstitutionsSection() {
  const partners: { name: string; image: string }[] = [
    { name: "Banaras Hindu University", image: "/images/images (2).jpeg" },
    {
      name: "National Institue of Technology,Haldia",
      image: "/images/1.jpeg",
    },
    { name: "KL UNIVERSITY", image: "/images/2.jpeg" },
    {
      name: "Indian Institute of Technology,Kharagpur",
      image: "/images/3.jpeg",
    },
    { name: "Vidyavardhaka College of Engineering", image: "/images/4.jpeg" },
    {
      name: "National Institue of Technology,Jamshedpur",
      image: "/images/5.jpeg",
    },
    {
      name: "University Institute of Technology,Burdwan",
      image: "/images/6.jpeg",
    },
    {
      name: "National Institue of Technology,SILCHAR",
      image: "/images/10.jpeg",
    },
  ];

  const fallback = "/images/BuildingBharat.jpg";

  return (
    <section className="w-full bg-[#E5E7EA] py-12 md:py-16 lg:py-20">
      <div className="partners-container">
        {/* Heading */}
        <h2 className="text-center text-xl font-black text-[#005451] sm:text-2xl md:text-3xl">
          Our <span className="text-[#005451]"> Partner Institution</span>
        </h2>

        {/* Paragraph with 32px gap below heading */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-[#0a0a0a] sm:text-sm md:text-base">
          We collaborate with leading colleges and universities across India,
          building pathways that connect academic learning with real-world
          opportunities in politics, policy, and governance.
        </p>

        {/* Grid with 64px gap above */}
        <div className="relative mt-16">
          <div className="grid [grid-template-columns:repeat(1,_285px)] sm:[grid-template-columns:repeat(2,_285px)] md:[grid-template-columns:repeat(2,_285px)] lg:[grid-template-columns:repeat(3,_285px)] xl:[grid-template-columns:repeat(4,_285px)] justify-center gap-x-8 gap-y-16">
            {partners.map((p) => (
              <div key={p.name} className="text-center">
                <div className="rounded-xl shadow-sm">
                  {/* Image container with specific width and height */}
                  <div className="relative overflow-hidden rounded-xl flex items-center justify-center w-[285px] h-[158px]">
                    <Image
                      src={p.image || fallback}
                      alt={p.name}
                      fill
                      sizes="285px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#0F172A] sm:text-sm md:text-sm lg:text-base">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const studentBenefits = [
    {
      label: "Resume & SOP Support",
      detail:
        "Get expert help in creating strong resumes and impactful statements of purpose tailored for political careers.",
    },
    {
      label: "Practical Exposure",
      detail:
        "Engage in live projects, case studies, and real-time policy analysis for hands-on learning.",
    },
    {
      label: "Internship & Job Opportunities",
      detail:
        "Access direct openings with MPs/MLAs, think tanks, consultancies, and other policy-related organizations.",
    },
    {
      label: "Guided Mentorship",
      detail:
        "Personalized guidance from experienced industry leaders and political professionals.",
    },
    {
      label: "24/7 Academic & Career Support",
      detail:
        "Dedicated assistance for all your academic queries and career-related concerns.",
    },
  ];

  const collegeBenefits = [
    {
      label: "Stronger Placement Outcomes",
      detail:
        "Enhanced placement support with students securing roles in government and policy organizations.",
    },
    {
      label: "Recognition & Accreditation",
      detail:
        "Establish your institution as a recognized leader in political education and policy studies.",
    },
    {
      label: "Industry Networking",
      detail:
        "Connect with a wide network of policy experts, government representatives, and political professionals.",
    },
    {
      label: "Curriculum Enrichment",
      detail:
        "Add practical, real-world policy education modules to your existing academic programs.",
    },
    {
      label: "End-to-End Support",
      detail:
        "Full implementation support, training materials, and continuous program management.",
    },
  ];

  const [openItem, setOpenItem] = useState<string | null>(null);

  const Item = ({
    label,
    detail,
    dark,
    id,
  }: {
    label: string;
    detail: string;
    dark?: boolean;
    id: string;
  }) => {
    const isOpen = openItem === id;

    return (
      <div
        className={`rounded-lg border ${
          dark ? "bg-white border-white/20" : "bg-white border-[#E5E7EB]"
        }`}
      >
        <div
          className="flex items-center justify-between px-4 sm:px-5 cursor-pointer min-h-[64px]"
          onClick={() => setOpenItem(isOpen ? null : id)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`grid h-6 w-6 place-items-center rounded-md sm:h-8 sm:w-8 ${
                dark ? "bg-white/10" : "bg-[#ECFDF5]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3 w-3 sm:h-4 sm:w-4"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <span
              className={`text-xs font-semibold sm:text-sm ${
                dark ? "text-black" : "text-[#0F172A]"
              }`}
            >
              {label}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`h-3 w-3 sm:h-4 sm:w-4 transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {isOpen && (
          <div className="px-4 pb-3 text-xs text-gray-600 sm:text-sm">
            {detail}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="w-full bg-[#E5E7EA] py-8 sm:py-12 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-2 md:px-4 lg:px-8">
        <h2 className="text-center text-lg font-black text-[#0F766E] sm:text-xl md:text-2xl lg:text-3xl">
          Benefits for Everyone
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-[#4B5563] sm:text-sm md:text-base">
          Our programs are designed to create impact across every level — giving
          students the skills and opportunities to succeed, while helping
          colleges strengthen their reputation, outcomes, and industry
          connections.
        </p>

        {/* Cards Container */}
        <div className="mt-16 flex w-full flex-col items-center gap-10 md:flex-row md:justify-center md:gap-6 lg:gap-4 xl:gap-44 2xl:gap-64">
          {/* Student Benefits */}
          <div className="w-full md:w-[356px] lg:w-[460px] xl:w-[560px] md:flex-none h-[500px] rounded-xl bg-[#394050] p-6 flex flex-col">
            <div className="text-center text-xs font-bold text-white sm:text-sm md:text-base">
              Benefits For Students
            </div>
            <div className="mt-4 space-y-3 flex-1 overflow-y-auto">
              {studentBenefits.map((b, i) => (
                <Item
                  key={b.label}
                  id={`student-${i}`}
                  label={b.label}
                  detail={b.detail}
                  dark
                />
              ))}
            </div>
          </div>

          {/* College Benefits */}
          <div className="w-full md:w-[356px] lg:w-[460px] xl:w-[560px] md:flex-none h-[500px] rounded-xl border border-[#838589] bg-[#e5e7ea] p-6 flex flex-col">
            <div className="text-center text-xs font-bold text-[#0A0a0a] sm:text-sm md:text-base">
              Benefits For Colleges
            </div>
            <div className="mt-4 space-y-3 flex-1 overflow-y-auto">
              {collegeBenefits.map((b, i) => (
                <Item
                  key={b.label}
                  id={`college-${i}`}
                  label={b.label}
                  detail={b.detail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegacySection() {
  return (
    <section className="w-full bg-[#ECEFF1] py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-20">
        {/* Text on left */}
        <div>
          <h3 className="text-xl font-black leading-snug text-[#005451] sm:text-2xl md:text-3xl">
            Powered by IIT Kharagpur
            <br /> Legacy
          </h3>
          <p className="mt-8 max-w-lg text-xs leading-5 text-[#0a0a0a] sm:text-sm sm:leading-6">
            Inspired by the Public Policy & Governance Society (PPGS),
            India&apos;s largest student-led body for policy and governance,
            with alumni in top think tanks, consulting firms, and legislative
            offices.
          </p>
          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 sm:max-w-md">
            <div>
              <div className="text-lg font-extrabold text-[#005451] sm:text-xl">
                12+
              </div>
              <div className="text-xs text-[#0a0a0a]">College Chapters</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#005451] sm:text-xl">
                500+
              </div>
              <div className="text-xs text-[#0a0a0a]">Alumni Network</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#005451] sm:text-xl">
                10+
              </div>
              <div className="text-xs text-[#0a0a0a]">Research Papers</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#005451] sm:text-xl">
                03
              </div>
              <div className="text-xs text-[#0a0a0a]">Years Legacy</div>
            </div>
          </div>
          <div className="mt-8">
            <CTAButton
              label="Apply Now"
              textColor="black"
              arrowColor="black"
              width={360}
              height={48}
            />
          </div>
        </div>

        {/* Image on right */}
        <div className="flex justify-center md:justify-end mt-6 md:mt-0 md:mr-0 lg:-mr-2">
          <div className="relative aspect-[4/3] w-full max-w-md md:max-w-lg overflow-hidden rounded-2xl ring-1 ring-black/5">
            <Image
              src="/images/student.png"
              alt="Students illustration"
              width={560}
              height={478}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EarlyBirdOfferSection() {
  const Card = () => (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm flex flex-col w-full sm:w-[320px] lg:w-[362px] lg:h-[460px]">
      <div className="rounded-lg bg-[#3A4451] w-full h-[180px] lg:h-[216px]" />

      <div className="mt-3 text-xs font-semibold text-[#0F172A] sm:text-sm">
        Course title
      </div>
      <p className="mt-2 text-xs leading-4 text-[#6B7280] sm:leading-5">
        Short body text about the course, a brief description.
      </p>

      <div style={{ marginTop: 100 }}>
        {" "}
        {/* Change 20 to whatever gap you want */}
        <CTAButton
          label="View Course Details"
          height={48}
          width={"100%"}
          borderRadius={8}
          fontWeight={700}
          textColor="#0A0A0A"
          fontSize={16}
          keepFixedSizeOnHover={true}
          arrowColor="text-black"
          disableBorderRadiusChange={true}
        />
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#ECEFF1] py-12 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-8">
        <h3 className="text-center text-xl font-black text-[#0F766E] sm:text-2xl md:text-3xl">
          Special Early Bird Offer Ends In
        </h3>
        <div className="mt-8 text-center text-sm font-semibold tracking-wide text-[#0F172A] sm:text-base md:text-lg">
          9 Hours 52 Minutes 40 Seconds
        </div>

        <div className="mt-16 px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-12 sm:gap-y-12 sm:gap-x-8 lg:gap-y-16 lg:gap-x-16 xl:gap-y-48 xl:gap-x-64 justify-items-center">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}
