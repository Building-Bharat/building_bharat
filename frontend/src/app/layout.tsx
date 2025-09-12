import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import LoaderWrapper from "./Loadwrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building Bharat",
  description:
    "Building Bharat is a premier political consulting firm dedicated to shaping the leaders of tomorrow. Alongside offering expert consulting services, we provide specialized courses and hands-on internships that equip students and young professionals with the skills to thrive in political strategy, governance, and public policy. Our programs are designed to offer practical guidance on entering the world of consulting and politics, while also mentoring individuals on how to successfully secure and crack competitive internships in the field.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.className} antialiased`}
      >
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <LoaderWrapper>{children}</LoaderWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}