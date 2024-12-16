'use client'
import React from 'react'
import { motion } from "framer-motion";

const HamburgerButton = ({toggleMenu, isMenuOpen} : { toggleMenu: () => void, isMenuOpen: boolean}) => {
    return (
        <button
            onClick={toggleMenu}
            className="group p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle Menu"
        >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
                <motion.span
                    animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        x: isMenuOpen ? 4 : 0,
                        backgroundColor: isMenuOpen ? '#ef4444' : 'currentColor'
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-current origin-left"
                />
                <motion.span
                    animate={{
                        opacity: isMenuOpen ? 0 : 1,
                        x: isMenuOpen ? 4 : 0,
                        scaleX: isMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-current origin-center"
                />
                <motion.span
                    animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        x: isMenuOpen ? 4 : 0,
                        backgroundColor: isMenuOpen ? '#ef4444' : 'currentColor'
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-current origin-left"
                />
            </div>
        </button>
    )
}

export default HamburgerButton