"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "./Menu";

const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleScroll() {
      const isTop = window.scrollY < 10;
      if (isTop !== isScrolled) {
        setIsScrolled(isTop);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const backgroundColor = isScrolled ? "bg-custom-nav-unscroll-bg" : "bg-custom-nav-scroll-bg";
  const backdropFilter = isScrolled ? "backdrop-blur-none" : "backdrop-blur-[10px]";
  const sizeNavbar = isScrolled ? "p-8" : "p-4";
  const styleClass = `${backgroundColor} ${backdropFilter} ${sizeNavbar}`;

  return (
    <div className="h-[80px]">
      <nav
        className={`${styleClass} transition-all duration-1000 flex flex-wrap items-center justify-between fixed top-0 z-50 w-full`}
      >
        <Link href="/" className="text-custom-black font-medium">Logo</Link>
        <div className="flex gap-3 items-center lg:hidden">
          <span>กดชั้นสิ {"->"}</span>
          <button
            className="border-0 focus:outline-0 focus:shadow-none active:outline-0 active:shadow-none"
            type="button"
            onClick={() => toggleMenu()}
          >
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen
                  ? "bg-red-500 rotate-45 origin-[10%_10%]"
                  : "rotate-0 bg-slate-500"
              }`}
            ></span>
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen
                  ? "bg-red-500 opacity-0"
                  : "opacity-100 bg-slate-500"
              }`}
              style={{margin: '3.5px auto'}}
            ></span>
            <span
              className={`w-7 h-1 block transition-all rounded-md ${
                isMenuOpen
                  ? "bg-red-500 -rotate-45 origin-[10%_90%]"
                  : "rotate-0 bg-slate-500"
              }`}
            ></span>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4 m-0">
          <ul className="lg:flex m-0 p-0">
            {Menu.map((menu, key) => (
              <li className="lg:ms-2" key={key}>
                <Link
                  href={menu.path}
                  className="text-custom-gray px-2 py-1.5 transition-colors ease-in-out duration-300 font-medium rounded-lg inline-block hover:bg-custom-nav-link-bg hover:text-custom-white"
                >
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {isMenuOpen ? (
          <div className="basis-full flex-col lg:hidden lg:space-x-4 text-center m-0">
            <ul className="m-0 p-0">
              {Menu.map((menu, key) => (
                <li key={key}>
                  <Link
                    href={menu.path}
                    className="text-custom-gray px-2 py-1.5 transition-colors ease-in-out duration-300 font-medium mb-3 rounded-lg inline-block hover:bg-navlinkBgColor hover:text-custom-white"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
