'use client'
import React, { useState, useEffect, useRef } from 'react'
import { orderAPI } from '@/lib/api'
import { toast } from 'react-toastify'

interface RazorpayModalCheckoutProps {
  courseId?: string;
  userId?: string;
  course?: any;
  onPaymentSuccess?: () => void;
}

const RazorpayModalCheckout: React.FC<RazorpayModalCheckoutProps> = ({ 
  courseId, 
  userId, 
  course, 
  onPaymentSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openedRef = useRef(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          setError('Failed to load Razorpay script');
          resolve(false);
        };
        document.head.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const openRazorpay = async () => {
    if (!razorpayLoaded) {
      toast.error('Payment system is loading, please wait...');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let options: any;

      if (courseId && userId) {
        // Real flow: create order on backend
        const order = await orderAPI.createOrder(courseId, userId);
        options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
          amount: order.order.price * 100,
          currency: 'INR',
          name: 'Building Bharat',
          description: `Course: ${course?.title || 'Building Bharat Course'}`,
          order_id: order.order.orderId,
          handler: async (response: any) => {
            try {
              await orderAPI.verifyPayment(order.order.orderId, response);
              toast.success('Payment successful! You now have access to the course.');
              if (onPaymentSuccess) {
                onPaymentSuccess();
              } else {
                window.location.href = '/dashboard';
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              toast.error('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9999999999',
          },
          notes: {
            course_id: courseId,
            user_id: userId,
          },
          theme: { color: '#F97C04' },
          modal: { ondismiss: () => { openedRef.current = false; } },
        };
      } else {
        // Mock flow: no order_id, open modal just for UI testing
        const mockAmount = (course?.price || 999) * 100;
        options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
          amount: mockAmount,
          currency: 'INR',
          name: 'Building Bharat (Test)',
          description: `Course: ${course?.title || 'Test Course'}`,
          // No order_id here – Razorpay allows opening checkout without Orders API in test
          handler: () => {
            toast.success('Test payment flow opened (no backend order).');
          },
          prefill: {
            name: 'Test User',
            email: 'test@example.com',
            contact: '9999999999',
          },
          notes: { mode: 'mock' },
          theme: { color: '#F97C04' },
          modal: { ondismiss: () => { openedRef.current = false; } },
        };
      }

      // Create Razorpay instance and open modal
      // @ts-ignore
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Failed to process payment. Please try again.');
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-open on mount when ready
  useEffect(() => {
    if (!openedRef.current && razorpayLoaded && courseId && userId) {
      openedRef.current = true;
      openRazorpay().catch(() => {});
    }
  }, [razorpayLoaded, courseId, userId]);

  if (error) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Payment</h1>
        
        {/* Course Information */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {course?.title || 'Building Bharat Course'}
          </h2>
          <p className="text-gray-600 mb-4">
            {course?.description || 'Learn political consulting and governance'}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">
              ₹{course?.price || '0'}
            </span>
            <span className="text-sm text-gray-500">VAT included</span>
          </div>
        </div>

        {/* Payment Method Info */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Razorpay</h4>
              <p className="text-sm text-gray-600">Secure payment gateway</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>• Credit/Debit Cards</div>
            <div>• Net Banking</div>
            <div>• UPI</div>
            <div>• Wallets</div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">🔒</span>
              <span className="text-sm text-gray-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-600">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">🛡️</span>
              <span className="text-sm text-gray-600">Fraud Protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">⚡</span>
              <span className="text-sm text-gray-600">Instant Processing</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={openRazorpay}
          disabled={loading || !razorpayLoaded}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
            loading || !razorpayLoaded
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
          }`}
        >
          {loading ? 'Processing...' : 
           !razorpayLoaded ? 'Loading Payment System...' : 
           `Pay ₹${course?.price || '0'}`}
        </button>

        {/* Status */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {razorpayLoaded ? '✅ Payment system ready' : '⏳ Loading payment system...'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Powered by Razorpay - India's leading payment gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default RazorpayModalCheckout;
