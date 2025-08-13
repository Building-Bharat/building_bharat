"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'Premium', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Internships', href: '#' },
    { label: 'Colleges', href: '#' },
    { label: 'Blogs', href: '#' },
  ];

  return (
    <header className="w-full sticky top-2 md:top-4 z-50">
      <div className="px-2 md:px-4 pointer-events-none">
        <style>{`
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
          className={`mx-auto flex items-center pointer-events-auto transition-all duration-700 touch-manipulation ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: '1312px',
            height: '48px',
            justifyContent: 'space-between',
            paddingRight: '16px',
            paddingLeft: '16px',
            borderRadius: '8px',
            background: 'var(--color-surface-surfaceSecondary, #F1F1F1)'
          }}
        >
          <Image
            src="/icons/logo.png"
            alt="Building Bharat Logo"
            width={40}
            height={40}
            className="flex-shrink-0"
            style={{
              width: '40px',
              height: '40px',
              opacity: 1
            }}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group transition-colors duration-300 overflow-hidden ${link.active ? '' : 'hover:text-orange-500'}`}
                style={{ 
                  zIndex: 1, 
                  display: 'inline-block',
                  width: '78px',
                  height: '24px',
                  opacity: 1,
                  fontFamily: 'DM Sans',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  background: link.active ? 'var(--color-surface-surfaceBrand, #F97C04)' : 'transparent',
                  color: link.active ? 'white' : 'var(--color-text-textPrimary, #0A0A0A)',
                  borderRadius: '4px',
                  padding: '0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button 
            className="hidden lg:flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105"
            style={{
              width: '173px',
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
              zIndex: 1
            }}>
              Start Learning
            </span>
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
          <div className="lg:hidden mt-2 overflow-hidden mobile-menu relative z-50" style={{ 
            background: 'var(--color-surface-surfaceSecondary, #F1F1F1)',
            borderRadius: '8px'
          }}>
            <nav className="py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block px-6 py-3 text-base font-medium transition-colors mobile-nav-link ${
                    link.active 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-orange-100">
              <button 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-500 text-white text-base font-medium mobile-cta-btn transition-all duration-300 ease-in-out hover:scale-105"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface-surfaceSecondary, #F1F1F1)';
                  e.currentTarget.style.border = '1px solid var(--color-border-borderBrand, #F97C04)';
                  e.currentTarget.style.color = 'var(--color-border-borderBrand, #F97C04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-surface-surfaceBrand, #F97C04)';
                  e.currentTarget.style.border = 'none';
                  e.currentTarget.style.color = 'var(--color-text-textInvert, #F1F1F1)';
                }}
              >
                Start Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
