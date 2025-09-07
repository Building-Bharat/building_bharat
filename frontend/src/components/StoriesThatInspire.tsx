import React, { useState, useEffect, useRef } from 'react';

export default function StoriesThatInspire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('');
  const [textDirection, setTextDirection] = useState('');
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [descriptionAnimated, setDescriptionAnimated] = useState(false);
  const [imagesAnimated, setImagesAnimated] = useState(false);
  const [quoteAnimated, setQuoteAnimated] = useState(false);
  const [iconsAnimated, setIconsAnimated] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Shetty",
      quote: "“ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tells ”",
      image: "/images/image 2.png",
      alt: "Rahul Shetty"
    },
    {
      id: 2,
      name: "Michael Chen",
      quote: "“ This learning experience has been transformative for my career. The practical approach and expert guidance helped me achieve goals I never thought possible. Highly recommend to anyone looking to grow professionally. ”",
      image: "/images/image 3.png",
      alt: "Michael Chen"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      quote: "“ The supportive community and comprehensive curriculum made all the difference in my learning journey. I gained not just knowledge, but confidence to tackle new challenges in my field. ”",
      image: "/images/image 4.png",
      alt: "Sarah Johnson"
    }
  ];

  const handleImageClick = (clickDirection: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(clickDirection);
    setTextDirection(clickDirection);
    
    // Text slides out first (300ms), then content changes, then slides in
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
      
    }, 300); // Text slides out duration (slower for smoothness)
    
    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
      setDirection('');
    }, 600);
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
      
      // Text slides out first (300ms), then content changes, then slides in
      setTimeout(() => {
        setCurrentIndex(index);
        
        // Reset text direction to trigger slide-in animation
        setTimeout(() => {
          setTextDirection('');
        }, 10);
        
      }, 300);
      
      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection('');
      }, 600);
    }
  };

  const getTestimonialIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const leftIndex = getTestimonialIndex(-1);
  const centerIndex = getTestimonialIndex(0);
  const rightIndex = getTestimonialIndex(1);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start sequential animations
            setTimeout(() => setTitleAnimated(true), 200);
            setTimeout(() => setDescriptionAnimated(true), 600);
            setTimeout(() => setImagesAnimated(true), 1000);
            setTimeout(() => setQuoteAnimated(true), 1400);
            setTimeout(() => setIconsAnimated(true), 1800);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
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
          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
            titleAnimated ? 'animate-title-float-in' : 'animate-title-float-out'
          }`}
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
          className={`text-base sm:text-lg mb-6 sm:mb-8 text-black px-2 sm:px-4 md:px-6 lg:px-8 mx-auto whitespace-normal md:whitespace-normal lg:whitespace-nowrap transition-all duration-1000 ease-out ${
            descriptionAnimated ? 'animate-description-float-in' : 'animate-description-float-out'
          }`}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(12px, 1.8vw, 16px)',
            lineHeight: 'clamp(18px, 2.8vw, 22px)',
            letterSpacing: '0px',
            textAlign: 'center',
            maxWidth: '95%'
          }}
        >
          Our learners share stories of growth, impact, and transformation — and we&apos;re proud to be part of their journey.
        </p>

        {/* Profile Pictures Container with 3D Perspective */}
        <div className={`relative flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 h-32 md:h-40 testimonial-3d-container transition-all duration-1000 ease-out ${
          imagesAnimated ? 'animate-images-float-in' : 'animate-images-float-out'
        }`}>
          
          {/* Left Profile Picture */}
          <div 
            className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer transform profile-image side-image ${
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
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 shadow-lg transform profile-image center-image ${
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
            className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer transform profile-image side-image ${
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
          className={`w-full sm:w-4/5 md:w-auto overflow-hidden transition-all duration-1000 ease-out ${
            quoteAnimated ? 'animate-quote-float-in' : 'animate-quote-float-out'
          }`}
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
            className={` text-black px-4 sm:px-6 md:px-0 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px] lg:max-w-[800px] xl:max-w-none ${
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
        <div className={`mb-6 mt-6 sm:mt-8 overflow-hidden transition-all duration-1000 ease-out ${
          quoteAnimated ? 'animate-name-float-in' : 'animate-name-float-out'
        }`}>
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
          <div className={`flex items-center justify-center gap-4 sm:gap-6 mb-8 transition-all duration-1000 ease-out ${
            iconsAnimated ? 'animate-icons-float-in' : 'animate-icons-float-out'
          }`}>
            {/* College Icon */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-600" 
                style={{ background: '#544E4E' }}
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <span 
                className="text-xs text-gray-600 font-medium"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  lineHeight: '16px',
                  textAlign: 'center'
                }}
              >
                College
              </span>
            </div>

            {/* LinkedIn Icon */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-600" 
                style={{ background: '#544E4E' }}
              >
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span 
                className="text-xs text-gray-600 font-medium"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  lineHeight: '16px',
                  textAlign: 'center'
                }}
              >
                LinkedIn
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Scroll-triggered Float Animations */
        
        /* Title float animations */
        @keyframes titleFloatIn {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes titleFloatOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
        
        /* Description float animations */
        @keyframes descriptionFloatIn {
          0% {
            transform: translateY(40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes descriptionFloatOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(40px);
            opacity: 0;
          }
        }
        
        /* Images float animations */
        @keyframes imagesFloatIn {
          0% {
            transform: translateY(60px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes imagesFloatOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(60px);
            opacity: 0;
          }
        }
        
                /* Quote float animations */
        @keyframes quoteFloatIn {
          0% {
            transform: translateY(40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes quoteFloatOut {
          0% {
            transform: translateY(0);
            opacity: 1;
           }
           100% {
             transform: translateY(40px);
             opacity: 0;
           }
         }
         
         /* Name float animations */
         @keyframes nameFloatIn {
           0% {
             transform: translateY(40px);
             opacity: 0;
           }
           100% {
             transform: translateY(0);
             opacity: 1;
           }
         }
         
         @keyframes nameFloatOut {
           0% {
             transform: translateY(0);
             opacity: 1;
           }
           100% {
             transform: translateY(40px);
             opacity: 0;
           }
         }
        
        /* Icons float animations */
        @keyframes iconsFloatIn {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes iconsFloatOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }
        
        /* Animation Classes for Scroll-triggered animations */
        .animate-title-float-in {
          animation: titleFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-title-float-out {
          animation: titleFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-description-float-in {
          animation: descriptionFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-description-float-out {
          animation: descriptionFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-images-float-in {
          animation: imagesFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-images-float-out {
          animation: imagesFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-quote-float-in {
          animation: quoteFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-quote-float-out {
          animation: quoteFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-name-float-in {
          animation: nameFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-name-float-out {
          animation: nameFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-icons-float-in {
          animation: iconsFloatIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-icons-float-out {
          animation: iconsFloatOut 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
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
          animation: textSlideOutLeft 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        .animate-text-slide-out-right {
          animation: textSlideOutRight 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
        
        .animate-text-slide-in {
          animation: textSlideIn 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
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
        
        /* Center image - permanently bright, no hover effect */
        .center-image {
          filter: brightness(1.1);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        /* Side images - dull by default, glow on hover */
        .side-image {
          filter: brightness(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .side-image:hover:not([class*="animate-"]) {
          filter: brightness(1.1);
          transform: scale(1.05);
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