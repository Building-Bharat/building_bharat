"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    setVisible(true);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Assuming hero is full viewport height
      
      // Check if we're past the hero section
      const pastHero = scrollY > heroHeight * 0.8; // Trigger when 80% through hero
      
      setIsScrolled(scrollY > 10);
      setIsInHero(!pastHero);
    };

    // Add error handling for scroll event
    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    } catch (error) {
      console.error('Error adding scroll listener:', error);
    }

    return () => {
      try {
        window.removeEventListener('scroll', handleScroll);
      } catch (error) {
        console.error('Error removing scroll listener:', error);
      }
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'Courses', href: '#' },
    { label: 'Internships', href: '#' },
    { label: 'Colleges', href: '#' },
    { label: 'Blogs', href: '#' },
  ];

  return (
    <header className={`w-full overflow-x-hidden z-50 transition-all duration-500 ease-in-out fixed top-0 left-0 right-0 ${
      isInHero 
        ? 'md:fixed md:top-0 md:left-0 md:right-0 lg:sticky lg:top-4' 
        : 'md:fixed md:top-0 md:left-0 md:right-0'
    }`}>
      <div className={`transition-all duration-500 ease-in-out ${
        isInHero 
          ? 'px-0 sm:px-6 md:px-8 lg:px-20' 
          : 'px-0'
      }`} style={{ 
        paddingLeft: '0px', 
        paddingRight: '0px' 
      }}>
        <style>{`
          /* Custom underline width for nav links */
          .nav-link-underline {
            width: 0;
            transition: width 0.3s ease-in-out;
          }
          
          .group:hover .nav-link-underline {
            width: 100% !important;
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
          
          /* Header expansion animation */
          .header-container {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          /* Backdrop blur for expanded header */
          .header-backdrop {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          
          /* Mobile: make header full-bleed without horizontal overflow */
          @media (max-width: 767px) {
            .header-container {
              width: 100% !important;
              max-width: 100% !important;
              border-radius: 0 !important;
              padding-left: 10px !important;
              padding-right: 10px !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              box-sizing: border-box !important;
            }
            .mobile-menu {
              width: 100% !important;
              margin-left: 0 !important;
            }
          }
        `}</style>
        
        <div
          className={`mx-auto flex items-center pointer-events-auto header-container touch-manipulation ${
            visible ? 'opacity-100' : 'opacity-0'
          } ${!isInHero ? 'header-backdrop shadow-lg' : ''} ${!isInHero ? 'md:w-screen' : ''} flex-row-reverse lg:flex-row`}
          style={{ 
            width: '100%',
            maxWidth: isInHero ? '1200px' : 'none',
            height: isInHero ? '70px' : '80px',
            justifyContent: 'space-between',
            paddingRight: isInHero ? '16px' : '24px',
            paddingLeft: isInHero ? '16px' : '24px',
            borderRadius: isInHero ? '8px' : '0px',
            background: isInHero 
              ? 'var(--Surface-Color-surface-white, #F1F1F1)' 
              : 'rgba(241, 241, 241, 0.95)',
            marginLeft: isInHero ? 'auto' : '0',
            marginRight: isInHero ? 'auto' : '0',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Image
            src="/icons/logo.png"
            alt="Building Bharat Logo"
            width={isInHero ? 40 : 48}
            height={isInHero ? 40 : 48}
            className="flex-shrink-0 transition-all duration-500"
            style={{
              width: isInHero ? '40px' : '48px',
              height: isInHero ? '40px' : '48px',
              opacity: 1
            }}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group transition-all duration-500 overflow-visible whitespace-nowrap ${
                  link.active ? '' : 'hover:text-orange-500'
                }`}
                style={{ 
                  zIndex: 1, 
                  display: 'inline-flex',
                  minWidth: 'auto',
                  height: isInHero ? '24px' : '28px',
                  opacity: 1,
                  fontFamily: 'DM Sans',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: isInHero ? '14px' : '16px',
                  lineHeight: isInHero ? '24px' : '28px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  background: 'transparent',
                  color: link.active ? '#F97C04' : '#000000',
                  borderRadius: '4px',
                  padding: '0 4px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.color = '#F97C04';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.color = '#000000';
                  }
                }}
              >
                {link.label}
                {/* Hover underline effect */}
                <span 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-500 nav-link-underline"
                  style={{
                    backgroundColor: '#F97C04',
                    height: '2px',
                    width: '0%',
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button 
            className="hidden lg:flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-105"
            style={{
              width: isInHero ? '173px' : '190px',
              height: isInHero ? '48px' : '56px',
              paddingTop: '0',
              paddingRight: isInHero ? '32px' : '36px',
              paddingBottom: '0',
              paddingLeft: isInHero ? '32px' : '36px',
              gap: '0',
              opacity: 1,
              borderRadius: '8px',
              borderWidth: '1px',
              background: 'var(--color-surface-surfaceSecondary, #F1F1F1)',
              border: '1px solid #F97C04',
              color: '#F97C04',
              fontSize: isInHero ? '14px' : '16px',
              fontWeight: '600',
              fontFamily: 'DM Sans',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderRadius = '0px';
              const svg = e.currentTarget.querySelector('svg');
              const span = e.currentTarget.querySelector('span');
              if (svg) {
                svg.style.opacity = '1';
                svg.style.transform = 'translateX(0px)';
              }
              if (span) {
                span.style.transform = 'translateX(8px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderRadius = '8px';
              const svg = e.currentTarget.querySelector('svg');
              const span = e.currentTarget.querySelector('span');
              if (svg) {
                svg.style.opacity = '0';
                svg.style.transform = 'translateX(-8px)';
              }
              if (span) {
                span.style.transform = 'translateX(0px)';
              }
            }}
          >
            {/* Right arrow icon that appears on hover */}
            <svg 
              className="w-5 h-5 text-white transition-all duration-300 ease-in-out"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                width: isInHero ? '20px' : '24px',
                height: isInHero ? '20px' : '24px',
                color: '#F97C04',
                transition: 'all 0.3s ease-in-out',
                marginRight: '8px',
                opacity: '0',
                transform: 'translateX(-8px)',
                position: 'absolute',
                left: isInHero ? '16px' : '20px'
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
            className={`lg:hidden flex items-center justify-center p-2 rounded-lg border border-orange-500 mobile-menu-btn transition-all duration-500 ${
              mobileMenuOpen 
                ? 'bg-orange-500 text-white' 
                : 'text-orange-500'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: isInHero ? '44px' : '48px',
              height: isInHero ? '44px' : '48px',
            }}
          >
            <svg 
              className="transition-all duration-300" 
              style={{
                width: isInHero ? '20px' : '24px',
                height: isInHero ? '20px' : '24px',
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
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
          <div 
            className={`lg:hidden mt-2 overflow-hidden mobile-menu relative z-50 transition-all duration-500 ${
              !isInHero ? 'md:w-screen md:ml-[calc(-50vw+50%)]' : ''
            }`} 
            style={{ 
              background: isInHero 
                ? 'var(--Surface-Color-surface-white, #F1F1F1)' 
                : 'rgba(241, 241, 241, 0.95)',
              borderRadius: isInHero ? '8px' : '0px',
              width: '80%',
              marginLeft: '0',
              backdropFilter: !isInHero ? 'blur(10px)' : 'none',
              WebkitBackdropFilter: !isInHero ? 'blur(10px)' : 'none',
            }}
          >
            <nav className="py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block px-6 py-3 text-base font-medium transition-all duration-300 mobile-nav-link relative group ${
                    link.active 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-900'
                  }`}
                  style={{
                    fontSize: isInHero ? '16px' : '18px',
                    paddingTop: isInHero ? '12px' : '16px',
                    paddingBottom: isInHero ? '12px' : '16px',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  {/* Mobile hover underline effect */}
                  {!link.active && (
                    <span 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-500 nav-link-underline"
                      style={{
                        backgroundColor: '#F97C04',
                        height: '2px',
                        '--text-width': `${link.label.length * 8}px`
                      } as React.CSSProperties & { '--text-width': string }}
                    />
                  )}
                </a>
              ))}
            </nav>
            <div className="px-6 py-4 border-t border-orange-100">
              <button 
                className="w-full flex items-center justify-center gap-2 px-4 rounded-lg bg-orange-500 text-white text-base font-medium mobile-cta-btn transition-all duration-500 ease-in-out hover:scale-105"
                style={{
                  paddingTop: isInHero ? '12px' : '16px',
                  paddingBottom: isInHero ? '12px' : '16px',
                  fontSize: isInHero ? '16px' : '18px',
                }}
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