'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from "./Menu";
import Link from 'next/link';
import Image from 'next/image';

const MobileMenu = ({ toggleMenu, isMenuOpen }: { toggleMenu: () => void, isMenuOpen: boolean }) => {
    return (
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
                                    onClick={() => toggleMenu()}
                                >
                                    <Image className="mr-2 object-fit inline-flex" width={32} height={32} src={`/${item.icon}`} alt={`${item.title}`} />
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobileMenu