import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-y-hidden px-4">
      {/* Logo */}
      <Image
        src="/bb1.png" // 👈 put your logo inside /public folder
        alt="Building Bharat Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#005451] text-center">
        Welcome to Building Bharat Admin Panel
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-gray-600 text-center max-w-md">
        Manage blogs, users, and analytics in one place.
      </p>

      {/* Signup Button */}
      <Link href="/signup">
        <button className="mt-6 px-6 py-3 bg-[#F97C04] text-white font-medium rounded-lg shadow hover:bg-[#e0922b] transition cursor-pointer">
          Signup as Admin
        </button>
      </Link>
      <Link href="/login">
        <button className="mt-6 px-6 py-3 bg-[#F97C04] text-white font-medium rounded-lg shadow hover:bg-[#e0922b] transition cursor-pointer">
          Login
        </button>
      </Link>
    </div>
  );
}

