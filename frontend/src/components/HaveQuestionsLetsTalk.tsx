"use client";

export default function HaveQuestionsLetsTalk() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-20" style={{ background: '#E5E7EA' }}>
      <div className="container mx-auto py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Side - Black Placeholder */}
          <div className="w-full lg:w-1/2">
            <div 
              className="w-full h-80 lg:h-[500px] rounded-lg"
              style={{ background: '#000000' }}
            >
              {/* This is a placeholder for image/video content */}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg mx-auto lg:mx-0">
                             {/* Heading */}
               <h2 
                 style={{
                   fontFamily: 'Montserrat, sans-serif',
                   fontWeight: 700,
                   fontSize: '20px',
                   lineHeight: '28px',
                   color: '#005451',
                   margin: 0,
                   padding: 0,
                   marginBottom: '20px',
                   width: '100%',
                   maxWidth: '512px',
                   height: 'auto',
                   letterSpacing: '0px'
                 }}
               >
                 Have Questions? Let&apos;s Talk.
               </h2>

               {/* Description */}
               <p 
                 style={{
                   fontFamily: 'DM Sans, sans-serif',
                   fontWeight: 400,
                   fontSize: '16px',
                   lineHeight: '22px',
                   color: '#0A0A0A',
                   margin: 0,
                   padding: 0,
                   marginBottom: '20px',
                   width: '100%',
                   maxWidth: '512px',
                   height: 'auto',
                   letterSpacing: '0px'
                 }}
               >
                 Exploring political consulting or have questions? Fill the form — we&apos;ll be in touch soon.
               </p>

              {/* Contact Form */}
              <div className="space-y-8">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name*"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      border: '1px solid #F97C04',
                      backgroundColor: 'var(--color-grey-200, #E5E7EA)',
                      color: '#9CA3AF'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = 'var(--color-grey-200, #E5E7EA)';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address*"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      border: '1px solid #F97C04',
                      backgroundColor: 'var(--color-grey-200, #E5E7EA)',
                      color: '#9CA3AF'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = 'var(--color-grey-200, #E5E7EA)';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (optional — We&apos;ll only call if needed)"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      border: '1px solid #F97C04',
                      backgroundColor: 'var(--color-grey-200, #E5E7EA)',
                      color: '#9CA3AF'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = 'var(--color-grey-200, #E5E7EA)';
                      e.target.style.borderColor = '#F97C04';
                    }}
                  />
                </div>

                {/* How can we help you? */}
                <div>
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      border: '1px solid #F97C04',
                      backgroundColor: 'var(--color-grey-200, #E5E7EA)',
                      color: '#9CA3AF'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#F97C04';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = 'var(--color-grey-200, #E5E7EA)';
                      e.target.style.borderColor = '#F97C04';
                    }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105"
                    style={{
                      width: '119.5px',
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
                      color: '#F97C04',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: 'DM Sans'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderRadius = '0px';
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.querySelector('svg')!.style.opacity = '1';
                      e.currentTarget.querySelector('svg')!.style.transform = 'translateX(0px)';
                      e.currentTarget.querySelector('span')!.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderRadius = '8px';
                      e.currentTarget.style.transform = 'scale(1)';
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
                      zIndex: 1
                    }}>
                      Submit
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}