"use client";

import React from 'react';
import AnimatedStates from './AnimatedStates';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-8 md:pt-12 lg:pt-0 lg:mx-[64px]" style={{ background: '#E5E7EA' }}>
      <div className="mx-auto w-full px-[10px] md:px-4 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-center lg:text-left lg:pl-0 left-content-ipad-air" style={{ width: '100%', maxWidth: '544px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 
              className="mb-4 md:mb-8 text-lg sm:text-xl md:text-2xl lg:text-4xl responsive-heading"
              style={{
                width: '100%',
                maxWidth: '544px',
                height: 'auto',
                opacity: 1,
                fontFamily: 'Montserrat',
                fontWeight: 800,
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '48px',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#005451',
                textAlign: 'left'
              }}
            >
              Crack Political and Policies Roles with Ease
            </h1>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <p 
              className="mb-8 md:mb-12 mx-auto lg:mx-0 text-xs sm:text-sm md:text-base lg:text-base responsive-paragraph"
              style={{
                width: '100%',
                maxWidth: '544px',
                height: 'auto',
                opacity: 1,
                fontFamily: 'DM Sans',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0%',
                color: '#0A0A0A',
                textAlign: 'left'
              }}
            >
              We combine a practical curriculum, expert mentorship, and a real-world learning path to help you build confidence and competence in political strategy.
            </p>
          </div>

          {/* Buttons Container - Center on mobile, left on desktop */}
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start button-container">
            {/* Enroll Now Button */}
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
                background: '#F97C04',
                border: 'none',
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
                  color: '#0A0A0A',
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
                color: '#0A0A0A',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateX(0px)',
                position: 'relative',
                zIndex: 1
              }}>
                Enroll Now
              </span>
            </button>

            {/* Start Learning For Free Button */}
            <button 
              className="w-full sm:w-auto transition-all duration-300 ease-in-out origin-top-left hover:scale-105"
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
                background: 'white',
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
                  width: '20px',
                  height: '20px',
                  color: '#F97C04',
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
                transition: 'all 0.3s ease-in-out',
                transform: 'translateX(0px)',
                position: 'relative',
                zIndex: 1,
                color: '#F97C04',
                fontWeight: '500'
              }}>
                Start Learning For Free
              </span>
            </button>
          </div>
        </div>

        {/* Right Content - align to right on desktop and keep within container */}
        <div className="w-full md:mt-6 lg:w-[560px] xl:w-[600px] flex items-center justify-center md:justify-center lg:justify-end order-first lg:order-last lg:ml-auto overflow-visible md:mt-14 lg:mt-0">
          <div className="relative w-full h-full flex items-center justify-center md:justify-center lg:justify-end ipad-pro-right-content mobile-right-content desktop-right-content">
            {/* Animated States Component */}
            <AnimatedStates />
          </div>
        </div>
      </div>

      {/* CSS for responsive text */}
      <style jsx>{`
        /* Mobile styles (up to 639px) - Single line heading with larger font */
        @media (max-width: 639px) {
          .responsive-heading {
            width: 100% !important;
            max-width: 100% !important;
            font-family: Montserrat !important;
            font-weight: 800 !important;
            font-size: 18px !important;
            line-height: 10px !important;
            letter-spacing: 0px !important;
            color: #005451 !important;
            text-align: center !important;
            padding: 0 8px !important;
            margin: 0 auto !important;
            white-space: normal !important;
            overflow: visible !important;
            word-wrap: normal !important;
            hyphens: none !important;
          }

          .responsive-paragraph {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 14px !important;
            line-height: 20px !important;
            text-align: center !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          /* Make buttons full width without extra padding */
          .button-container {
            padding: 0 16px !important;
            width: 100% !important;
          }
          
          .button-container button {
            width: calc(100% - 32px) !important;
            min-width: calc(100% - 32px) !important;
            max-width: calc(100% - 32px) !important;
            overflow: hidden !important;
            position: relative !important;
            margin: 0 auto !important;
          }

          /* Mobile button hover effects - prevent overflow */
          .button-container button:hover {
            transform: scale(1.02) !important;
            overflow: hidden !important;
          }

          /* Mobile button content overflow control */
          .button-container button span,
          .button-container button svg {
            max-width: 100% !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* Mobile right side animated part margin reduction */
          .mobile-right-content {
            margin-top: 16px !important;
            margin-bottom: 16px !important;
            padding: 0 !important;
          }

          /* Remove unwanted mobile spacing */
          .mobile-right-content .relative {
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Override default mobile margins */
          .mobile-right-content {
            margin-top: 16px !important;
            margin-bottom: 16px !important;
            padding: 0 !important;
          }

          /* Force remove any extra mobile spacing */
          .w-full.md\\:mt-6.lg\\:w-\\[560px\\].xl\\:w-\\[600px\\] {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        }

        /* Extra small screens */
        @media (max-width: 320px) {
          .responsive-heading {
            font-size: 16px !important;
            line-height: 20px !important;
            padding: 0 !important;
          }
        }

        /* Small mobile screens with better fit */
        @media (min-width: 375px) and (max-width: 639px) {
          .responsive-heading {
            font-size: 20px !important;
            line-height: 24px !important;
          }
        }

        /* Tablet styles (640px to 1023px) - Responsive widths */
        @media (min-width: 640px) and (max-width: 1023px) {
          .responsive-heading {
            width: 100% !important;
            max-width: 100% !important;
            font-size: clamp(20px, 3.2vw, 28px) !important;
            line-height: clamp(26px, 4.2vw, 40px) !important;
            text-align: center !important;
            padding: 0 16px !important;
            margin: 0 !important;
            margin-left: -19px !important; /* slight left shift only on tablet */
            white-space: nowrap !important;
          }
          
          .responsive-paragraph {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 15px !important;
            line-height: 22px !important;
            text-align: center !important;
            padding: 0 16px !important;
            margin: 0 !important;
          }

          /* Tablet button styling - left aligned like desktop */
          .button-container {
            padding: 0 16px !important;
            margin: 0 !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .button-container button {
            width: auto !important;
            min-width: auto !important;
            max-width: none !important;
          }
        }

        /* Desktop styles (1024px and above) - Responsive with max constraint */
        @media (min-width: 1024px) {
          .responsive-heading {
            width: 100% !important;
            max-width: 544px !important;
            font-size: 32px !important;
            line-height: 48px !important;
            text-align: left !important;
            padding: 0 !important;
          }
          
          .responsive-paragraph {
            width: 100% !important;
            max-width: 544px !important;
            font-size: 16px !important;
            line-height: 24px !important;
            text-align: left !important;
            padding: 0 !important;
          }

          /* Desktop specific - push right side element towards right */
          .desktop-right-content {
            position: relative !important;
            right: -25px !important;
            overflow: visible !important;
            max-width: 100% !important;
            justify-content: flex-end !important;
          }
        }

        /* iPad Air specific styles (820px to 1023px) - Perfect alignment like iPad Mini */
        @media (min-width: 820px) and (max-width: 1023px) {
          .responsive-heading {
            width: 100% !important;
            max-width: 100% !important;
            font-size: clamp(20px, 3.2vw, 28px) !important;
            line-height: clamp(26px, 4.2vw, 40px) !important;
            text-align: center !important;
            padding: 0 16px !important;
            margin: 0 auto !important;
            white-space: nowrap !important;
            position: relative !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin-left: -45px !important; /* Pull more towards left for perfect centering */
          }
          
          .responsive-paragraph {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 15px !important;
            line-height: 22px !important;
            text-align: center !important;
            padding: 0 16px !important;
            margin: 0 auto !important;
          }

          /* iPad Air button styling - center aligned */
          .button-container {
            padding: 0 16px !important;
            margin: 0 auto !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .button-container button {
            width: auto !important;
            min-width: auto !important;
            max-width: none !important;
          }

          /* Pull entire left content element towards left in iPad Air */
          .left-content-ipad-air {
            position: relative !important;
            left: -20px !important;
            transform: translateX(0) !important;
          }
        }

        /* iPad Pro specific styles (1024px to 1366px) - Pull right side towards left */
        @media (min-width: 1024px) and (max-width: 1366px) {
          .ipad-pro-right-content {
            position: relative !important;
            right: 45px !important;
            overflow: visible !important;
            max-width: 100% !important;
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}