'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const Coupon = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed' | null>(null);
  const [originalPrice, setOriginalPrice] = useState(6999);
  const [finalPrice, setFinalPrice] = useState(6999);
  const [couponApplied, setCouponApplied] = useState(false);

  // Load coupon state from localStorage on component mount
  useEffect(() => {
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      try {
        const couponData = JSON.parse(savedCoupon);
        setCouponCode(couponData.code);
        setDiscount(couponData.discount);
        setDiscountType(couponData.discountType);
        setFinalPrice(couponData.finalPrice);
        setCouponApplied(true);
        
        // Calculate and show success message
        const discountAmount = originalPrice - couponData.finalPrice;
        const discountText = couponData.discountType === 'percentage' 
          ? `${couponData.discount}% off` 
          : `₹${couponData.discount} off`;
        setSuccess(`🎉 Coupon applied! You saved ₹${discountAmount.toLocaleString()} (${discountText})`);
      } catch (error) {
        console.error('Error loading saved coupon:', error);
        localStorage.removeItem('appliedCoupon');
      }
    }
  }, [originalPrice]);

  // Calculate final price when discount changes
  useEffect(() => {
    if (discount > 0 && discountType) {
      let discountAmount;
      if (discountType === 'percentage') {
        discountAmount = (originalPrice * discount) / 100;
      } else if (discountType === 'fixed') {
        discountAmount = discount;
      }
      setFinalPrice(Math.max(0, originalPrice - discountAmount));
    } else {
      setFinalPrice(originalPrice);
    }
  }, [discount, originalPrice, discountType]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log('🔍 Validating coupon:', couponCode.trim());
      
      const response = await fetch(`http://localhost:5000/api/coupon/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: couponCode.trim(),
          courseId,
          originalPrice
        }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      if (data.valid) {
        setDiscount(data.discountValue);
        setDiscountType(data.coupon.discountType);
        
        // Calculate discount amount based on type
        let discountAmount;
        let discountText;
        if (data.coupon.discountType === 'percentage') {
          discountAmount = Math.round((originalPrice * data.discountValue) / 100);
          discountText = `${data.discountValue}% off`;
        } else if (data.coupon.discountType === 'fixed') {
          discountAmount = data.discountValue;
          discountText = `₹${data.discountValue} off`;
        }
        
        setSuccess(`🎉 Coupon applied! You saved ₹${discountAmount.toLocaleString()} (${discountText})`);
        setCouponApplied(true);
        
        // Store coupon info in localStorage for checkout
        localStorage.setItem('appliedCoupon', JSON.stringify({
          code: couponCode.trim(),
          discount: data.discountValue,
          discountType: data.coupon.discountType,
          originalPrice,
          finalPrice: data.finalAmount
        }));
      } else {
        setError(data.message || "Invalid or expired coupon code");
        setDiscount(0);
        setDiscountType(null);
        setCouponApplied(false);
        localStorage.removeItem('appliedCoupon');
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      setError("Failed to connect to server. Please check if backend is running.");
      setDiscount(0);
      setCouponApplied(false);
      localStorage.removeItem('appliedCoupon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setDiscountType(null);
    setSuccess("");
    setError("");
    setCouponApplied(false);
    localStorage.removeItem('appliedCoupon');
  };

  const handleCompleteOrder = () => {
    // Redirect to order-summary with coupon applied
    const params = new URLSearchParams();
    if (courseId) params.set('courseId', courseId);
    
    router.push(`/order-summary?${params.toString()}`);
  };

  // Test backend connection
  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coupon/test');
      const data = await response.json();
      console.log('Backend test:', data);
    } catch (error) {
      console.error('Backend connection failed:', error);
    }
  };

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);


  return (
     <section className='pb-12'>
          <div className='w-full px-4 sm:px-16 md:px-24 lg:px-32'>              
               <h1 className='text-center text-md sm:text-2xl lg:text-4xl text-black my-8 font-bold font-Montserrat'>Choose a payment plan that suits your mode of Investment</h1>
                <div className="flex flex-col xl:flex-row w-full items-stretch justify-center gap-6">
                    {/* Coupon Form */}
                    <div className="w-full flex-1">
                        <form onSubmit={handleApplyCoupon} className="flex flex-col justify-between h-full bg-white border border-teal-500 p-4 rounded-xl shadow-sm">
                        <div className="w-full">
                            <p className="text-gray-700 font-medium mb-1 font-Montserrat py-4 text-md">
                            Coupon / Referral Code (If Any)
                            </p>
                            
                            {/* Error/Success Messages */}
                            {error && (
                              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md mb-3 text-sm">
                                {error}
                              </div>
                            )}
                            {success && (
                              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md mb-3 text-sm">
                                {success}
                              </div>
                            )}
                            
                            <div className="relative w-full">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter Code (e.g., DIWALI2025)"
                                className="w-full px-4 py-2 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 text-gray-800"
                                disabled={couponApplied}
                            />
                            {!couponApplied ? (
                              <button
                                  type="submit"
                                  disabled={isLoading}
                                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 font-Montserrat text-white font-medium px-5 rounded-md hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 transition-all duration-300 shadow-md disabled:opacity-50"
                              >
                                  {isLoading ? "..." : "Apply"}
                              </button>
                            ) : (
                              <button
                                  type="button"
                                  onClick={handleRemoveCoupon}
                                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-red-600 to-red-700 font-Montserrat text-white font-medium px-4 rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md text-sm"
                              >
                                  Remove
                              </button>
                            )}
                            </div>
                        </div>

                        <div className={`w-full border my-4 p-2 rounded-lg text-center font-Montserrat text-xs sm:text-sm font-semibold ${
                          couponApplied 
                            ? 'border-green-500 text-green-700 bg-green-100' 
                            : 'border-teal-500 text-[#005451] bg-teal-100'
                        }`}>
                            {couponApplied 
                              ? `🎉 Coupon Applied! You're saving ₹${(originalPrice - finalPrice).toLocaleString()}` 
                              : 'Apply a Coupon/Referral Code to unlock even more discounts!'
                            }
                        </div>
                        </form>
                    </div>

                    {/* Course Brief */}
                    <div className="w-full flex-1">
                        <div className="flex flex-col justify-between h-full bg-white border border-teal-500 rounded-xl shadow-sm overflow-hidden">
                        {/* Top Section */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6">
                            <img
                            src="/images/course.png"
                            alt="Course thumbnail"
                            className="w-full sm:w-72 sm:h-32 rounded-lg object-cover"
                            />
                            <div className="flex flex-col justify-center text-center sm:text-left">
                            <p className="font-Montserrat font-bold text-base sm:text-lg text-gray-900">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus excepturi alias necessitatibus
                            </p>
                            <p className="font-Montserrat text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                                Experience Coding Success with AlgoZenith Premium Competitive Coding Training 
                            </p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col sm:flex-row w-full">
                            <div className="flex-1 bg-[#005451] text-teal-100 text-center font-Montserrat font-bold py-3 text-base sm:text-lg">
                            {discount > 0 ? (
                              <div className="flex flex-col">
                                <span className="line-through text-sm opacity-75">₹{originalPrice.toLocaleString()}</span>
                                <span>₹{finalPrice.toLocaleString()} <span className="text-sm font-normal">(Inc. GST)</span></span>
                              </div>
                            ) : (
                              <>₹{originalPrice.toLocaleString()} <span className="text-sm font-normal">(Inc. GST)</span></>
                            )}
                            </div>
                            <div className="flex-1 bg-teal-100 text-[#005451] text-center font-Montserrat font-medium py-3 text-sm sm:text-lg flex flex-col sm:flex-row items-center justify-center gap-2">
                            {discount > 0 && discountType ? (
                              <div className="flex flex-col items-center">
                                <p className="font-semibold text-green-600">
                                  {discountType === 'percentage' ? `${discount}% OFF` : `₹${discount} OFF`}
                                </p>
                                <p className="text-xs">Coupon Applied!</p>
                              </div>
                            ) : (
                              <>
                                <p>Valid until</p>
                                <p className="font-semibold">12:34:34</p>
                              </>
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>



                 {/* select payment plan  */}
                 <div className='p-4 bg-white my-8 rounded-xl border border-teal-500'>
                        <p className=' text-base sm:text-xl font-extrabold font-Montserrat text-gray-500'>Select Payment Plans</p>
                        <div className='flex space-x-3 items-center justify-start font-bold my-4 font-Montserrat'>
                             <div className='bg-black w-4 h-4 rounded-full flex items-center justify-center'>
                                  <div className='bg-white w-[6px] h-[6px] rounded-full'></div>
                             </div>
                            <div className="flex items-center gap-2">
                              {discount > 0 && (
                                <span className="line-through text-gray-500 text-sm">₹{originalPrice.toLocaleString()}</span>
                              )}
                              <p>₹{finalPrice.toLocaleString()}</p>
                              {discount > 0 && discountType && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                  {discountType === 'percentage' ? `${discount}% OFF` : `₹${discount} OFF`}
                                </span>
                              )}
                            </div>
                        </div>
                        <button 
                            onClick={handleCompleteOrder}
                            className='w-full mt-8 mb-2 flex items-center justify-center py-3 bg-gradient-to-r from-[#005451] via-teal-700 to-teal-600 rounded-lg text-white font-Montserrat font-medium hover:from-teal-700 hover:via-teal-800 hover:to-teal-900 transition-all duration-500'
                        >
                            Complete Order <ArrowRight className='ml-2 w-5'/>  
                        </button>
                 </div>

                 {/* back  */}
                 <button 
                    onClick={() => {
                      const backUrl = courseId 
                        ? `/account-setup?courseId=${courseId}` 
                        : '/account-setup';
                      router.push(backUrl);
                    }}
                    type="submit"
                    className="bg-gradient-to-r flex items-center text-teal-900 justify-center px-8 py-3 from-white via-gray-100 to-gray-300 font-Montserrat transition-all duration-500 font-semibold border rounded-md hover:from-gray-100 hover:via-gray-300 hover:to-gray-400 "
                    >
                      <ArrowLeft className='mr-2 w-5'/>  
                      Back
                </button>


          </div>        
     </section>
  )
}

export default Coupon
