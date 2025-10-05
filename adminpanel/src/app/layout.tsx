import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Building Bharat Admin Panel",
  description: "Admin dashboard for Building Bharat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
            <main className="">{children}</main>
             <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}

