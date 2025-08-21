"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AnimatedStates() {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    // Shared timing config
    const rotationDuration = 800; // Faster: ~0.8s per rotation
    const pauseDuration = 500; // 0.5s pause after each rotation

    const startAnimation = () => {
      setIsRotating(true);
      
      const startRotation = rotation;
      const targetRotation = rotation + 60; // 60 degrees for each position (360/6 = 60)
      const startTime = Date.now();
      
      const animateRotation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / rotationDuration, 1);
        
        // Smooth easing: easeInOutCubic for gentler start/stop
        const easeProgress =
          progress < 0.5
            ? 4 * Math.pow(progress, 3)
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
        
        setRotation(currentRotation);
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Snap exactly to the target to prevent micro-jitter
          setRotation(targetRotation);
          setIsRotating(false);
        }
      };
      
      requestAnimationFrame(animateRotation);
    };

    // Handle visibility change to prevent drift when tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When tab becomes visible, ensure rotation is at a proper hexagon vertex
        const currentStep = Math.round(rotation / 60);
        const correctedRotation = currentStep * 60;
        if (Math.abs(rotation - correctedRotation) > 5) {
          setRotation(correctedRotation);
        }
        setIsRotating(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start the initial animation after a brief delay
    const initialDelay = setTimeout(() => {
      startAnimation();
    }, 500);

    // Set up interval for continuous animation
    const interval = setInterval(() => {
      if (!isRotating) {
        startAnimation();
      }
    }, rotationDuration + pauseDuration); // Rotation duration + 0.5s pause

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [rotation, isRotating]);

  // Single set of icons that will rotate continuously
  const icons = [
    { icon: "/images/Fellowship.png", text: "Fellowships", position: "top" },
    { icon: "/images/Public Policy.png", text: "Public Policy", position: "top-right" },
    { icon: "/images/Political Consulting.png", text: "Political consulting", position: "bottom-right" },
    { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "bottom" },
    { icon: "/images/Research.png", text: "Research", position: "bottom-left" },
    { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "top-left" }
  ];

  const getPositionStyles = (index: number) => {
    // Calculate precise hexagon positions using trigonometry with 30-degree offset
    // Radius from center to vertex of hexagon - responsive radius
    const radius = 140; // Base radius for mobile
    const angleInRadians = ((index * 60) + 30) * (Math.PI / 180); // Added 30-degree offset
    
    // Calculate x and y coordinates
    const x = Math.cos(angleInRadians) * radius;
    const y = Math.sin(angleInRadians) * radius;
    
    return {
      position: 'absolute' as const,
      left: `calc(50% + ${x}px - 2rem)`, // 2rem = half of icon width
      top: `calc(50% - ${y}px - 2rem)`,  // Negative y because CSS y increases downward
      width: '4rem',
      height: '4rem',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      textAlign: 'center' as const
    };
  };

  const getDesktopPositionStyles = (index: number) => {
    // Desktop version with larger radius
    const radius = 200; // Desktop radius
    const angleInRadians = ((index * 60) + 30) * (Math.PI / 180);
    
    const x = Math.cos(angleInRadians) * radius;
    const y = Math.sin(angleInRadians) * radius;
    
    return {
      position: 'absolute' as const,
      left: `calc(50% + ${x}px - 2rem)`,
      top: `calc(50% - ${y}px - 2rem)`,
      width: '4rem',
      height: '4rem',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      textAlign: 'center' as const
    };
  };

  // Calculate which icon should be highlighted based on current rotation
  const currentStep = Math.floor((rotation / 60) % 6);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-visible py-[60px] px-0 lg:pl-[160px]">
      {/* Central "Building Bharat" text */}
      <div className="text-center z-10 relative">
        <div className="font-normal leading-tight" style={{ color: '#004644', width: '88px', height: '28px', fontSize: '24px' }}>
          Building
        </div>
        <div className="font-bold leading-tight" style={{ color: '#F97C04', width: '70px', height: '28px', fontSize: '24px' }}>
          BHARAT
        </div>
        
        {/* Optional: Add a subtle indicator of current highlighted icon */}
        <div className="mt-4 flex justify-center space-x-2" style={{ display: 'none' }}>
          {[0, 1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentStep === step ? 'bg-[#F97C04]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile and Tablet Rotating icon circle */}
      <div 
        className="absolute w-72 h-72 sm:w-80 sm:h-80 md:hidden"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isRotating ? 'none' : 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform'
        }}
      >
        {icons.map((item, index) => (
          <div key={`mobile-${item.text}-${index}`} style={getPositionStyles(index)}>
            {/* Icon and text container that counter-rotates instantly to stay readable */}
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                transform: `rotate(-${rotation}deg)`,
                transition: 'none' // Remove transition to prevent tilting
              }}
            >
              {/* Icon without background circle */}
              <div className="mb-2">
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={24}
                  height={24}
                  className="object-contain w-5 h-5 sm:w-6 sm:h-6"
                  onError={(e) => {
                    // Fallback to a colored circle with first letter if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-5 h-5 sm:w-6 sm:h-6 bg-[#F97C04] rounded-full flex items-center justify-center text-white text-xs font-bold';
                    fallback.textContent = item.text.charAt(0);
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              {/* Text label */}
              <div className={`text-xs sm:text-sm font-semibold leading-tight text-center ${
                item.text === "MLA/MP internships" ? "max-w-16 sm:max-w-20" : "whitespace-nowrap"
              }`} style={{ color: '#004644' }}>
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Rotating icon circle */}
      <div 
        className="absolute w-96 h-96 sm:w-[28rem] sm:h-[28rem] md:w-[30rem] md:h-[30rem] lg:w-[32rem] lg:h-[32rem] hidden md:block"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isRotating ? 'none' : 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform'
        }}
      >
        {icons.map((item, index) => (
          <div key={`desktop-${item.text}-${index}`} style={getDesktopPositionStyles(index)}>
            {/* Icon and text container that counter-rotates instantly to stay readable */}
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                transform: `rotate(-${rotation}deg)`,
                transition: 'none' // Remove transition to prevent tilting
              }}
            >
              {/* Icon without background circle */}
              <div className="mb-2">
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={32}
                  height={32}
                  className="object-contain w-7 h-7 sm:w-8 sm:h-8"
                  onError={(e) => {
                    // Fallback to a colored circle with first letter if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-7 h-7 sm:w-8 sm:h-8 bg-[#F97C04] rounded-full flex items-center justify-center text-white text-sm font-bold';
                    fallback.textContent = item.text.charAt(0);
                    target.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
              {/* Text label */}
              <div className={`text-sm font-semibold leading-tight text-center ${
                item.text === "MLA/MP internships" ? "max-w-20 sm:max-w-24" : "whitespace-nowrap"
              }`} style={{ color: '#004644' }}>
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Hexagonal connecting lines */}
      <svg 
        className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] pointer-events-none opacity-20" 
        style={{ zIndex: 1, display: 'none' }}
      >
        <g stroke="#F97C04" strokeWidth="1" fill="none">
          <polygon 
            points="144,20 216,61 216,203 144,244 72,203 72,61" 
            className="md:hidden"
          />
          <polygon 
            points="192,30 288,86 288,278 192,334 96,278 96,86" 
            className="hidden md:block lg:hidden"
          />
          <polygon 
            points="224,35 336,101 336,347 224,413 112,347 112,101" 
            className="hidden lg:block xl:hidden"
          />
          <polygon 
            points="256,40 384,116 384,396 256,472 128,396 128,116" 
            className="hidden xl:block"
          />
        </g>
      </svg>
    </div>
  );
}