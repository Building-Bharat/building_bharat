"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnrollmentCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    // You can fetch course details here if needed
    // For now, we'll use a placeholder
    if (courseId) {
      setCourseName('Selected Course');
    }
  }, [courseId]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/icons/logo.png"
            alt="Building Bharat"
            className="h-12"
          />
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            Your profile is already set up. You're ready to continue with your course enrollment.
          </p>

          {courseId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                <strong>Course:</strong> {courseName}
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Course ID: {courseId}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-[#005451] text-white px-8 py-3 rounded-lg hover:bg-[#003d3a] transition-colors font-medium"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => router.push('/courses')}
            className="w-full border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Browse More Courses
          </button>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500 mt-8">
          Need to update your profile? Visit your{" "}
          <button
            onClick={() => router.push('/dashboard')}
            className="text-[#005451] hover:underline"
          >
            dashboard settings
          </button>
        </p>
      </div>
    </div>
  );
}
