"use client";

import React from "react";
import CTAButton from "./CTAButton";

interface MentorCardProps {
	title: string;
	description: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ title, description }) => {
	return (
		<div className="bg-[#f1f1f1] rounded-lg border border-[#9ea2ae] flex flex-col gap-4 md:gap-8 items-center justify-start md:flex-1 h-[440px] relative shadow-[0px_4px_4px_0px_rgba(150,150,150,0.3)] my-6 md:m-0 w-full md:w-auto">
			<div className="bg-[#394050] w-full h-[232px] md:py-[51px] md:px-[92px] md:self-stretch md:flex-1 relative" />
			<div className="p-4 flex flex-col gap-4 md:gap-8 items-start justify-start self-stretch flex-shrink-0 relative">
				<div className="px-4 py-0 flex flex-col gap-8 items-center justify-center self-stretch flex-shrink-0 relative">
					<div className="text-[#0a0a0a] text-center font-Montserrat text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-bold relative self-stretch">
						{title}
					</div>
					<div className="text-[#0a0a0a] text-center font-DmSans text-[16px] leading-[20px] font-normal relative self-stretch">
						{description}
					</div>
				</div>
				<CTAButton
					label="View on LinkedIn"
					onClick={() => window.open("https://www.linkedin.com", "_blank")}
					width="100%"
					height={48}
					paddingTop={12}
					paddingRight={32}
					paddingBottom={12}
					paddingLeft={32}
					borderRadius={8}
					background="#f1f1f1"
					textColor="#f97c04"
					fontSize={16}
					fontWeight={700}
					fontFamily="DmSans-Bold, sans-serif"
					arrowColor="#f97c04"
					keepFixedSizeOnHover={true}
					border="1px solid #f97c04"
					disableBorderRadiusChange={true}
				/>
			</div>
		</div>
	);
};

export default function MeetYourMentors() {
	return (
		<div className="px-2 md:px-16 py-0 flex flex-col gap-8 md:gap-4 items-center justify-center flex-shrink-0 relative overflow-hidden">
			{/* Header Section */}
			<div className="p-2 md:p-4 flex flex-col gap-4 md:gap-8 items-center justify-center self-stretch flex-shrink-0 relative">
				<div className="text-[#005451] text-center font-Montserrat text-[18px] md:text-[32px] leading-[24px] md:leading-[38px] font-extrabold relative self-stretch">
					Meet Your Mentors
				</div>
				<div className="text-[#0a0a0a] text-center font-DmSans text-[14px] md:text-[16px] leading-[20px] font-normal relative self-stretch">
					Your journey is backed by mentors who bring deep experience from the corridors of power and the frontlines of political strategy.
				</div>
			</div>

			{/* Mentor Cards */}
			<div className="px-4 pb-8 md:p-4 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center justify-start md:justify-center self-stretch flex-shrink-0 relative">
				<MentorCard title="Mentor" description="Short body text about the mentor, a brief description." />
				<MentorCard title="Mentor" description="Short body text about the mentor, a brief description." />
				<MentorCard title="Mentor" description="Short body text about the mentor, a brief description." />
			</div>
		</div>
	);
}


