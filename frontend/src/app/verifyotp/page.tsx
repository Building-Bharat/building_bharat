"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const incomingEmail = searchParams.get("email");

    if (incomingEmail) {
      setEmail(incomingEmail);
      localStorage.setItem("pendingEmail", incomingEmail);
    } else {
      const storedEmail = localStorage.getItem("pendingEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        router.replace("/login");
      }
    }
  }, [searchParams, router]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);

    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const newOtp = [...otp];
      newOtp[idx - 1] = "";
      setOtp(newOtp);
      inputsRef.current[idx - 1]?.focus();
      e.preventDefault();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowAlert(false);

    if (!email) {
      setError("Email missing. Redirecting to signup...");
      setTimeout(() => router.push("/signup"), 1200);
      return;
    }

    if (otp.some((d) => d === "")) {
      setAlertMessage("Please enter the complete 4-digit OTP");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/verify-otp", {
        email,
        otp: otp.join(""),
      });
      localStorage.removeItem("pendingEmail");
      router.push("/courses");
    } catch (err: any) {
      setError(err.response?.data?.msg || err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setShowAlert(false);

    if (!email) {
      setError("Email missing. Cannot resend OTP.");
      return;
    }
    setResendLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/send-otp", { email });
      setAlertMessage("OTP resent to your email.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.msg || err.message || "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Enter the login code</h2>
        <p className="text-sm text-gray-700 mb-6">
          We’ve sent a code to <br />
          <strong className="text-black">{email}</strong>
        </p>

        {/* ALERT BOX */}
        {showAlert && (
          <div className="bg-white text-orange-600 border-2 border-orange-500 px-4 py-3 rounded mb-5 font-medium shadow-md">
            {alertMessage}
          </div>
        )}

        {/* OTP INPUTS */}
        <form
          onSubmit={handleVerify}
          className="flex justify-center gap-4 mb-6"
        >
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              ref={(el) => {
                if (el) inputsRef.current[idx] = el;
              }}
              className="w-12 h-12 border-2 border-orange-500 rounded text-center text-xl font-semibold outline-none"
              autoFocus={idx === 0}
            />
          ))}
        </form>

        {/* SERVER ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
        )}

        {/* RESEND LINK */}
        <p className="text-sm text-gray-600 mb-6">
          Didn’t get the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-orange-600 font-semibold hover:underline"
          >
            {resendLoading ? "Resending..." : "Resend"}
          </button>
        </p>

        {/* VERIFY BUTTON WITH ANIMATION */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            onClick={handleVerify}
            className="transition-all duration-300 ease-in-out relative"
            style={{
              width: "300px",
              height: "48px",
              padding: "0 32px",
              borderRadius: "8px",
              background: "#F97C04",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.borderRadius = "0px";
              const svg = btn.querySelector("svg")!;
              const span = btn.querySelector("span")!;
              svg.style.opacity = "1";
              svg.style.transform = "translateX(0px)";
              span.style.transform = "translateX(8px)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.borderRadius = "8px";
              const svg = btn.querySelector("svg")!;
              const span = btn.querySelector("span")!;
              svg.style.opacity = "0";
              svg.style.transform = "translateX(-8px)";
              span.style.transform = "translateX(0px)";
            }}
          >
            {/* Arrow icon */}
            <svg
              className="w-5 h-5 text-black transition-all duration-300 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                width: "24px",
                height: "24px",
                color: "#0A0A0A",
                transition: "all 0.3s ease-in-out",
                marginRight: "8px",
                opacity: "0",
                transform: "translateX(-8px)",
                position: "absolute",
                left: "16px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

            {/* Button text */}
            <span
              style={{
                color: "#0A0A0A",
                fontWeight: "600",
                fontSize: "16px",
                fontFamily: "DM Sans",
                lineHeight: "24px",
                transition: "all 0.3s ease-in-out",
                transform: "translateX(0px)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {loading ? "Verifying..." : "Verify & Log-in"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
