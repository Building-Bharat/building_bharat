"use client";

import AnimatedStates from './AnimatedStates';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-8 md:pt-12 lg:pt-0" style={{ background: 'var(--color-surface-surfacePrimary, #F1F1F1)' }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-11 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 
            className="mb-4 md:mb-8"
            style={{
              width: '730px',
              height: '96px',
              opacity: 1,
              fontFamily: 'Montserrat',
              fontWeight: 800,
              fontStyle: 'normal',
              fontSize: '32px',
              lineHeight: '48px',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: 'var(--color-text-textBrand, #1A2E2E)'
            }}
          >
            Crack Political and Policies Roles with Ease
          </h1>
          <p 
            className="mb-8 md:mb-12 mx-auto lg:mx-0"
            style={{
              width: '730px',
              height: '48px',
              opacity: 1,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0%',
              color: 'var(--color-text-textPrimary, #555555)'
            }}
          >
            We combine a practical curriculum, expert mentorship, and a real-world learning path to help you build confidence and competence in political strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
            <button 
              className="w-full sm:w-auto transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
              style={{
                width: '145px',
                height: '48px',
                paddingTop: '0',
                paddingRight: '32px',
                paddingBottom: '0',
                paddingLeft: '32px',
                gap: '0',
                opacity: 1,
                borderRadius: '8px',
                background: 'var(--color-surface-surfaceBrand, #F97C04)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderRadius = '0px';
                e.currentTarget.style.border = '2px solid var(--color-text-textInvert, #F1F1F1)';
                e.currentTarget.querySelector('svg')!.style.opacity = '1';
                e.currentTarget.querySelector('svg')!.style.transform = 'translateX(0px)';
                e.currentTarget.querySelector('span')!.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderRadius = '8px';
                e.currentTarget.style.border = 'none';
                e.currentTarget.querySelector('svg')!.style.opacity = '0';
                e.currentTarget.querySelector('svg')!.style.transform = 'translateX(-8px)';
                e.currentTarget.querySelector('span')!.style.transform = 'translateX(0px)';
              }}
            >
              {/* Right arrow icon that appears on hover */}
              <svg 
                className="w-5 h-5 text-white transition-all duration-300 ease-in-out"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--color-text-textInvert, #F1F1F1)',
                  transition: 'all 0.3s ease-in-out',
                  marginRight: '8px',
                  opacity: '0',
                  transform: 'translateX(-8px)',
                  position: 'absolute',
                  left: '16px'
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span style={{
                width: 'auto',
                minWidth: '81px',
                height: '24px',
                opacity: 1,
                fontFamily: 'DM Sans',
                fontWeight: '600',
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: 'var(--color-text-textInvert, #F1F1F1)',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateX(0px)',
                position: 'relative',
                zIndex: 1
              }}>
                Enroll Now
              </span>
            </button>
            <button
              className="w-full sm:w-auto transition-all duration-300 ease-in-out hover:scale-105"
              style={{
                width: '239px',
                height: '48px',
                paddingTop: '0',
                paddingRight: '32px',
                paddingBottom: '0',
                paddingLeft: '32px',
                gap: '0',
                opacity: 1,
                borderRadius: '8px',
                borderWidth: '1px',
                background: 'var(--color-surface-surfaceSecondary, #F1F1F1)',
                border: '1px solid #F97C04',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderRadius = '0px';
                e.currentTarget.querySelector('svg')!.style.opacity = '1';
                e.currentTarget.querySelector('svg')!.style.transform = 'translateX(0px)';
                e.currentTarget.querySelector('span')!.style.transform = 'translateX(8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderRadius = '8px';
                e.currentTarget.querySelector('svg')!.style.opacity = '0';
                e.currentTarget.querySelector('svg')!.style.transform = 'translateX(-8px)';
                e.currentTarget.querySelector('span')!.style.transform = 'translateX(0px)';
              }}
            >
              {/* Right arrow icon that appears on hover */}
              <svg 
                className="w-5 h-5 text-white transition-all duration-300 ease-in-out"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'var(--color-border-borderBrand, #F97C04)',
                  transition: 'all 0.3s ease-in-out',
                  marginRight: '8px',
                  opacity: '0',
                  transform: 'translateX(-8px)',
                  position: 'absolute',
                  left: '16px'
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span style={{
                width: 'auto',
                minWidth: '175px',
                height: '24px',
                opacity: 1,
                fontFamily: 'DM Sans',
                fontWeight: '600',
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: 'var(--color-text-textbrandsecondary, #F97C04)',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateX(0px)',
                position: 'relative',
                zIndex: 1
              }}>
                Start Learning For Free
              </span>
            </button>
          </div>
        </div>

        {/* Right Content - Animated States (Desktop only) */}
        <div className="hidden lg:flex flex-1 items-center justify-center max-w-lg relative h-[400px]">
          {/* Original content fades out */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${showAnimation ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="text-center">
              <div className="text-8xl font-normal text-gray-900 leading-tight">
                Building
              </div>
              <div className="text-8xl font-bold text-orange-500 leading-tight">
                BHARAT
              </div>
            </div>
          </div>
          {/* Animated States fades in */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${showAnimation ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <AnimatedStates />
          </div>
        </div>

        {/* Mobile/Tablet Hero Text (Static) */}
        <div className="lg:hidden flex-1 items-center justify-center max-w-lg relative h-[200px]">
          <div className="text-center">
            <div className="text-4xl font-normal text-gray-900 leading-tight">
              Building
            </div>
            <div className="text-4xl font-bold text-orange-500 leading-tight">
              BHARAT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
