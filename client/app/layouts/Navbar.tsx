"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "./Menu";
import { ModeToggle } from "@/components/SwitchThemeButton";
import Logo from "@/public/Logo";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleScroll() {
      const isTop = window.scrollY > 10;
      if (isTop !== isScrolled) {
        setIsScrolled(isTop);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <div className="h-20">
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300
          ${isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent dark:bg-slate-700'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center space-x-2"
            >

              <Logo isScrolled={isScrolled} />
              <span className="text-pink-500 md:hidden font-semibold text-xl">Student Own School</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-4">
              {Menu.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative text-gray-600 ${isScrolled ? `dark:text-gray-300` : `dark:text-gray-400`} hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2 group`}
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
              <ModeToggle />
            </div>

            <div className="flex items-center lg:hidden space-x-4">
              <ModeToggle />
              <HamburgerButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

            </div>
          </div>
        </div>
        <MobileMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
        
      </nav>
    </div>
  );
};

export default Navbar;