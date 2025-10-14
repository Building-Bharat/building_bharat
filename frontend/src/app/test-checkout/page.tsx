'use client'
import React from 'react'
import Link from 'next/link'

const TestCheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Test Checkout</h1>
        <p className="text-gray-600 text-center mb-6">
          Click the button below to test the Razorpay checkout integration
        </p>
        <Link 
          href="/checkout?courseId=test-course-123&userId=test-user-456"
          className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center block"
        >
          Test Checkout Flow
        </Link>
        <div className="mt-4 text-sm text-gray-500">
          <p>Course ID: test-course-123</p>
          <p>User ID: test-user-456</p>
        </div>
      </div>
    </div>
  )
}

export default TestCheckoutPage

