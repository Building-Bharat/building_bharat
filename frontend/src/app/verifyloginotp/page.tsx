"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function VerifyLoginOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const emailFromQuery = searchParams.get("emailOrPhone");

    if (!emailFromQuery) {
      alert("Email not provided. Redirecting...");
      router.push("/login");
    } else {
      setEmail(emailFromQuery);
    }
  }, [searchParams, router]);

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      if (errorMsg) setErrorMsg("");

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 4) {
      setErrorMsg("Please enter the full 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-login-otp",
        {
          email,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);
      router.push("/#home");
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      setErrorMsg(
        error.response?.data?.msg || error.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setResendMsg("OTP resent successfully!");
    setTimeout(() => setResendMsg(""), 4000);
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "50px auto",
        padding: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontWeight: 700,
          marginBottom: 24,
          fontSize: "1.6rem",
          color: "#121212",
        }}
      >
        Enter the login code
      </h2>

      <p
        style={{
          marginBottom: 28,
          fontSize: "1rem",
          color: "#444",
        }}
      >
        We’ve sent a code to{" "}
        <strong style={{ color: "#121212" }}>{email}</strong>.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            ref={(el) => {
              if (el) inputsRef.current[i] = el;
            }}
            value={otp[i] || ""}
            onChange={(e) => handleChange(e.target.value, i)}
            style={{
              width: 52,
              height: 52,
              fontSize: "1.8rem",
              fontWeight: "600",
              textAlign: "center",
              border: "1.8px solid #F97C04",
              borderRadius: 8,
              outline: "none",
              backgroundColor: "#fff",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      {/* Styled error message */}
      {errorMsg && (
        <div
          style={{
            backgroundColor: "white",
            color: "#F97C04",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontWeight: "600",
            textAlign: "center",
            boxShadow: "0 2px 6px rgba(249, 124, 4, 0.3)",
            userSelect: "none",
          }}
          role="alert"
        >
          {errorMsg}
        </div>
      )}

      {/* Resend success message */}
      {resendMsg && (
        <div
          style={{
            backgroundColor: "white",
            color: "#F97C04",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontWeight: "600",
            textAlign: "center",
            boxShadow: "0 2px 6px rgba(249, 124, 4, 0.3)",
            userSelect: "none",
          }}
          role="alert"
        >
          {resendMsg}
        </div>
      )}

      <div
        style={{
          marginBottom: 28,
          fontSize: "0.95rem",
          color: "#666",
          userSelect: "none",
        }}
      >
        Didn’t get the code?{" "}
        <button
          onClick={handleResend}
          style={{
            border: "none",
            background: "none",
            color: "#F97C04",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          Resend
        </button>
      </div>

      <button
        onClick={handleVerifyOTP}
        disabled={loading}
        className="transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
        style={{
          backgroundColor: loading ? "#ffb86c" : "#F97C04",
          color: loading ? "rgba(255,255,255,0.6)" : "#fff",
          fontWeight: 500,
          width: "100%",
          padding: "0.8rem 0",
          borderRadius: 8,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "1.1rem",
          transition: "background-color 0.3s",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          if (loading) return;
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
        {!loading && (
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              width: "24px",
              height: "24px",
              color: "black",
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
        )}

        <span
          style={{
            fontFamily: "DM Sans",
            fontWeight: 700,
            fontSize: "1.1rem",
            lineHeight: "22px",
            color: "black",
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
  );
}