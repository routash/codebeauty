"use client";
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      ariaLabel: 'Go to homepage'
    },
    {
      name: 'Courses',
      href: '/courses',
      ariaLabel: 'Browse programming courses',
      dropdown: [
        { name: 'C++ Course', href: '/courses/cpp' },
        { name: 'Python Course', href: '/courses/python' },
        { name: 'Java Course', href: '/courses/java' },
        { name: 'Web Development', href: '/courses/web-dev' }
      ]
    },
    {
      name: 'Tools',
      href: '/tools',
      ariaLabel: 'Access developer tools',
      dropdown: [
        { name: 'JSON Formatter', href: '/tools/json-formatter' },
        { name: 'XML Formatter', href: '/tools/xml-formatter' },
        { name: 'Calculators', href: '/tools/calculators' },
        { name: 'JSON Beautifier', href: '/tools/json-beautifier' },
        { name: 'Recent Links', href: '/tools/recent-links' },
        { name: 'Sitemap', href: '/sitemap' }
      ]
    },
    {
      name: 'About',
      href: '/about',
      ariaLabel: 'Learn about CodeBeauty'
    },
    {
      name: 'Blog',
      href: '/blog',
      ariaLabel: 'Read programming tutorials and articles'
    },
    {
      name: 'Contact',
      href: '/contact',
      ariaLabel: 'Contact us'
    }
  ];

  return (
    <>
      <header className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white shadow-2xl shadow-purple-100/50'
          : 'bg-white/98 backdrop-blur-xl'
        }`}>
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
          role="navigation"
        >
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo with SEO optimization */}
            <div className="flex-shrink-0 z-10">
              <Link
                href="/"
                className="flex items-center space-x-3 group"
                aria-label="CodeBeauty - Home"
                title="CodeBeauty - Learn Programming"
              >
                <div className="relative w-11 h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    CodeBeauty
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Learn. Code. Create.</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="px-4 xl:px-5 py-2.5 rounded-xl text-gray-700 hover:text-purple-600 font-semibold text-sm xl:text-base transition-all duration-300 flex items-center space-x-1.5 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 group/link"
                    aria-label={item.ariaLabel}
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-4 h-4 group-hover/link:rotate-180 transition-transform duration-300" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-purple-100/50 border border-purple-100/50 py-3 backdrop-blur-xl"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-purple-100/50 transform rotate-45"></div>
                      {item.dropdown.map((dropItem, index) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium text-sm group/item"
                          role="menuitem"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="group-hover/item:translate-x-1 inline-block transition-transform duration-200">
                            {dropItem.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-purple-50 transition-all duration-300 z-10"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
              ? 'max-h-[calc(100vh-5rem)] opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
            }`}
        >
          <div className="px-4 pt-2 pb-8 space-y-1 bg-gradient-to-b from-white to-purple-50/30 border-t border-purple-100/50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <a
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 font-semibold transition-all duration-300"
                  aria-label={item.ariaLabel}
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>
                {item.dropdown && (
                  <div className="ml-4 space-y-1 pl-4 border-l-2 border-purple-200">
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
           
          </div>
        </div>
      </header>
     
    </>
  );
}