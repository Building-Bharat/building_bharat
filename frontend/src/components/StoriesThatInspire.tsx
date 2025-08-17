"use client";

import Image from 'next/image';

export default function StoriesThatInspire() {
  return (
    <section className="px-4 sm:px-6 md:px-8" style={{ background: 'var(--Surface-Color-surface-grey, #E5E7EA)', width: 'auto', height: 'auto', minHeight: '578px', margin: '0 auto' }}>
      <div className="container mx-auto text-center py-8 sm:py-12 md:py-16" style={{ maxWidth: '1152px', height: 'auto', minHeight: '100%' }}>
        {/* Title */}
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
          style={{
            color: '#005451',
            fontFamily: 'Montserrat',
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
          className="text-base sm:text-lg mb-6 sm:mb-8 text-black px-4 sm:px-8 md:px-0 max-w-[800px] mx-auto"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(14px, 3vw, 18px)',
            lineHeight: 'clamp(20px, 4vw, 24px)',
            letterSpacing: '0px',
            textAlign: 'center'
          }}
        >
          Our learners share stories of growth, impact, and transformation — and we're proud to be part of their journey.
        </p>

        {/* Profile Pictures */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          {/* Left Profile Picture */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src="/images/image 3.png"
              alt="Profile 1"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Profile Picture (Larger) */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src="/images/image 2.png"
              alt="Profile 2"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Profile Picture */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src="/images/image 4.png"
              alt="Profile 3"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Testimonial Quote */}
        <div 
          className="w-full sm:w-4/5 md:w-auto"
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
            className="italic text-black px-4 sm:px-6 md:px-0 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px] lg:max-w-[800px] xl:max-w-none"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              lineHeight: 'clamp(20px, 3.5vw, 24px)',
              textAlign: 'center',
              margin: 0
            }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tells"
          </blockquote>
        </div>

        {/* Attribution */}
        <div className="mb-6 mt-6 sm:mt-8">
          <p 
            className="text-base sm:text-lg font-bold text-black mb-4 sm:mb-6"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 700,
              fontSize: 'clamp(16px, 3vw, 18px)',
              lineHeight: 'clamp(20px, 4vw, 24px)'
            }}
          >
            Rahul Shetty
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
            {/* Twitter/X Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center" style={{ background: '#544E4E' }}>
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            {/* Instagram Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center" style={{ background: '#544E4E' }}>
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}