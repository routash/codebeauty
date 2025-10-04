"use client";
import { Sparkles, Star, Github, Twitter, Youtube, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const footerSections = [
    {
      title: 'Learn',
      links: [
        { name: 'C++ Course', href: '/courses/cpp' },
        { name: 'Python Course', href: '/courses/python' },
        { name: 'Java Course', href: '/courses/java' },
        { name: 'Web Development', href: '/courses/web-dev' }
      ]
    },
    {
      title: 'Tools',
      links: [
        { name: 'JSON Formatter', href: '/tools/json-formatter' },
        { name: 'XML Formatter', href: '/tools/xml-formatter' },
        { name: 'Calculators', href: '/tools/calculators' },
        { name: 'JSON Beautifier', href: '/tools/json-beautifier' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Sitemap', href: '/sitemap' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Favorites', href: '/favorites' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/codebeauty' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/codebeauty' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/codebeauty' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@codebeauty.com' }
  ];

  return (
    <footer className="bg-gradient-to-b from-white via-purple-50/30 to-purple-100/50 border-t border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <Link 
                href="/" 
                className="flex items-center space-x-3 group w-fit"
                aria-label="CodeBeauty - Home"
              >
                <div className="relative w-11 h-11 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    CodeBeauty
                  </span>
                  <span className="text-xs text-gray-500 -mt-1">Learn. Code. Create.</span>
                </div>
              </Link>
              
              <p className="text-gray-600 leading-relaxed max-w-md">
                Master programming with beautiful, interactive courses and powerful developer tools. 
                Join thousands of developers on their coding journey.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2.5 rounded-xl text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group"
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-bold text-gray-900 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-purple-600 transition-colors duration-300 text-sm font-medium group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-purple-100/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-sm">
                Get the latest programming tutorials and tool updates
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
                aria-label="Email address"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white font-bold rounded-r-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-purple-100/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>© 2024 CodeBeauty. All rights reserved.</span>
              <span className="hidden md:block">•</span>
              <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors duration-300 group">
                <Star className="w-4 h-4 group-hover:fill-purple-600 transition-all duration-300" />
                <span>Favorites (3)</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
