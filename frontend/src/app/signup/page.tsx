"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();

  const rotatingWords = ["Integrity", "Power", "Honesty"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isPasswordStrong = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;
    return regex.test(password);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordStrong(password)) {
      setError(
        "Password must be at least 8 characters and include an uppercase letter, number, and special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup/email", {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      const signedUpEmail = res?.data?.email || email;
      localStorage.setItem("pendingEmail", signedUpEmail);
      router.push("/verifyotp");
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      setError(error.response?.data?.msg || error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (res: any) => {
    try {
      const credential = res.credential;
      await axios.post("http://localhost:5000/api/v1/auth/google", { credential });
      router.push("/courses");
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      setError(
        error.response?.data?.msg || error.message || "Google signup failed"
      );
    }
  };

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="flex flex-col items-center w-full lg:w-[500px] bg-white p-6 lg:p-12 shadow-md z-10 min-h-screen justify-center">
        {/* Custom Google Login Button */}
        <button
          onClick={() => {
            // Trigger Google login programmatically
            const googleButton = document.querySelector('div[role="button"]');
            if (googleButton) {
              (googleButton as HTMLElement).click();
            }
          }}
          className="w-full max-w-[372px] h-[56px] border-2 border-[#F97C04] rounded-lg bg-white flex items-center justify-center px-4 gap-3 hover:bg-gray-50 transition-colors"
        >
          {/* Google G Logo */}
          <div className="flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>

          {/* Button Text */}
          <span className="text-black font-bold">Continue with Google</span>
        </button>

        {/* Hidden Google Login Component */}
        <div className="hidden">
          <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={() => setError("Google login failed")}
            theme="outline"
            size="large"
            ux_mode="popup"
          />
        </div>

        <div className="text-center text-gray-600 text-sm my-4">— OR —</div>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4 w-full max-w-[372px]"
        >
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Your email or mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <label className="text-sm">
            <input type="checkbox" required className="mr-2" />I agree to the{" "}
            <span className="text-[#F97C04] cursor-pointer">
              Terms of Service
            </span>
          </label>

          {/* Animated Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative flex items-center justify-center w-full h-12 rounded-md font-semibold transition overflow-hidden"
            style={{
              backgroundColor: "#F97C04",
              border: "1px solid #F97C04",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              color: "black",
            }}
            onMouseEnter={(e) => {
              if (loading) return;
              e.currentTarget.style.transform = "scale(1.05)";
              const svg = e.currentTarget.querySelector("svg");
              const span = e.currentTarget.querySelector("span");
              if (svg) {
                svg.style.opacity = "1";
                svg.style.transform = "translateX(0)";
              }
              if (span) {
                span.style.transform = "translateX(8px)";
              }
            }}
            onMouseLeave={(e) => {
              if (loading) return;
              e.currentTarget.style.transform = "scale(1)";
              const svg = e.currentTarget.querySelector("svg");
              const span = e.currentTarget.querySelector("span");
              if (svg) {
                svg.style.opacity = "0";
                svg.style.transform = "translateX(-8px)";
              }
              if (span) {
                span.style.transform = "translateX(0)";
              }
            }}
          >
            {!loading && (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  width: "20px",
                  height: "20px",
                  color: "black",
                  transition: "all 0.3s ease-in-out",
                  marginRight: "6px",
                  opacity: 0,
                  transform: "translateX(-8px)",
                  position: "absolute",
                  left: "16px",
                }}
                aria-hidden="true"
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
                transition: "all 0.3s ease-in-out",
                transform: "translateX(0)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {loading ? "Signing up..." : "Sign up for Free"}
            </span>
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-left">{error}</div>
          )}
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#F97C04] font-medium">
            Log in
          </Link>
        </p>
      </div>

      {/* Right Panel - Hidden on Mobile */}
      <div
        className="hidden lg:flex flex-1 relative items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/parliament.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/90" />

        <img
          src="/images/BuildingBharat.jpg"
          alt="Building Bharat Logo"
          className="absolute top-8 right-8 w-[64px] h-[64px] z-20 rounded-xl"
        />

        {/* Rotating text */}
        <div className="absolute bottom-10 left-10 text-white text-2xl lg:text-3xl font-bold">
          <div>Building Nation,</div>
          <span
            key={wordIndex}
            style={{
              display: "inline-block",
              marginTop: "10px",
              color: "#F97C04",
              fontSize: "28px",
              animation: "slideIn 3s ease-in-out",
            }}
          >
            With {rotatingWords[wordIndex]}.
          </span>
        </div>

        <style jsx>{`
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(100%);
            }
            20% {
              opacity: 1;
              transform: translateX(0);
            }
            80% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

const inputStyle = {
  height: "52px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #F97C04",
  padding: "0 12px",
  fontSize: "16px",
};