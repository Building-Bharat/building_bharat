"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'Courses', href: '#' },
    { label: 'For college', href: '#' },
    { label: 'Internships', href: '#' },
    { label: 'Blogs', href: '#' },
  ];

  return (
    <header className="w-full sticky top-2 md:top-4 z-50">
      <div className="px-2 md:px-4 pointer-events-none">
        <style>{`
          .nav-pill-bg {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: #f97316; /* orange-500 */
            z-index: -1;
            transition: width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
            width: 0%;
            opacity: 0;
          }
          .group:hover .nav-pill-bg {
            width: 100%;
            opacity: 1;
          }
          .nav-link-active .nav-pill-bg {
            width: 100%;
            opacity: 1;
          }
          .mobile-menu {
            transition: all 0.3s ease-in-out;
          }
          .mobile-menu-btn {
            transition: all 0.2s ease-in-out;
          }
          .mobile-menu-btn:active {
            transform: scale(0.95);
          }
          @media (hover: hover) {
            .mobile-menu-btn:hover {
              background-color: #f97316;
              color: white;
            }
          }
          .mobile-menu a {
            -webkit-tap-highlight-color: transparent;
          }
          .mobile-menu a:active {
            background-color: #fef3c7;
          }
          .mobile-nav-link {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }
          .mobile-nav-link:not(.bg-orange-500):active {
            background-color: #fef3c7;
            transform: scale(0.98);
          }
          .mobile-nav-link:not(.bg-orange-500):hover {
            background-color: #fef3c7;
          }
          .mobile-nav-link:not(.bg-orange-500):focus {
            background-color: #fef3c7;
            outline: none;
          }
          .mobile-cta-btn {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
          }
          .mobile-cta-btn:active {
            background-color: #ea580c;
            transform: scale(0.98);
          }
          .mobile-cta-btn:hover {
            background-color: #ea580c;
          }
          .mobile-cta-btn:focus {
            background-color: #ea580c;
            outline: none;
          }
          .touch-manipulation {
            touch-action: manipulation;
          }
          .mobile-menu-btn {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
          }
          /* Ensure mobile menu is properly interactive */
          .mobile-menu {
            pointer-events: auto;
            user-select: none;
          }
          .mobile-menu * {
            pointer-events: auto;
          }
        `}</style>
        <div
          className={`max-w-[1400px] mx-auto bg-white rounded-2xl md:rounded-3xl border border-orange-200 flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 md:py-5 pointer-events-auto transition-all duration-700 touch-manipulation ${visible ? 'opacity-100 shadow-[0_4px_24px_0_rgba(255,140,0,0.10),0_1.5px_0_0_#FFE5CC]' : 'opacity-0'}`}
        >
          <Image
            src="/icons/logo.jpg"
            alt="Building Bharat Logo"
            width={45}
            height={44}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-[56px] lg:h-[55px]"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group text-lg font-normal transition-colors duration-300 px-3 py-1.5 overflow-hidden ${link.active ? 'text-white font-semibold nav-link-active' : 'text-gray-700 hover:text-white'}`}
                style={{ zIndex: 1, display: 'inline-block' }}
              >
                {/* Orange pill background */}
                <span className="nav-pill-bg" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button className="hidden lg:flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-500 text-lg font-medium hover:bg-orange-500 hover:text-white transition-colors">
            Start Learning
          </button>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden flex items-center justify-center p-2 rounded-lg border border-orange-500 mobile-menu-btn ${
              mobileMenuOpen 
                ? 'bg-orange-500 text-white' 
                : 'text-orange-500'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-2xl border border-orange-200 shadow-lg overflow-hidden mobile-menu relative z-50">
            <nav className="py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block px-6 py-3 text-base font-medium transition-colors mobile-nav-link ${
                    link.active 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-orange-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-500 text-white text-base font-medium mobile-cta-btn transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
