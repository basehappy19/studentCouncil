"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "./Menu";
import { ModeToggle } from "@/components/SwitchThemeButton";
import Logo from "@/public/Logo";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

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
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-transparent dark:bg-gray-900/50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Logo isScrolled={isScrolled} />
              </div>
              <span className="text-pink-500 md:hidden font-semibold text-nowrap text-md md:text-xl transition-colors duration-300 group-hover:text-pink-600 dark:group-hover:text-pink-400">
                Student Own School
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {Menu.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="flex items-center space-x-2 group"
                >
                  <div className={`text-gray-600 ${isScrolled ? "dark:text-gray-300" : "dark:text-gray-400"
                    } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300`}>

                  </div>
                  <Image className="object-fit" width={16} height={16} src={`/${item.icon}`} alt={`${item.title}`} />
                  <span
                    className={`text-nowrap relative text-gray-600 ${isScrolled ? "dark:text-gray-300" : "dark:text-gray-400"
                      } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300`}
                  >
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
              <div className="pl-2 border-l border-gray-200 dark:border-gray-700">
                <ModeToggle />
              </div>
            </div>

            <div className="flex items-center lg:hidden space-x-4">
              <ModeToggle />
              <div className="border-l border-gray-200 dark:border-gray-700 pl-4">
                <HamburgerButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
              </div>
            </div>
          </div>
        </div>
        <MobileMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </nav>
    </div>
  );
};

export default Navbar;