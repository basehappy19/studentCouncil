"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "./Menu";
import { ModeToggle } from "@/components/SwitchThemeButton";
import { motion, AnimatePresence } from "framer-motion";

const NavbarSecondary = () => {
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
            : 'bg-gradient-to-br from-yellow-100 via-blue-50 to-pink-100 dark:bg-slate-700 dark:bg-none'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/" 
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                Logo
              </span>
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
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col space-y-4">
                  {Menu.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default NavbarSecondary;