"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // adjust duration
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white relative overflow-hidden">
        {/* Waves (ripple effect) */}
        <div className="absolute w-[200px] h-[200px] flex items-center justify-center">
          <span className="ripple absolute"></span>
          <span className="ripple absolute delay-200"></span>
          <span className="ripple absolute delay-400"></span>
        </div>

        {/* Center Image */}
        <Image
          src="/images/bharat.png"
          alt="Loading..."
          width={200}
          height={200}
          unoptimized
          className="relative z-10"
        />
      </div>
    );
  }

  return <>{children}</>;
}

