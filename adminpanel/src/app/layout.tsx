import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Building Bharat Admin Panel",
  description: "Admin dashboard for Building Bharat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
            <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

