"use client";
import { useState, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { category } from '@/utils/consitants/consitaint';
import { ChevronDown } from 'lucide-react';

export function SubNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 36);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed ${
          isScrolled ? 'top-[56px]' : 'top-[56px]'
        } left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white shadow-md shadow-purple-100/50 border-b border-purple-100/30'
            : 'bg-white/95 backdrop-blur-lg shadow-sm shadow-purple-100/30'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"
          aria-label="Main navigation"
          role="navigation"
        >
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex-wrap justify-center gap-0 py-1">
              {category.slice(0, 12).map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger className="rounded-lg px-2 py-0.5 text-sm">
                    <Link href={item.href || ""}>{item.name}</Link>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="rounded-2xl border border-purple-100/50 shadow-2xl shadow-purple-200/60 bg-white">
                    <div
                      className={`${
                        item.subcategories.length >= 7 ? 'w-[26rem]' : 'w-60'
                      } py-1`}
                    >
                      <div
                        className={`grid gap-0.5 ${
                          item.subcategories.length >= 7
                            ? 'grid-cols-2'
                            : 'grid-cols-1'
                        }`}
                      >
                        {item.subcategories.map((sub) => (
                          <NavigationMenuLink asChild key={sub.name}>
                            <Link
                              href={`/${sub.to}`}
                              className="px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-colors duration-200 font-medium text-xs rounded-md"
                              role="menuitem"
                            >
                              {sub.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                    </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </>
  );
}
