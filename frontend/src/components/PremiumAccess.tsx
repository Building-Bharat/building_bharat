"use client";

import React from "react";

export default function PremiumAccess() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-0" style={{ background: '#E5E7EA' }}>
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left large media placeholder */}
          <div
            className="w-full flex flex-col gap-0 p-4 sm:p-6 md:p-8"
            style={{
              width: '100%',
              maxWidth: '34rem',
              minHeight: '39.6875rem',
              opacity: 1
            }}
          >
            <div
              className="mt-4 mr-4 ml-4 opacity-100 shrink-0"
              style={{
                background: 'var(--Surface-Color-surface-grey-dark, #394050)',
                width: '512px',
                height: '441px',
                minHeight: '441px',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'block',
                aspectRatio: '512 / 441'
              }}
            />
            {/* Title and Description below the large media */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mt-0 mb-2"
              style={{
                color: 'var(--Text-Color-text-green, #005451)',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                fontSize: '2rem',
                lineHeight: '2.375rem',
                letterSpacing: '0',
                marginLeft: '1rem',
                marginTop: '2rem'
              }}
            >
              Premium Access
            </h2>
            <p
              className="text-[#0A0A0A]"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: '1.25rem',
                letterSpacing: '0',
                color: 'var(--Text-Color-text-primary-black, #0A0A0A)',
                width: '32rem',
                height: '3.75rem',
                opacity: 1,
                marginLeft: '1rem'
              }}
            >
              Move beyond theory into practice, with experiences that prepare you to stand out, take charge, and create measurable change in your career.
            </p>
          </div>

          {/* Right benefits grid */}
          <div 
            className="flex flex-col"
            style={{
              width: '34rem',
              height: '39.6875rem',
              opacity: 1
            }}
          >
            <div 
              className="grid"
              style={{
                gridTemplateRows: 'repeat(2, 1fr)',
                gridTemplateColumns: 'repeat(2, 1fr)',
                rowGap: '2rem',
                columnGap: '2rem',
                padding: '2rem'
              }}
            >
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start"
                  style={{
                    width: '15rem',
                    height: '17.84375rem',
                    paddingRight: '1rem',
                    paddingLeft: '4rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    gap: '2rem',
                    opacity: 1,
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    className="rounded-lg shrink-0"
                    style={{
                      background: 'var(--Surface-Color-surface-grey-dark, #394050)',
                      width: '13rem',
                      height: '12.09375rem',
                      borderRadius: '1rem'
                    }}
                  />
                  <span
                    className="text-center text-[#0A0A0A]"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      lineHeight: '1.75rem',
                      letterSpacing: '0',
                      color: 'var(--Text-Color-text-primary-black, #0A0A0A)',
                      width: '13rem',
                      height: '1.75rem',
                      opacity: 1,
                      display: 'block'
                    }}
                  >
                    Benefits
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


