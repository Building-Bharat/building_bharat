"use client";

import React from "react";
import CTAButton from "./CTAButton";

export default function MeetYourMentors() {
	return (
		<section
			className="w-full flex justify-center px-4 sm:px-6 md:px-8"
			style={{ background: "var(--Surface-Color-surface-grey, #E5E7EA)" }}
		>
			<div
				className="bg-[#E5E7EA] w-full max-w-[1280px] rounded-[16px]"
				style={{
					minHeight: "786px",
					paddingTop: "64px",
					gap: "64px",
					opacity: 1,
				}}
			>
				{/* Heading */}
				<div
					className="flex flex-col items-center text-center gap-8 mx-auto"
					style={{
						width: "1152px",
						height: "122px",
						paddingTop: "16px",
						paddingRight: "16px",
						paddingBottom: "16px",
						paddingLeft: "16px",
						gap: "2rem",
						opacity: 1,
					}}
				>
					<h2
						className="font-extrabold font-Montserrat"
						style={{
							width: "1120px",
							height: "38px",
							opacity: 1,
							fontFamily: "Montserrat, sans-serif",
							fontWeight: 800,
							fontSize: "32px",
							lineHeight: "38px",
							letterSpacing: 0,
							textAlign: "center",
							color: "var(--Text-Color-text-green, #005451)",
							marginTop: "16px",
							marginRight: "16px",
							marginLeft: "16px",
						}}
					>
						Meet Your Mentors
					</h2>
					<p
						className="font-DMsans"
						style={{
							width: "1120px",
							height: "20px",
							opacity: 1,
							fontFamily: "DM Sans, sans-serif",
							fontWeight: 400,
							fontSize: "16px",
							lineHeight: "20px",
							letterSpacing: 0,
							textAlign: "center",
							color: "var(--color-text-textPrimary, #0A0A0A)",
						}}
					>
						Your journey is backed by mentors who bring deep experience from the
						corridors of power and the frontlines of political strategy.
					</p>
				</div>

				{/* Cards */}
				<div
					className="mx-auto mt-12"
					style={{
						width: "1152px",
						height: "472px",
						opacity: 1,
						paddingTop: "16px",
						paddingRight: "16px",
						paddingBottom: "16px",  
						paddingLeft: "16px",
						gap: "64px",
					}}
				>
					<div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "64px" }}>
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={index}
								className="overflow-hidden rounded-[8px]"
								style={{
									width: "330.6666564941406px",
									height: "440px",
									gap: "32px",
									padding: 0,
									background: "var(--Surface-Color-surface-white, #F1F1F1)",
									border: "1px solid var(--Border-Color-border-grey, #9EA2AE)",
									boxShadow: "0px 4px 4px 0px #9696964D",
									opacity: 1,
								}}
							>
								<div
									style={{
										width: "330.6666564941406px",
										height: "196px",
										opacity: 1,
										borderRadius: 0,
										background: "var(--Surface-Color-surface-grey-dark, #394050)",
									}}
								/>
								<div className="flex flex-col items-center text-center" style={{ 
									width: "298.66668701171875px", 
									height: "100px", 
									paddingTop: 0, 
									paddingRight: "3px", 
									paddingBottom: 0, 
									paddingLeft: "32px", 
									gap: "32px", 
									marginTop: "32px",
									opacity: 1 
								}}>
									<h3
										className="font-Montserrat"
										style={{
											width: "266.66668701171875px",
											height: "28px",
											opacity: 1,
											fontFamily: "Montserrat, sans-serif",
											fontWeight: 700,
											fontSize: "20px",
											lineHeight: "28px",
											letterSpacing: 0,
											textAlign: "center",
											color: "var(--color-text-textPrimary, #0A0A0A)",
											marginTop: 0,
											marginRight: "16px",
											marginLeft: "16px",
										}}
									>
										Mentor
									</h3>
									<p
										className="font-DMsans"
										style={{
											width: "266.66668701171875px",
											height: "40px",
											opacity: 1,
											fontFamily: "DM Sans, sans-serif",
											fontWeight: 400,
											fontSize: "16px",
											lineHeight: "20px",
											letterSpacing: 0,
											textAlign: "center",
											color: "var(--color-text-textPrimary, #0A0A0A)",
										}}
									>
										Short body text about the mentor, a brief description.
									</p>
									<CTAButton
										label="View on LinkedIn"
										width={"298.66668701171875px"}
										height={"48px"}
										paddingTop={"12px"}
										paddingRight={"32px"}
										paddingBottom={"12px"}
										paddingLeft={"32px"}
										borderRadius={"8px"}
										background={"var(--color-Primary-primary-500, #F97C04)"}
										textColor="#0A0A0A"
										fontSize={14}
										fontWeight={600}
										fontFamily="DM Sans"
										leftRightMargin={"16px"}
										bottomMargin={"16px"}
										arrowColor="#000000"
										textPaddingX={"8px"}
										keepFixedSizeOnHover={true}
										onClick={() => window.open("https://www.linkedin.com", "_blank")}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}


