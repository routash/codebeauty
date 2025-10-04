"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "JSON Formatter", href: "/JSON Formatter" },
    { name: "XML Formatter", href: "/XML Formatter" },
    { name: "Calculators", href: "/Calculators" },
    { name: "JSON Beautifier", href: "/JSON Beautifier" },
    { name: "Recent Links", href: "/Recent Links" },
    { name: "Sitemap", href: "/Sitemap" },
    { name: "Blog", href: "/Blog" }
  ];

  return (
    <header
      className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CodeBeauty
                </span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Learn. Code. Create.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (Simple Links) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 text-sm xl:text-base font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-md text-gray-700 hover:bg-purple-50 transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Simple Links) */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-5rem)] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-gray-700 hover:text-purple-600 text-sm font-medium transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
