"use client";

import React from "react";

type CTAButtonProps = {
	label: string;
	onClick?: () => void;
	width?: string | number;
	height?: string | number;
	paddingTop?: string | number;
	paddingRight?: string | number;
	paddingBottom?: string | number;
	paddingLeft?: string | number;
	borderRadius?: string | number;
	background?: string;
	textColor?: string;
	fontSize?: string | number;
	fontWeight?: string | number;
	fontFamily?: string;
	leftRightMargin?: string | number;	
	bottomMargin?: string | number;
	arrowColor?: string;
	textPaddingX?: string | number;
	keepFixedSizeOnHover?: boolean;
};

export default function CTAButton({
	label,
	onClick,
	width = 145,
	height = 48,
	paddingTop = 0,
	paddingRight = 32,
	paddingBottom = 0,
	paddingLeft = 32,
	borderRadius = 8,
	background = "#F97C04",
	textColor = "#F1F1F1",
	fontSize = 14,
	fontWeight = 600,
	fontFamily = "DM Sans",
	leftRightMargin,
	bottomMargin,
	arrowColor = "#FFFFFF",
	textPaddingX = 0,
	keepFixedSizeOnHover = false,
}: CTAButtonProps) {
	return (
		<button
			className={`transition-all duration-300 ease-in-out ${keepFixedSizeOnHover ? "" : "origin-top-left hover:scale-105"}`}
			style={{
				width,
				height,
				paddingTop,
				paddingRight,
				paddingBottom,
				paddingLeft,
				borderRadius,
				background,
				border: "none",
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: textColor,
				fontSize,
				fontWeight,
				fontFamily,
				marginLeft: leftRightMargin,
				marginRight: leftRightMargin,
				marginBottom: bottomMargin,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderRadius = "0px";
				const svg = e.currentTarget.querySelector("svg");
				const span = e.currentTarget.querySelector("span");
				if (svg) {
					(svg as SVGElement).style.opacity = "1";
					(svg as SVGElement).style.transform = "translateX(0px)";
				}
				if (span) {
					(span as HTMLElement).style.transform = "translateX(8px)";
				}
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderRadius = `${borderRadius}`;
				const svg = e.currentTarget.querySelector("svg");
				const span = e.currentTarget.querySelector("span");
				if (svg) {
					(svg as SVGElement).style.opacity = "0";
					(svg as SVGElement).style.transform = "translateX(-8px)";
				}
				if (span) {
					(span as HTMLElement).style.transform = "translateX(0px)";
				}
			}}
			onClick={onClick}
		>
			<svg
				className="w-5 h-5 transition-all duration-300 ease-in-out"
				style={{ opacity: 0, transform: "translateX(-8px)", color: arrowColor }}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
			</svg>
			<span
				style={{
					paddingLeft: textPaddingX,
					paddingRight: textPaddingX,
					transition: "transform 300ms ease-in-out",
					color: textColor,
				}}
			>
				{label}
			</span>
		</button>
	);
}
