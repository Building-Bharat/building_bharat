"use client";

import { useState, useEffect } from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-8 md:pt-12 lg:pt-0" style={{ background: '#E5E7EA' }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-11 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left" style={{ width: '100%', maxWidth: '544px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 
              className="mb-4 md:mb-8 text-2xl md:text-3xl lg:text-4xl"
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
              Crack Political and Policies<br />
              Roles with Ease
            </h1>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <p 
              className="mb-8 md:mb-12 mx-auto lg:mx-0 text-sm md:text-base lg:text-base"
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
                color: '#F97C04',
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

        {/* Right Content - Always Above on Mobile */}
        <div className="w-full lg:w-auto lg:flex-1 flex items-center justify-center order-first lg:order-last">
          <div className="w-full h-full lg:w-[600px] lg:h-[400px]" style={{ 
            width: '100%',
            maxWidth: '300px',
            height: '200px',
            background: '#F1F1F1'
          }} />
        </div>
      </div>
    </section>
  );
}
