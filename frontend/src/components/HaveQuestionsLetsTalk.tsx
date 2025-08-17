"use client";

export default function HaveQuestionsLetsTalk() {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-20" style={{ background: 'var(--Surface-Color-surface-grey, #E5E7EA)' }}>
      <div className="container mx-auto py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Black Placeholder */}
          <div className="w-full lg:w-1/2">
            <div 
              className="w-full h-64 lg:h-96 rounded-lg"
              style={{ background: '#000000' }}
            >
              {/* This is a placeholder for image/video content */}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-md mx-auto lg:mx-0">
              {/* Heading */}
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{
                  color: '#005451',
                  fontFamily: 'Montserrat',
                  fontWeight: 700
                }}
              >
                Have Questions? Let's Talk.
              </h2>

              {/* Description */}
              <p 
                className="text-base lg:text-lg mb-8 text-gray-800"
                style={{
                  fontFamily: 'DM Sans',
                  fontWeight: 400,
                  lineHeight: '1.6'
                }}
              >
                Exploring political consulting or have questions? Fill the form — we'll be in touch soon.
              </p>

              {/* Contact Form */}
              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name*"
                    className="w-full px-4 py-3 rounded-lg border border-orange-300 bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address*"
                    className="w-full px-4 py-3 rounded-lg border border-orange-300 bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px'
                    }}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (optional — We'll only call if needed)"
                    className="w-full px-4 py-3 rounded-lg border border-orange-300 bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px'
                    }}
                  />
                </div>

                {/* How can we help you? */}
                <div>
                  <textarea
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-orange-300 bg-gray-100 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'DM Sans',
                      fontSize: '16px'
                    }}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#F97C04',
                    border: '1px solid #E85A00',
                    fontFamily: 'DM Sans',
                    fontSize: '16px'
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
