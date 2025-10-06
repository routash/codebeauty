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

export function SubNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 36);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Using `category` from constants for dropdown data

    return (
        <>
            <div className={`fixed my-4 py-3 ${isScrolled ? 'top-0' : 'top-18'} left-0 right-0 z-50 transition-[top,background-color,box-shadow] duration-700 ease-in-out ${isScrolled
                ? 'bg-white shadow-2xl shadow-purple-100/50'
                : 'bg-white/98 backdrop-blur-xl'
                }`}>
                <nav
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    aria-label="Main navigation"
                    role="navigation"
                >
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {category.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <NavigationMenuTrigger className="rounded-xl">
                                        {/* {item.name} */}
                                        <Link href={item.href || ""}>
                                        {item.name}
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="rounded-2xl border border-purple-100/50 shadow-2xl shadow-purple-100/50">
                                        <div className={`${item.subcategories.length >= 7 ? 'w-[28rem]' : 'w-64'} py-2`}>
                                            <div className={`grid gap-1 ${item.subcategories.length >= 7 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                {item.subcategories.map((sub) => (
                                                    <NavigationMenuLink asChild key={sub.name}>
                                                        <Link
                                                            href={`/${sub.to}`}
                                                            className="px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-colors duration-200 font-medium text-sm rounded-lg"
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