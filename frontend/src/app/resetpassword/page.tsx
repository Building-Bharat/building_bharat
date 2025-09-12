"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Password strength checker
  const isPasswordStrong = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;
    return regex.test(password);
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in both fields");
      return;
    }

    if (!isPasswordStrong(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and include an uppercase letter, number, and symbol"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/reset-password", {
        email,
        newPassword,
      });

      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      alert(err.response?.data?.msg || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full relative">
        {/* Custom Success Alert */}
        {showSuccessAlert && (
          <div
            className="absolute top-[-70px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 border-2 border-[#F97C04] bg-white text-[#F97C04] px-5 py-3 rounded-md shadow-md font-semibold text-sm min-w-[280px]"
            role="alert"
          >
            {/* Checkmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="#F97C04"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Password reset successful.
          </div>
        )}

        <h2 className="text-lg font-bold text-black mb-2">Reset Password</h2>
        <p className="text-sm text-gray-700 mb-5">
          Your new password must be at least 8 characters long and include
          letters, numbers, and symbols.
        </p>

        <input
          type="password"
          placeholder="Create new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#F97C04] rounded-md placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97C04] mb-3"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-[#F97C04] rounded-md placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97C04] mb-3"
        />

        {passwordError && (
          <p className="text-red-600 text-sm mb-4">{passwordError}</p>
        )}

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full py-3 bg-[#F97C04] text-black font-semibold rounded-md transition disabled:opacity-60 relative overflow-hidden flex items-center justify-center"
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: "1.1rem",
            transition: "background-color 0.3s, transform 0.3s",
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
                color: "#000",
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
              color: "#000",
            }}
          >
            {loading ? "Resetting..." : "Reset password"}
          </span>
        </button>
      </div>
    </div>
  );
}