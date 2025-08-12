"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AnimatedStates() {
  const [currentState, setCurrentState] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start smooth rotation to next position
      setIsRotating(true);
      
      // Smoothly rotate to next position over 1 second
      const startRotation = rotation;
      const targetRotation = rotation + 60;
      const startTime = Date.now();
      const duration = 1000; // 1 second for smooth movement
      
      const animateRotation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
        
        setRotation(currentRotation);
        
        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Rotation complete, change state, reset rotation for seamlessness, and stop
          setIsRotating(false);
          setCurrentState(prev => prev === 6 ? 1 : prev + 1);
          setRotation(prev => prev - 60);
        }
      };
      
      requestAnimationFrame(animateRotation);
    }, 2000); // Wait 2 seconds between movements (1s stop + 1s movement)

    return () => clearInterval(interval);
  }, [rotation]);

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
    const baseStyles = "absolute w-16 h-16 flex flex-col items-center justify-center text-center";
    
    switch (position) {
      case "top":
        return `${baseStyles} -top-12 left-1/2 transform -translate-x-1/2`;
      case "top-right":
        return `${baseStyles} top-8 right-8`;
      case "bottom-right":
        return `${baseStyles} bottom-8 right-8`;
      case "bottom":
        return `${baseStyles} -bottom-12 left-1/2 transform -translate-x-1/2`;
      case "bottom-left":
        return `${baseStyles} bottom-8 left-8`;
      case "top-left":
        return `${baseStyles} top-8 left-8`;
      default:
        return baseStyles;
    }
  };

  // Ensure currentIcons is always defined with fallback to state 1
  const currentIcons = iconStates[currentState as keyof typeof iconStates] || iconStates[1];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central "Building Bharat" text */}
      <div className="text-center z-10">
        <div className="text-4xl font-normal text-teal-900 leading-tight">
          Building
        </div>
        <div className="text-4xl font-bold text-orange-500 leading-tight">
          BHARAT
        </div>
      </div>

      {/* Rotating icon circle */}
      <div 
        className="absolute w-96 h-96"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {currentIcons && currentIcons.map((item, index) => (
          <div key={index} className={getPositionStyles(item.position)}>
            {/* Icon and text container that rotates together */}
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                transform: `rotate(-${rotation}deg)`
              }}
            >
              <div className="mb-2">
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="text-xs text-teal-900 font-medium leading-tight max-w-20 text-center">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}