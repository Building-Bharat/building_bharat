'use client'
import React, { useState, useEffect } from 'react'
import OrderSummary from './(components)/OrderSummary'
import RazorpayModalCheckout from './(components)/RazorpayModalCheckout'
import { useSearchParams } from 'next/navigation'
import { courseAPI } from '@/lib/api'
import { toast } from 'react-toastify'

const CheckoutPage = () => {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId')
  const userId = searchParams.get('userId') || 'temp-user-id'
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        try {
          const courseData = await courseAPI.getCourse(courseId);
          setCourse(courseData);
        } catch (error) {
          console.error('Error fetching course:', error);
          // Create mock course data for testing
          setCourse({
            _id: courseId,
            title: 'Building Bharat Course',
            price: 999,
            description: 'Learn political consulting and governance',
            image: '/images/course-placeholder.jpg'
          });
          toast.warning('Using mock course data for testing');
        }
      } else {
        // Create mock course data if no courseId
        setCourse({
          _id: 'test-course-123',
          title: 'Building Bharat Course',
          price: 999,
          description: 'Learn political consulting and governance',
          image: '/images/course-placeholder.jpg'
        });
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  const handlePaymentSuccess = () => {
    toast.success('Payment successful! Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-200'>
      <div className="flex h-screen">
        {/* Left Side - Razorpay Modal Checkout */}
        <div className="flex-1 overflow-y-auto">
          <RazorpayModalCheckout 
            courseId={courseId || undefined} 
            userId={userId}
            course={course}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
        
        {/* Right Side - Order Summary */}
        <div className="w-96 bg-teal-700 p-6 overflow-y-auto">
          <OrderSummary 
            courseId={courseId || undefined} 
            userId={userId}
            course={course}
          />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
