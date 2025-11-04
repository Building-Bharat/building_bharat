"use client";

import React, { useState, useEffect } from 'react'
import CheckOutHeader from '../coupon-code/(component)/CheckOutHeader'
import { ShieldCheck} from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { orderAPI } from '@/lib/api';

const OrderSummary = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [originalPrice, setOriginalPrice] = useState(6999);
  const [finalPrice, setFinalPrice] = useState(6999);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed' | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load coupon data from localStorage
  useEffect(() => {
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        const couponData = JSON.parse(savedCoupon);
        setCouponCode(couponData.code);
        setDiscount(couponData.discount);
        setDiscountType(couponData.discountType);
        setFinalPrice(couponData.finalPrice);
        setDiscountAmount(originalPrice - couponData.finalPrice);
      } catch (error) {
        console.error('Error loading coupon data:', error);
      }
    }
  }, [originalPrice]);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if Razorpay is already available
        if ((window as any).Razorpay) {
          console.log('✅ Razorpay already loaded');
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        // Check if script is already in DOM
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
          console.log('✅ Razorpay script already in DOM');
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        console.log('📦 Loading Razorpay script...');
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('✅ Razorpay script loaded successfully');
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error('❌ Failed to load Razorpay script');
          toast.error('Failed to load payment system');
          resolve(false);
        };
        document.head.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast.error('Payment system is loading, please wait...');
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem('userId') || 'temp-user-id';
      
      // Prepare coupon data if applied
      const couponData = couponCode ? {
        code: couponCode,
        originalPrice,
        finalPrice,
        discountAmount,
        discountType
      } : null;

      console.log('Creating order with coupon data:', couponData);

      // Create order through API
      const order = await orderAPI.createOrder(
        courseId || 'default-course',
        userId,
        couponData
      );

      console.log('Order created:', order);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
        amount: finalPrice * 100, // Amount in paise (discounted amount)
        currency: 'INR',
        name: 'Building Bharat',
        description: 'AZ Premium: Take your DSA & CP Skills to the Zenith',
        order_id: order.payment_order_id || order.order?.orderId,
        handler: async (response: any) => {
          try {
            console.log('✅ Payment successful:', response);
            
            // Verify payment signature on backend
            try {
              const verifyResponse = await orderAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              
              console.log('✅ Payment verified:', verifyResponse);
              toast.success('Payment verified! Course added to your account.');
            } catch (verifyError: any) {
              console.error('❌ Payment verification failed:', verifyError);
              toast.error(verifyError.response?.data?.message || 'Payment verification failed. Please contact support.');
              return; // Don't proceed if verification fails
            }
            
            // Clear coupon data after successful payment
            localStorage.removeItem('appliedCoupon');
            
            // Redirect to dashboard
            toast.info('Redirecting to dashboard...');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 2000);
          } catch (error) {
            console.error('Payment processing failed:', error);
            toast.error('Payment processing failed. Please contact support.');
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        notes: {
          course_id: courseId || 'default-course',
          user_id: userId,
          coupon_code: couponCode || '',
          original_price: originalPrice,
          discount_amount: discountAmount,
          final_price: finalPrice
        },
        theme: { color: '#005451' },
        modal: { 
          ondismiss: () => { 
            setLoading(false);
            toast.info('Payment cancelled');
          } 
        },
      };

      if (!(window as any).Razorpay) {
        console.error('❌ Razorpay not available on window object');
        throw new Error('Razorpay not loaded');
      }

      console.log('🚀 Opening Razorpay with options:', options);
      
      try {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.on('payment.failed', function (response: any){
          console.error('Payment failed:', response.error);
          toast.error(`Payment Failed: ${response.error.description}`);
          setLoading(false);
        });
        razorpay.open();
      } catch (razorpayError: any) {
        console.error('❌ Razorpay initialization error:', razorpayError);
        
        // Check if it's a test key issue
        if (razorpayError.message && razorpayError.message.includes('key')) {
          toast.error('Invalid Razorpay credentials. Please contact administrator.');
        } else {
          toast.error('Failed to open payment gateway. Please try again.');
        }
        setLoading(false);
      }

    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      toast.error(error.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <section className=' bg-gray-100 pb-8 min-h-screen'>
              <CheckOutHeader/>
              <div className="flex flex-col lg:flex-row w-full px-8 md:px-28 items-center gap-2 sm:gap-16 lg:gap-8 mt-6 ">

              {/* Left Section — Certification Info */}
              <div className="flex flex-col w-full space-y-6">
                  <h1 className=" text-lg md:text-3xl sm:text-4xl font-Montserrat font-bold text-black leading-snug"> Enhance your Programming Journey by Getting Certified! </h1>

                  {/* Certificate Image */}
                  <div className="w-full">
                  <img
                      src="/images/certificate.png"
                      alt="Certificate"
                      className="w-full rounded-xl shadow-md object-cover"
                  />
                  </div>

                  {/* Info Cards */}
                  <div className="flex flex-col sm:flex-row  items-start sm:items-center justify-between gap-6 sm:gap-12 p-4">
                  
                  {/* EMI Info */}
                  <div className="flex-1 space-y-2">
                      <p className="text-[#005451] font-semibold font-Montserrat text-sm sm:text-base">NO COST EMI</p>
                      <p className="text-gray-600 text-sm font-Montserrat"> Easy on your wallet. Choose no-cost EMI while paying with credit cards.</p>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-20 bg-[#005451]" />

                  {/* Secure Payment */}
                  <div className="flex-1">
                      <p className="text-[#005451] text-sm sm:text-base text-center font-semibold font-Montserrat xl:whitespace-nowrap">100% SAFE & SECURE PAYMENT</p>
                      <img
                      src="/images/razorpay.png"
                      alt="Razorpay secure payment"
                      className="h-8 mt-2 object-contain"
                      />
                  </div>
                  </div>
              </div>



              {/* Right Section — Order Summary */}
              <div className="flex w-full ">
                  <div className="flex flex-col items-center bg-white border  border-teal-500 rounded-xl shadow-sm overflow-hidden w-full">

                  {/* Top Section */}
                  <div className="flex flex-col flex-wrap xl:flex-nowrap sm:flex-row items-center sm:items-start gap-4 p-3 sm:p-6">
                      <img
                      src="/images/course.png"
                      alt="Course thumbnail"
                      className="w-full lg:w-64 sm:h-40 rounded-lg object-cover mx-auto"
                      />
                      <div className="flex flex-col justify-center text-center sm:text-left">
                          <p className="font-Montserrat font-bold text-base sm:text-lg text-gray-900">
                              AZ Premium: Take your DSA & CP Skills to the Zenith
                          </p>
                          <p className="font-Montserrat text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                              Experience Coding Success with AlgoZenith Premium Competitive Coding Training.
                          </p>
                      </div>
                  </div>

                     <div className='flex flex-col w-full px-6 font-Montserrat'>
                          <div className='border-b w-full py-3 sm:py-5 flex items-center justify-between font-bold text-md'>
                                <p>Course Price</p>
                                <p>₹{originalPrice.toLocaleString()}</p>
                          </div>
                          <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-md'>
                                <p>Subtotal</p>
                                <p>₹{originalPrice.toLocaleString()}</p>
                          </div>
                          {discountAmount > 0 && (
                            <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-md text-green-600'>
                                  <p>
                                    Discount ({couponCode})
                                    <span className="text-xs ml-1">
                                      {discountType === 'percentage' ? `${discount}% OFF` : `₹${discount} OFF`}
                                    </span>
                                  </p>
                                  <p>-₹{discountAmount.toLocaleString()}</p>
                            </div>
                          )}
                          <div className='border-b w-full flex py-3 sm:py-5 items-center justify-between font-bold text-lg'>
                                <p>Total</p>
                                <p className={discountAmount > 0 ? 'text-green-600' : ''}>
                                  ₹{finalPrice.toLocaleString()}
                                </p>
                          </div>
                          {discountAmount > 0 && (
                            <div className='text-center py-2'>
                              <p className='text-green-600 font-semibold text-sm'>
                                🎉 You saved ₹{discountAmount.toLocaleString()} with coupon {couponCode}!
                              </p>
                            </div>
                          )}
                           <button 
                             onClick={handlePayment}
                             disabled={loading || !razorpayLoaded}
                             className='w-full py-3 my-8 bg-[#005451] rounded-lg text-white font-Montserrat text-base flex items-center justify-center hover:bg-[#003d3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                           >
                             {loading ? (
                               <>
                                 <span className="animate-spin mr-2">⏳</span>
                                 Processing...
                               </>
                             ) : (
                               <>
                                 Pay ₹{finalPrice.toLocaleString()} Securely<ShieldCheck className='w-7 pl-2' />
                               </>
                             )}
                           </button>
                     </div>                 
                  </div>
                </div>
              </div>


      </section>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )

}

export default OrderSummary
