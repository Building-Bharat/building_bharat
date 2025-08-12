"use client";

import AnimatedHero from './AnimatedHero';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 2000); // 2s delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-8 md:pt-12 lg:pt-0" style={{ background: 'var(--color-surface-surfacePrimary, #E5E5E5)' }}>
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
              color: 'var(--color-text-textBrand, #004644)'
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
              color: 'var(--color-text-textPrimary, #0A0A0A)'
            }}
          >
            We combine a practical curriculum, expert mentorship, and a real-world learning path to help you build confidence and competence in political strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
            <button 
              className="w-full sm:w-auto transition-transform duration-200 ease-in-out origin-top-left"
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
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'DM Sans',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Enroll Now
            </button>
            <button
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg border-2 border-orange-500 bg-white text-orange-500 text-base font-semibold transition-colors duration-200 hover:bg-orange-500 hover:text-white"
            >
              Join premium
            </button>
          </div>
        </div>

        {/* Right Content - Animated transition (Desktop only) */}
        <div className="hidden lg:flex flex-1 items-center justify-center max-w-lg relative h-[400px]">
          {/* Original content fades out */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${showAnimation ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="text-center">
              <div className="text-8xl font-normal text-teal-900 leading-tight">
                Building
              </div>
              <div className="text-8xl font-bold text-orange-500 leading-tight">
                BHARAT
              </div>
            </div>
          </div>
          {/* AnimatedHero fades in */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${showAnimation ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <AnimatedHero />
          </div>
        </div>

        {/* Mobile/Tablet Hero Text (Static) */}
        <div className="lg:hidden flex-1 items-center justify-center max-w-lg relative h-[200px]">
          <div className="text-center">
            <div className="text-4xl font-normal text-teal-900 leading-tight">
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
