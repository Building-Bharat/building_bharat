"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    // Basic input validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login/email", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/courses");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f2f4",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          height: "100vh",
          backgroundColor: "#fff",
          borderRadius: "0 8px 8px 0",
          padding: "2rem",
          boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontWeight: "600",
            fontSize: "20px",
            marginBottom: "1.5rem",
          }}
        >
          Log in to your account
        </h2>

        {/* Error Message */}
        {error && (
          <div
            style={{
              backgroundColor: "#F97C04",
              color: "#fff",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email or mobile number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <div style={{ margin: "10px 0" }}>
          <a href="/forgotpassword" style={{ color: "#000", fontSize: "14px" }}>
            Forget Password?
          </a>
        </div>

        {/* Animated Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full sm:w-auto transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
          style={{
            width: "100%",
            height: "48px",
            padding: "0 32px",
            opacity: 1,
            borderRadius: "8px",
            background: "#F97C04",
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
            e.currentTarget.style.borderRadius = "8px";
            const svg = e.currentTarget.querySelector("svg")!;
            const span = e.currentTarget.querySelector("span")!;
            svg.style.opacity = "0";
            svg.style.transform = "translateX(-8px)";
            span.style.transform = "translateX(0px)";
          }}
        >
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
              textAlign: "center",
              color: "#0A0A0A",
              transition: "all 0.3s ease-in-out",
              transform: "translateX(0px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            Log In
          </span>
        </button>

        <div style={{ textAlign: "center", margin: "20px 0", color: "#555" }}>
          or
        </div>

        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <a
            href="/loginwithotp"
            style={{
              color: "#F97C04",
              textDecoration: "underline",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Use a one-time code instead
          </a>
        </div>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          New here?{" "}
          <a href="/signup" style={{ color: "#F97C04", fontWeight: "500" }}>
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid orange",
  fontSize: "14px",
  boxSizing: "border-box",
};