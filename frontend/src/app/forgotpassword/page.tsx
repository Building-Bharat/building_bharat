"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email) {
      setError("Please enter your email or phone number");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/send-otp", { email });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push(`/verifyotpforreset?email=${encodeURIComponent(email)}`);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to send OTP");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Left Panel */}
      <div
        style={{
          width: 440,
          backgroundColor: "#fff",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
        }}
      >
        {showAlert && (
          <div
            style={{
              backgroundColor: "#fff4e5",
              border: "1.5px solid #ff7a00",
              color: "#ff7a00",
              padding: "12px 16px",
              borderRadius: 6,
              marginBottom: 24,
              fontWeight: "600",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            OTP sent to your email.
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#fff4e5",
              border: "1.5px solid #ff7a00",
              color: "#ff7a00",
              padding: "12px 16px",
              borderRadius: 6,
              marginBottom: 24,
              fontWeight: "600",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <h2
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#000",
            marginBottom: 12,
            textAlign: "left",
          }}
        >
          Reset your password
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "#555",
            marginBottom: 24,
            textAlign: "left",
          }}
        >
          Enter your email or phone number, and we’ll send you a verification
          code to reset your password.
        </p>

        <input
          type="text"
          placeholder="Enter your email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: 14,
            borderRadius: 6,
            border: "1.5px solid #F97C04",
            marginBottom: 24,
            outline: "none",
            boxSizing: "border-box",
            color: "#000",
          }}
        />

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
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            color: loading ? "rgba(0,0,0,0.6)" : "#0A0A0A",
            fontWeight: 600,
            fontSize: 16,
          }}
          onMouseEnter={(e) => {
            if (loading) return;
            e.currentTarget.style.borderRadius = "0px";
            const svg = e.currentTarget.querySelector("svg")!;
            const span = e.currentTarget.querySelector("span")!;
            svg.style.opacity = "1";
            svg.style.transform = "translateX(0px)";
            span.style.transform = "translateX(8px)";
          }}
          onMouseLeave={(e) => {
            if (loading) return;
            e.currentTarget.style.borderRadius = "8px";
            const svg = e.currentTarget.querySelector("svg")!;
            const span = e.currentTarget.querySelector("span")!;
            svg.style.opacity = "0";
            svg.style.transform = "translateX(-8px)";
            span.style.transform = "translateX(0px)";
          }}
        >
          {/* Right Arrow Icon */}
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
      </div>

      {/* Right Panel (empty filler) */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f3f4f6",
        }}
      ></div>
    </div>
  );
}