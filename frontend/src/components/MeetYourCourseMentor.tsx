"use client";

import React from "react";
import CTAButton from "./CTAButton";

export type CourseMentorProps = {
	mentorName?: string;
	description?: string;
	linkedinUrl?: string;
};

export default function MeetYourCourseMentor({ 
	mentorName = "Mentor", 
	description = "Short body text about the mentor, a brief description.",
	linkedinUrl = "https://www.linkedin.com"
}: CourseMentorProps) {
	return (
		<>
			{/* Mobile View - Only shows on mobile devices */}
			<div className="md:hidden mt-8">
				<div className="flex flex-col gap-4 items-start justify-center self-stretch flex-shrink-0 relative overflow-hidden ">
					{/* Meet Your Mentor Title - Mobile */}
					<div className="text-[#005451] text-left font-bold font-Montserrat text-[16px] leading-[24px] relative self-stretch">
						Meet Your Mentor
					</div>
					
					{/* Main Container - Mobile */}
					<div className="bg-[#f1f1f1] rounded-lg p-4 border border-[#9ea2ae] flex flex-col gap-4 items-start justify-center self-stretch flex-shrink-0 h-[540px] relative shadow-[0px_4px_4px_0px_rgba(150,150,150,0.3)]">
						{/* Left Side - Image Placeholder - Mobile */}
						<div className="bg-[#394050] py-[51px]  px-[92px] self-stretch flex-1 relative">
							{/* Image placeholder - you can add an actual image here */}
						</div>
						
						{/* Right Side - Content - Mobile */}
						<div className="p-4 flex flex-col gap-4 items-start justify-center self-stretch flex-shrink-0 relative">
							{/* Title and Body Text - Mobile */}
							<div className="px-4 py-0 flex flex-col gap-4 items-center justify-center self-stretch flex-shrink-0 relative">
								<div className="text-[#0a0a0a] text-left font-['Montserrat-Bold',sans-serif] text-[16px] leading-[24px] font-bold relative self-stretch">
									{mentorName}
								</div>
								<div className="text-[#0a0a0a] text-left font-['DmSans-Regular',sans-serif] text-[14px] leading-[20px] font-normal relative self-stretch">
									{description}
								</div>
								<div className="self-start space-y-4">
									<ul className="space-y-4 list-disc list-inside">
										<li className="text-[#0A0A0A] font-[450] text-base ">Pointer 1</li>
										<li className="text-[#0A0A0A] font-[450] text-base ">Pointer 2</li>
									</ul>
								</div>
							</div>
							
							{/* Button Container - Mobile */}
							<div className="p-6 flex flex-col gap-2 items-start justify-start self-stretch flex-shrink-0 relative">
								<CTAButton
									label="View on LinkedIn"
									onClick={() => window.open(linkedinUrl, "_blank")}
									width="100%"
									height={48}
									paddingTop={24}
									paddingRight={24}
									paddingBottom={24}
									paddingLeft={24}
									borderRadius={8}
									background="#f1f1f1"
									textColor="#f97c04"
									fontSize={16}
									fontWeight={700}
									border="1px solid #f97c04"
									fontFamily="DmSans-Bold, sans-serif"
									arrowColor="#0a0a0a"
									keepFixedSizeOnHover={true}
									disableBorderRadiusChange={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop View - Only shows on desktop devices */}
			<div className="hidden md:block mt-8">
				<div className="flex flex-col gap-8 items-start justify-center self-stretch flex-shrink-0 relative overflow-hidden">
					{/* Meet Your Mentor Title */}
					<div className="text-[#005451] text-left font-bold font-Montserrat text-[20px] leading-[38px] relative self-stretch">
						Meet Your Mentor
					</div>
					
					{/* Main Container */}
					<div className="bg-[#f1f1f1] w-full p-4 rounded-lg border flex flex-row gap-8 items-center justify-start self-stretch flex-shrink-0 h-[400px] relative shadow-[0px_4px_4px_0px_rgba(150,150,150,0.3)]">
						{/* Left Side - Image Placeholder */}
						<div className="bg-[#394050] py-[51px] px-[92px] self-stretch flex-shrink-0 w-1/2 lg:w-[300px] relative">
							{/* Image placeholder - you can add an actual image here */}
						</div>
						
						{/* Right Side - Content */}
						<div className="p-4 flex flex-col gap-8 items-start justify-center w-1/2  relative">
							{/* Title and Body Text */}
							<div className="px-4 py-0 flex flex-col gap-8 items-center justify-center self-stretch flex-shrink-0 relative">
								<div className="text-[#0a0a0a] text-left font-['Montserrat-Bold',sans-serif] text-[20px] leading-[28px] font-bold relative self-stretch">
									{mentorName}
								</div>
								<div className="text-[#0a0a0a] text-left font-['DmSans-Regular',sans-serif] text-[16px] leading-[20px] font-normal relative self-stretch">
									{description}
								</div>
								<div className="self-start space-y-4">
									<ul className="space-y-4 list-disc list-inside">
										<li className="text-[#0A0A0A] font-[450] text-base ">Pointer 1</li>
										<li className="text-[#0A0A0A] font-[450] text-base ">Pointer 2</li>
									</ul>
								</div>
							</div>
							
							{/* Button Container */}
							<div className="p-2 flex flex-col gap-2 items-start justify-start flex-shrink-0 relative">
								<CTAButton
									label="View on LinkedIn"
									onClick={() => window.open(linkedinUrl, "_blank")}
									width="auto"
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
					</div>
				</div>
			</div>
		</>
	);
} 
