"use client";

import React, { useState, useEffect } from "react";
import { userAPI } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

const AccountSetupForm = () => {
  const [username, setUsername] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [state, setState] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [countryCode, setCountryCode] = useState("India (+91)");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get courseId from URL
  const courseId = searchParams.get('courseId');
  
  // Try multiple sources for userId (prioritize real logged-in user)
  const getUserId = () => {
    // 1. From localStorage (real logged-in user takes priority)
    if (typeof window !== 'undefined') {
      const storageUserId = localStorage.getItem('userId');
      if (storageUserId && storageUserId !== 'test-user-456') {
        return storageUserId;
      }
    }
    
    // 2. From URL parameters (fallback)
    const urlUserId = searchParams.get('userId');
    if (urlUserId) return urlUserId;
    
    // 3. Final fallback for testing
    return 'test-user-456';
  };
  
  const userId = getUserId();

  // Fetch existing user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      
      setIsLoadingProfile(true);
      try {
        const profileData = await userAPI.getProfile(userId);
        const user = profileData.data || profileData;
        
        console.log('Fetched existing profile:', user);
        
        // Auto-fill form fields with existing data
        if (user.username) setUsername(user.username);
        if (user.whatsappNumber) setWhatsappNumber(user.whatsappNumber);
        if (user.state) setState(user.state);
        if (user.collegeName) setUniversity(user.collegeName);
        if (user.department) setDepartment(user.department);
        if (user.collegePassout) setGraduationYear(user.collegePassout.toString());
        
        // Check if profile is already completed
        const hasProfileData = user.username || user.whatsappNumber || user.state || 
                              user.collegeName || user.department || user.collegePassout;
        
        if (hasProfileData) {
          setIsUpdating(true);
          setSuccess("Profile data loaded. You can update your information below.");
        }
        
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If error, user probably doesn't exist or no profile data - that's fine
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!username || !whatsappNumber || !state || !university || !department || !graduationYear) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const profileData = {
        username,
        whatsappNumber,
        state,
        collegeName: university,
        department,
        collegePassout: graduationYear,
      };

      console.log('Updating profile for userId:', userId);
      console.log('Profile data:', profileData);

      await userAPI.updateProfile(userId, profileData);
      setSuccess(isUpdating ? "Profile updated successfully!" : "Profile created successfully!");
      
      // Redirect to coupon-code page after success (preserve courseId)
      setTimeout(() => {
        const redirectUrl = courseId 
          ? `/coupon-code?courseId=${courseId}` 
          : '/coupon-code';
        router.push(redirectUrl);
      }, 2000);

    } catch (err: any) {
      console.error('Profile update error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Validation errors:', err.response?.data?.errors);
      
      // Show specific validation errors if available
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(`Validation failed: ${err.response.data.errors.join(', ')}`);
      } else {
        setError(err.response?.data?.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-3">
          <img
            src="/icons/logo.png"
            alt="Building Bharat"
            className="h-8"
          />
          <span className="text-lg font-bold text-[#005451]">Building Bharat</span>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-xs">
          <span className="text-gray-600 font-medium">FACING ISSUES? CONTACT US →</span>
          <a
            href="tel:+919767057237"
            className="text-[#4A90E2] flex items-center space-x-2 hover:underline"
          >
            <span>📞</span>
            <span>+91 9767057237</span>
          </a>
          <a
            href="mailto:support@buildingbharat.com"
            className="text-[#4A90E2] flex items-center space-x-2 hover:underline"
          >
            <span>✉️</span>
            <span>support@buildingbharat.com</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800">
          {isUpdating ? "Update your account details" : "We need a few more details to set your account"}
        </h1>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            {success}
          </div>
        )}

        {/* Loading State */}
        {isLoadingProfile ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A90E2]"></div>
            <span className="ml-3 text-gray-600">Loading your profile...</span>
          </div>
        ) : (
          /* Form Section */
          <form onSubmit={handleSubmit} className="space-y-12">
          {/* Profile Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-[#4A90E2]">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">Username (We will reserve this as Handle)</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] text-gray-800 text-sm"
                  placeholder="Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">Whatsapp Number</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="flex-shrink-0 w-32 px-2 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] bg-white text-gray-800 text-sm"
                  >
                    <option value="India (+91)">India (+91)</option>
                  </select>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="flex-1 min-w-0 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] text-gray-800 text-sm"
                    placeholder="Whatsapp Number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">State</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] bg-white text-gray-500 text-sm"
                >
                  <option value="">State</option>
                  <option>Andhra Pradesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Goa</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>West Bengal</option>
                  <option>Delhi</option>
                  <option>Jammu and Kashmir</option>
                  <option>Ladakh</option>
                </select>
              </div>
            </div>
          </div>

          {/* University Details */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-[#4A90E2]">University Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">University Name</span>
                  <span className="ml-2 text-gray-400">ℹ️</span>
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] bg-white text-gray-500 text-sm"
                >
                  <option value="">Select your university</option>
                  <option>Delhi University</option>
                  <option>Jawaharlal Nehru University</option>
                  <option>University of Mumbai</option>
                  <option>University of Calcutta</option>
                  <option>University of Madras</option>
                  <option>Aligarh Muslim University</option>
                  <option>Banaras Hindu University</option>
                  <option>University of Pune</option>
                  <option>Jamia Millia Islamia</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">Department</span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] text-gray-800 text-sm"
                  placeholder="Department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> <span className="text-[#4A90E2]">Graduation Year</span>
                </label>
                <input
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-[#4A90E2] text-gray-800 text-sm"
                  placeholder="Graduation year"
                />
              </div>
            </div>
          </div>

          {/* Footer Button Section */}
          <div className="flex justify-between items-center pt-8 mt-12">
            <button 
              type="button" 
              className="flex items-center text-gray-600 border border-gray-300 px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <span className="mr-2">←</span>
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-md hover:bg-[#1e40af] transition-colors font-medium flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  <span>{isUpdating ? 'Updating...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <span>{isUpdating ? 'Update' : 'Next'}</span>
                  <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default AccountSetupForm;