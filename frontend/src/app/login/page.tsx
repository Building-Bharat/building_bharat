"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { userAPI } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

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
      
      // Store authentication data
      localStorage.setItem("token", res.data.token);
      
      // Get userId from correct response structure
      let userId = null;
      if (res.data.data && res.data.data.user && res.data.data.user._id) {
        userId = res.data.data.user._id;
        localStorage.setItem("userId", userId);
      } else if (res.data.user && res.data.user._id) {
        userId = res.data.user._id;
        localStorage.setItem("userId", userId);
      } else if (res.data.userId) {
        userId = res.data.userId;
        localStorage.setItem("userId", userId);
      } else if (res.data._id) {
        userId = res.data._id;
        localStorage.setItem("userId", userId);
      }
      
      console.log('Login response:', res.data); // Debug log
      console.log('Login response structure:', {
        hasUser: !!res.data.user,
        hasUserId: !!res.data.userId,
        hasId: !!res.data._id,
        hasToken: !!res.data.token,
        userStructure: res.data.user ? Object.keys(res.data.user) : 'No user object'
      });
      console.log('Extracted userId:', userId); // Debug log
      
      // Smart redirect logic
      if (returnUrl) {
        // Login came from enroll now button - check if it's account-setup related
        const decodedReturnUrl = decodeURIComponent(returnUrl);
        
        if (decodedReturnUrl.includes('/account-setup')) {
          // Check if user profile is already completed
          if (userId) {
            try {
              const profileCheck = await userAPI.checkProfileCompletion(userId);
              
              if (profileCheck.isCompleted) {
                // Profile already completed - redirect to enrollment complete page
                const urlParams = new URLSearchParams(decodedReturnUrl.split('?')[1] || '');
                const courseId = urlParams.get('courseId');
                const redirectUrl = courseId 
                  ? `/enrollment-complete?courseId=${courseId}`
                  : '/enrollment-complete';
                router.push(redirectUrl);
              } else {
                // Profile not completed - go to account setup
                router.push(decodedReturnUrl);
              }
            } catch (profileError) {
              console.error('Error checking profile:', profileError);
              // Fallback to account setup if check fails
              router.push(decodedReturnUrl);
            }
          } else {
            // No userId found - fallback to account setup (user can set up profile)
            console.warn('No userId found in login response, redirecting to account setup');
            router.push(decodedReturnUrl);
          }
        } else {
          // Not account-setup related - redirect to original URL
          router.push(decodedReturnUrl);
        }
      } else {
        // Normal login (not from enroll now) - redirect to courses
        router.push("/courses");
      }
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