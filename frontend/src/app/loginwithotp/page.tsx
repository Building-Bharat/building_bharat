"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getApiErrorMessage } from "@/lib/api-error";
import Link from "next/link";

export default function LoginWithOTP() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ Error state
  const router = useRouter();

  const handleSendOTP = async () => {
    setError(""); // clear previous error

    if (!emailOrPhone) {
      setError("Please enter your email or mobile number");
      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/send-login-otp", {
        emailOrPhone,
      });

      router.push(`/verifyloginotp?emailOrPhone=${encodeURIComponent(emailOrPhone)}`);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to send OTP"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div
        style={{
          width: "600px",
          backgroundColor: "#fff",
          padding: "3rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            fontSize: "22px",
            marginBottom: "0.75rem",
            color: "#000",
          }}
        >
          Log in to your account
        </h2>
        <p
          style={{
            color: "#333",
            fontSize: "14px",
            marginBottom: "1.5rem",
          }}
        >
          Enter your email or mobile number to receive a login code.
        </p>
        {/* Error Message - Now ABOVE the input */}
        {error && (
          <div
            style={{
              backgroundColor: "#F97C04",
              color: "#fff",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter your email or mobile number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #F97C04",
            fontSize: "14px",
          }}
        />

        {/* Button with hover animation */}
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
          style={{
            width: "100%",
            height: "48px",
            padding: "0 32px",
            borderRadius: "8px",
            backgroundColor: "#F97C04",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderRadius = "0px";
            const svg = e.currentTarget.querySelector("svg")!;
            const span = e.currentTarget.querySelector("span")!;
            svg.style.opacity = "1";
            svg.style.transform = "translateX(0px)";
            span.style.transform = "translateX(8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderRadius = "6px";
            const svg = e.currentTarget.querySelector("svg")!;
            const span = e.currentTarget.querySelector("span")!;
            svg.style.opacity = "0";
            svg.style.transform = "translateX(-8px)";
            span.style.transform = "translateX(0px)";
          }}
        >
          {/* Left Arrow Icon */}
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              width: "24px",
              height: "24px",
              color: "#0A0A0A",
              transition: "all 0.3s ease-in-out",
              marginRight: "8px",
              opacity: 0,
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

          {/* Button Label */}
          <span
            style={{
              fontFamily: "DM Sans",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#0A0A0A",
              transition: "all 0.3s ease-in-out",
              transform: "translateX(0px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {loading ? "Sending..." : "Continue"}
          </span>
        </button>

        <div
          style={{
            textAlign: "center",
            margin: "20px 0 10px",
            color: "#555",
            fontSize: "14px",
          }}
        >
          or
        </div>

        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <Link
            href="/login"
            style={{
              color: "#F97C04",
              textDecoration: "underline",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Use password instead
          </Link>
        </div>
      </div>

      {/* Right Panel (Optional) */}
      <div style={{ flex: 1, background: "#f1f2f4" }}></div>
    </div>
  );
}
