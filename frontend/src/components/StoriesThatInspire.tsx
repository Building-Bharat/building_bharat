import React, { useState } from 'react';

export default function StoriesThatInspire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('');
  const [textDirection, setTextDirection] = useState('');

  const testimonials = [
    {
      id: 1,
      name: "Rahul Shetty",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tells",
      image: "/images/image 2.png",
      alt: "Rahul Shetty"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      quote: "This learning experience has been transformative for my career. The practical approach and expert guidance helped me achieve goals I never thought possible. Highly recommend to anyone looking to grow professionally.",
      image: "/images/image 3.png",
      alt: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Michael Chen",
      quote: "The supportive community and comprehensive curriculum made all the difference in my learning journey. I gained not just knowledge, but confidence to tackle new challenges in my field.",
      image: "/images/image 4.png",
      alt: "Michael Chen"
    }
  ];

  const handleImageClick = (clickDirection: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(clickDirection);
    setTextDirection(clickDirection);
    
    // Text slides out first (150ms), then content changes, then slides in
    setTimeout(() => {
      if (clickDirection === 'next') {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
      
      // Reset text direction to trigger slide-in animation
      setTimeout(() => {
        setTextDirection('');
      }, 10);
      
    }, 150); // Text slides out duration
    
    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
      setDirection('');
    }, 300);
  };

  const handleDotClick = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      const diff = index - currentIndex;
      const wrappedDiff = diff > testimonials.length / 2 ? diff - testimonials.length : 
                         diff < -testimonials.length / 2 ? diff + testimonials.length : diff;
      const clickDirection = wrappedDiff > 0 ? 'next' : 'prev';
      setDirection(clickDirection);
      setTextDirection(clickDirection);
      
      // Text slides out first, then content changes, then slides in
      setTimeout(() => {
        setCurrentIndex(index);
        
        // Reset text direction to trigger slide-in animation
        setTimeout(() => {
          setTextDirection('');
        }, 10);
        
      }, 150);
      
      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection('');
      }, 300);
    }
  };

  const getTestimonialIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const leftIndex = getTestimonialIndex(-1);
  const centerIndex = getTestimonialIndex(0);
  const rightIndex = getTestimonialIndex(1);

  return (
    <section 
      className="px-4 sm:px-6 md:px-8" 
      style={{ 
        background: '#E5E7EA', 
        width: 'auto', 
        height: 'auto', 
        minHeight: '578px', 
        margin: '0 auto' 
      }}
    >
      <div 
        className="container mx-auto text-center py-8 sm:py-12 md:py-16" 
        style={{ maxWidth: '1152px', height: 'auto', minHeight: '100%' }}
      >
        {/* Title */}
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
          style={{
            color: '#005451',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontStyle: 'normal',
            fontSize: 'clamp(20px, 4vw, 32px)',
            lineHeight: 'clamp(28px, 5vw, 38px)',
            letterSpacing: '0px',
            textAlign: 'center'
          }}
        >
          Stories That Inspire
        </h2>

        {/* Description */}
        <p 
          className="text-base sm:text-lg mb-6 sm:mb-8 text-black px-2 sm:px-4 md:px-6 lg:px-8 mx-auto"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(12px, 2.2vw, 16px)',
            lineHeight: 'clamp(18px, 3.2vw, 22px)',
            letterSpacing: '0px',
            textAlign: 'center',
            maxWidth: '95%',
            whiteSpace: 'nowrap'
          }}
        >
          Our learners share stories of growth, impact, and transformation — and we&apos;re proud to be part of their journey.
        </p>

        {/* Profile Pictures Container with 3D Perspective */}
        <div className="relative flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 h-32 md:h-40 testimonial-3d-container">
          
          {/* Left Profile Picture */}
          <div 
            className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer transform profile-image ${
              isTransitioning && direction === 'prev' ? 'animate-slide-left-to-center' : 
              isTransitioning && direction === 'next' ? 'animate-background-move-right' : ''
            }`}
            onClick={() => handleImageClick('prev')}
            style={{
              zIndex: isTransitioning ? (direction === 'prev' ? 5 : 1) : 2,
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              src={testimonials[leftIndex].image}
              alt={testimonials[leftIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Profile Picture (Larger) */}
          <div 
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 shadow-lg transform profile-image ${
              isTransitioning && direction === 'prev' ? 'animate-slide-center-to-right' : 
              isTransitioning && direction === 'next' ? 'animate-slide-center-to-left' : ''
            }`}
            style={{
              borderColor: '#F97C04', // Orange border
              zIndex: 3,
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              src={testimonials[centerIndex].image}
              alt={testimonials[centerIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Profile Picture */}
          <div 
            className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer transform profile-image ${
              isTransitioning && direction === 'next' ? 'animate-slide-right-to-center' : 
              isTransitioning && direction === 'prev' ? 'animate-background-move-left' : ''
            }`}
            onClick={() => handleImageClick('next')}
            style={{
              zIndex: isTransitioning ? (direction === 'next' ? 5 : 1) : 2,
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              src={testimonials[rightIndex].image}
              alt={testimonials[rightIndex].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation dots */}
          <div className="absolute -bottom-4 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-orange-500 w-6' : 'bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        <div 
          className="w-full sm:w-4/5 md:w-auto overflow-hidden"
          style={{
            width: '100%',
            maxWidth: '1152px',
            height: 'auto',
            minHeight: '72px',
            paddingTop: '16px',
            paddingRight: '8px',
            paddingBottom: '16px',
            paddingLeft: '8px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <blockquote 
            className={`italic text-black px-4 sm:px-6 md:px-0 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px] lg:max-w-[800px] xl:max-w-none ${
              textDirection === 'prev' 
                ? 'animate-text-slide-out-right' 
                : textDirection === 'next'
                ? 'animate-text-slide-out-left'
                : 'animate-text-slide-in'
            }`}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              lineHeight: 'clamp(20px, 3.5vw, 24px)',
              textAlign: 'center',
              margin: 0
            }}
          >
            {testimonials[centerIndex].quote}
          </blockquote>
        </div>

        {/* Attribution */}
        <div className="mb-6 mt-6 sm:mt-8 overflow-hidden">
          <p 
            className={`text-base sm:text-lg font-bold text-black mb-4 sm:mb-6 ${
              textDirection === 'prev' 
                ? 'animate-text-slide-out-right' 
                : textDirection === 'next'
                ? 'animate-text-slide-out-left'
                : 'animate-text-slide-in'
            }`}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(16px, 3vw, 18px)',
              lineHeight: 'clamp(20px, 4vw, 24px)'
            }}
          >
            {testimonials[centerIndex].name}
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
            {/* Twitter/X Icon */}
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-600" 
              style={{ background: '#544E4E' }}
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            {/* Instagram Icon */}
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-600" 
              style={{ background: '#544E4E' }}
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Text Sliding Animations */
        
        /* Text slides out to the left when going to next */
        @keyframes textSlideOutLeft {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        /* Text slides out to the right when going to prev */
        @keyframes textSlideOutRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        /* Text slides in from appropriate direction after content change */
        @keyframes textSlideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes textSlideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes textSlideIn {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* Animation Classes for Text */
        .animate-text-slide-out-left {
          animation: textSlideOutLeft 0.15s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        .animate-text-slide-out-right {
          animation: textSlideOutRight 0.15s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        .animate-text-slide-in {
          animation: textSlideIn 0.15s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        /* Improved Smooth Sliding Animations - Direct Movement with Fast Scaling */
        
        /* Left to Center Animation - Smooth Direct Slide */
        @keyframes slideLeftToCenter {
          0% {
            transform: translateX(0) scale(0.8);
            border-width: 2px;
            border-color: #d1d5db;
          }
          15% {
            transform: translateX(20px) scale(0.85);
            border-width: 2.2px;
          }
          30% {
            transform: translateX(45px) scale(0.95);
            border-width: 2.6px;
          }
          50% {
            transform: translateX(70px) scale(1.1);
            border-width: 3.2px;
          }
          70% {
            transform: translateX(90px) scale(1.25);
            border-width: 3.7px;
          }
          85% {
            transform: translateX(98px) scale(1.31);
            border-width: 3.9px;
            border-color: #F97C04;
          }
          100% {
            transform: translateX(100px) scale(1.33);
            border-width: 4px;
            border-color: #F97C04;
          }
        }
        
        /* Center to Right Animation - Smooth Direct Slide with Fast Shrinking */
        @keyframes slideCenterToRight {
          0% {
            transform: translateX(0) scale(1.33);
            border-width: 4px;
            border-color: #F97C04;
          }
          20% {
            transform: translateX(25px) scale(1.15);
            border-width: 3.5px;
          }
          40% {
            transform: translateX(55px) scale(0.95);
            border-width: 2.8px;
          }
          60% {
            transform: translateX(80px) scale(0.85);
            border-width: 2.3px;
            border-color: #d1d5db;
          }
          80% {
            transform: translateX(95px) scale(0.82);
            border-width: 2.1px;
          }
          100% {
            transform: translateX(100px) scale(0.8);
            border-width: 2px;
            border-color: #d1d5db;
          }
        }
        
        /* Right to Center Animation - Smooth Direct Slide */
        @keyframes slideRightToCenter {
          0% {
            transform: translateX(0) scale(0.8);
            border-width: 2px;
            border-color: #d1d5db;
          }
          15% {
            transform: translateX(-20px) scale(0.85);
            border-width: 2.2px;
          }
          30% {
            transform: translateX(-45px) scale(0.95);
            border-width: 2.6px;
          }
          50% {
            transform: translateX(-70px) scale(1.1);
            border-width: 3.2px;
          }
          70% {
            transform: translateX(-90px) scale(1.25);
            border-width: 3.7px;
          }
          85% {
            transform: translateX(-98px) scale(1.31);
            border-width: 3.9px;
            border-color: #F97C04;
          }
          100% {
            transform: translateX(-100px) scale(1.33);
            border-width: 4px;
            border-color: #F97C04;
          }
        }
        
        /* Center to Left Animation - Smooth Direct Slide with Fast Shrinking */
        @keyframes slideCenterToLeft {
          0% {
            transform: translateX(0) scale(1.33);
            border-width: 4px;
            border-color: #F97C04;
          }
          20% {
            transform: translateX(-25px) scale(1.15);
            border-width: 3.5px;
          }
          40% {
            transform: translateX(-55px) scale(0.95);
            border-width: 2.8px;
          }
          60% {
            transform: translateX(-80px) scale(0.85);
            border-width: 2.3px;
            border-color: #d1d5db;
          }
          80% {
            transform: translateX(-95px) scale(0.82);
            border-width: 2.1px;
          }
          100% {
            transform: translateX(-100px) scale(0.8);
            border-width: 2px;
            border-color: #d1d5db;
          }
        }
        
        /* Background Movement - Keep the original smooth back movement */
        @keyframes backgroundMoveLeft {
          0% {
            transform: translateX(0) translateZ(0) translateY(0) scale(0.8);
          }
          20% {
            transform: translateX(-40px) translateZ(-25px) translateY(3px) scale(0.75);
          }
          40% {
            transform: translateX(-100px) translateZ(-40px) translateY(6px) scale(0.68);
          }
          60% {
            transform: translateX(-160px) translateZ(-35px) translateY(4px) scale(0.72);
          }
          80% {
            transform: translateX(-180px) translateZ(-15px) translateY(2px) scale(0.76);
          }
          100% {
            transform: translateX(-200px) translateZ(0) translateY(0) scale(0.8);
          }
        }
        
        @keyframes backgroundMoveRight {
          0% {
            transform: translateX(0) translateZ(0) translateY(0) scale(0.8);
          }
          20% {
            transform: translateX(40px) translateZ(-25px) translateY(3px) scale(0.75);
          }
          40% {
            transform: translateX(100px) translateZ(-40px) translateY(6px) scale(0.68);
          }
          60% {
            transform: translateX(160px) translateZ(-35px) translateY(4px) scale(0.72);
          }
          80% {
            transform: translateX(180px) translateZ(-15px) translateY(2px) scale(0.76);
          }
          100% {
            transform: translateX(200px) translateZ(0) translateY(0) scale(0.8);
          }
        }
        
        /* Animation Classes with faster, smoother timing */
        .animate-slide-left-to-center {
          animation: slideLeftToCenter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-center-to-right {
          animation: slideCenterToRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-right-to-center {
          animation: slideRightToCenter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-center-to-left {
          animation: slideCenterToLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-background-move-left {
          animation: backgroundMoveLeft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-background-move-right {
          animation: backgroundMoveRight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        /* Enhanced 3D perspective container */
        .testimonial-3d-container {
          perspective: 1200px;
          perspective-origin: center center;
        }
        
        /* Enhanced profile image styling with hardware acceleration */
        .profile-image {
          transform-style: preserve-3d;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
        }
        
        .profile-image:hover:not([class*="animate-"]) {
          transform: scale(1.05);
          filter: brightness(1.1);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        /* Optimized text transitions */
        .content-fade {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }
        
        /* Performance optimizations */
        * {
          box-sizing: border-box;
        }
        
        img {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}