"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getApiErrorMessage } from "@/lib/api-error";

type AlertType = "success" | "warning";

export default function VerifyOTPForReset() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const showAlertBox = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 4) {
      showAlertBox("warning", "Please enter all 4 digits of the OTP");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/verify-otp-for-reset", {
        email,
        otp: fullOtp,
      });
      router.push(`/resetpassword?email=${email}`);
    } catch (err) {
      showAlertBox(
        "warning",
        getApiErrorMessage(err, "OTP verification failed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    // Add your resend OTP API call here
    showAlertBox("success", "OTP resent successfully");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg p-8 shadow-md max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-6">
          Enter the reset password code
        </h2>

        {/* Static alert on initial OTP sent */}
        {email && !showAlert && (
          <div
            className="flex items-center bg-white border-2 border-[#F97C04] text-[#F97C04] px-5 py-3 rounded-lg mb-6 shadow-md text-sm font-semibold"
            role="alert"
          >
            <svg
              className="w-5 h-5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
            <div>
              <strong className="font-bold mr-1">OTP Sent!</strong>
              Check your email: <span className="font-medium">{email}</span>
            </div>
          </div>
        )}

        {/* Dynamic alert */}
        {showAlert && alert && (
          <div
            className={`flex items-center px-5 py-3 rounded-lg mb-6 shadow-md text-sm font-semibold border-2
              bg-white border-[#F97C04] text-[#F97C04]
            `}
            role="alert"
          >
            {/* Icon */}
            {alert.type === "success" ? (
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                ></path>
              </svg>
            )}
            <div>{alert.message}</div>
          </div>
        )}

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#F97C04]"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Didn’t get the code?{" "}
          <button
            onClick={handleResendOTP}
            className="text-[#F97C04] font-medium hover:underline"
          >
            Resend
          </button>
        </p>

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full sm:w-auto transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
          style={{
            width: "100%",
            height: "48px",
            paddingTop: "0",
            paddingRight: "32px",
            paddingBottom: "0",
            paddingLeft: "32px",
            borderRadius: "8px",
            background: "#F97C04",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            color: "#0A0A0A", // black text
            fontFamily: "DM Sans",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            if (loading) return;
            e.currentTarget.style.borderRadius = "0px";
            const svg = e.currentTarget.querySelector("svg");
            const span = e.currentTarget.querySelector("span");
            if (svg) {
              svg.style.opacity = "1";
              svg.style.transform = "translateX(0px)";
            }
            if (span) {
              span.style.transform = "translateX(8px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderRadius = "8px";
            const svg = e.currentTarget.querySelector("svg");
            const span = e.currentTarget.querySelector("span");
            if (svg) {
              svg.style.opacity = "0";
              svg.style.transform = "translateX(-8px)";
            }
            if (span) {
              span.style.transform = "translateX(0px)";
            }
          }}
        >
          <svg
            className="w-5 h-5 transition-all duration-300 ease-in-out"
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
          <span
            style={{
              width: "auto",
              minWidth: "81px",
              height: "24px",
              opacity: 1,
              fontFamily: "DM Sans",
              fontWeight: "600",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#0A0A0A",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease-in-out",
              transform: "translateX(0px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </span>
        </button>
      </div>
    </div>
  );
}
