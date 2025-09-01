"use client";

import React from "react";

interface FeatureCardProps {
	title: string;
	imagePlaceholder?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, imagePlaceholder = true }) => {
	return (
		<div className="p-2 md:p-4 flex flex-col gap-4 md:gap-8 items-start justify-start h-auto md:h-[285.5px] relative aspect-auto md:aspect-[240/285.5]">
			{imagePlaceholder && (
				<div className="bg-[#394050] rounded-lg md:rounded-2xl self-stretch flex-shrink-0 h-[158.12px] md:flex-1 relative" />
			)}
			<div className="text-[#0a0a0a] text-center font-Montserrat text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] font-bold relative self-stretch">
				{title}
			</div>
		</div>
	);
};

export default function PremiumAccess() {
	return (
		<div className="px-2 md:px-16 py-0 flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-start flex-shrink-0 relative overflow-hidden">
			{/* Left Section - Premium Access */}
			<div className="p-4 flex flex-col gap-4 md:gap-8 items-start justify-start flex-shrink-0 w-full md:w-[544px] h-auto md:h-[635px] relative">
				<div className="flex flex-col gap-2 items-start justify-start self-stretch flex-shrink-0 h-[337.64px] md:h-[441px] relative aspect-[392/337.64] md:aspect-[512/441]">
					<div className="bg-[#394050] rounded-lg md:rounded-2xl self-stretch flex-1 relative" />
				</div>
				<div className="text-[#005451] text-left font-Montserrat text-[18px] md:text-[32px] leading-[24px] md:leading-[38px] font-extrabold relative self-stretch">
					Premium Access
				</div>
				<div className="text-[#0a0a0a] text-left font-DmSans text-[14px] md:text-[16px] leading-[20px] font-normal relative self-stretch">
					Shape your journey with the preparation and exposure needed to contribute meaningfully to governance, campaigns, and policymaking.
				</div>
			</div>

			{/* Right Section - Feature Grid */}
			<div className="p-4 self-stretch flex-shrink-0 md:flex-1 grid gap-8 relative grid-cols-2 grid-rows-2">
				<FeatureCard title="Internship" />
				<FeatureCard title="Mentorship" />
				<FeatureCard title="Certifications" />
				<FeatureCard title="Mock Interviews" />
			</div>
		</div>
	);
}


