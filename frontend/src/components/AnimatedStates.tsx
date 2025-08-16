"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AnimatedStates() {
  const [currentState, setCurrentState] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setIsRotating(true);
      
      const startRotation = rotation;
      const targetRotation = rotation + 60; // 60 degrees for each position (360/6 = 60)
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds for smooth, readable movement
      
      const animateRotation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function for natural movement
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
        
        setRotation(currentRotation);
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Rotation complete, stop rotating first
          setIsRotating(false);
          // Delay state change slightly to ensure smooth visual transition
          setTimeout(() => {
            setCurrentState(prev => prev === 6 ? 1 : prev + 1);
          }, 50);
        }
      };
      
      requestAnimationFrame(animateRotation);
    };

    // Start the initial animation after a brief delay
    const initialDelay = setTimeout(() => {
      startAnimation();
    }, 500);

    // Set up interval for continuous animation
    const interval = setInterval(() => {
      if (!isRotating) {
        startAnimation();
      }
    }, 2700); // Slightly longer wait to account for state change delay

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [rotation, isRotating]);

  // Icon data for each state - each icon moves clockwise to next position
  const iconStates = {
    1: [
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "top" },
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "top-right" },
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "bottom-right" },
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "bottom" },
      { icon: "/images/Research.png", text: "Research", position: "bottom-left" },
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "top-left" }
    ],
    2: [
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "top" },
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "top-right" },
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "bottom-right" },
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "bottom" },
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "bottom-left" },
      { icon: "/images/Research.png", text: "Research", position: "top-left" }
    ],
    3: [
      { icon: "/images/Research.png", text: "Research", position: "top" },
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "top-right" },
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "bottom-right" },
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "bottom" },
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "bottom-left" },
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "top-left" }
    ],
    4: [
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "top" },
      { icon: "/images/Research.png", text: "Research", position: "top-right" },
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "bottom-right" },
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "bottom" },
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "bottom-left" },
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "top-left" }
    ],
    5: [
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "top" },
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "top-right" },
      { icon: "/images/Research.png", text: "Research", position: "bottom-right" },
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "bottom" },
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "bottom-left" },
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "top-left" }
    ],
    6: [
      { icon: "/images/Public Policy.png", text: "Public Policy", position: "top" },
      { icon: "/images/Political Consulting.png", text: "Political consulting", position: "top-right" },
      { icon: "/images/Think Tanks.png", text: "Think Tanks", position: "bottom-right" },
      { icon: "/images/Research.png", text: "Research", position: "bottom" },
      { icon: "/images/MLAMP Internship.png", text: "MLA/MP internships", position: "bottom-left" },
      { icon: "/images/Fellowship.png", text: "Fellowships", position: "top-left" }
    ]
  };

  const getPositionStyles = (position: string) => {
    const baseStyles = "absolute w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center text-center";
    
    switch (position) {
      case "top":
        return `${baseStyles} top-2 left-1/2 transform -translate-x-1/2`;
      case "top-right":
        return `${baseStyles} top-12 right-2 sm:top-16 sm:right-4`;
      case "bottom-right":
        return `${baseStyles} bottom-12 right-2 sm:bottom-16 sm:right-4`;
      case "bottom":
        return `${baseStyles} bottom-2 left-1/2 transform -translate-x-1/2`;
      case "bottom-left":
        return `${baseStyles} bottom-12 left-2 sm:bottom-16 sm:left-4`;
      case "top-left":
        return `${baseStyles} top-12 left-2 sm:top-16 sm:left-4`;
      default:
        return baseStyles;
    }
  };

  // Ensure currentIcons is always defined with fallback to state 1
  const currentIcons = iconStates[currentState as keyof typeof iconStates] || iconStates[1];

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[600px] overflow-visible"
         style={{ padding: '80px' }}>
      {/* Central "Building Bharat" text */}
      <div className="text-center z-10 relative">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-900 leading-tight">
          Building
        </div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F97C04] leading-tight">
          BHARAT
        </div>
        
        {/* Optional: Add a subtle indicator of current state */}
        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5, 6].map((state) => (
            <div
              key={state}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentState === state ? 'bg-[#F97C04]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Rotating icon circle with smooth transition */}
      <div 
        className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isRotating ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {currentIcons && currentIcons.map((item, index) => (
          <div key={`${item.text}-${index}`} className={getPositionStyles(item.position)}>
            {/* Icon and text container that counter-rotates to stay readable */}
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                transform: `rotate(-${rotation}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Icon with background circle */}
              <div className="mb-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              <div className="text-xs text-[#F97C04] font-semibold leading-tight max-w-16 sm:max-w-20 text-center">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Hexagonal connecting lines */}
      <svg 
        className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 pointer-events-none opacity-20" 
        style={{ zIndex: 1 }}
      >
        <g stroke="#F97C04" strokeWidth="1" fill="none">
          <polygon 
            points="144,20 216,68 216,212 144,260 72,212 72,68" 
            className="sm:hidden"
          />
          <polygon 
            points="160,24 240,76 240,236 160,284 80,236 80,76" 
            className="hidden sm:block lg:hidden"
          />
          <polygon 
            points="192,28 288,92 288,284 192,348 96,284 96,92" 
            className="hidden lg:block"
          />
        </g>
      </svg>
    </div>
  );
}