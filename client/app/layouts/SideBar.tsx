"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { menuItems } from './SideBarMenu'
import { UserData } from '../interfaces/Auth/User'
import { Home, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import Logo from '@/public/Logo'

const SideBar = ({ user, forgetCheckInRequests = 0, messages }: { user: UserData | null, forgetCheckInRequests: number, messages: { message: string }[] }) => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById('default-sidebar')
            if (isOpen && sidebar && !sidebar.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <div className="relative">
            {/* Mobile Menu Button - Made more prominent */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 inline-flex items-center justify-center p-3 rounded-lg 
                          bg-blue-500 dark:bg-blue-600 shadow-lg
                          text-white hover:bg-blue-600 dark:hover:bg-blue-700 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                          transition-colors duration-200 sm:hidden"
            >
                <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Enhanced overlay with blur effect */}
            {isOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-30 sm:hidden"
                    onClick={() => setIsOpen(false)} />
            )}

            {/* Sidebar with improved mobile presence */}
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 h-screen w-[280px] sm:w-64
                          bg-white dark:bg-gray-900 
                          border-r border-gray-200 dark:border-gray-800
                          shadow-xl
                          transition-transform duration-300 ease-in-out
                          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                          sm:translate-x-0`}
            >
                <div className="flex flex-col h-full px-3 py-4">
                    <div className="mb-6 px-2 flex items-center justify-center">
                        <Link href={`/`}>
                            <Logo isScrolled={true} />
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {user && menuItems
                            .filter(item =>
                                item.public &&
                                Array.isArray(item.accessId) && (
                                    item.accessId.includes(0) ||
                                    item.accessId.includes(user.data.access.id)
                                )
                            )
                            .map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group relative flex items-center px-3 py-2.5 rounded-lg
                                              text-sm font-medium transition duration-200
                                              ${pathname.startsWith(item.href)
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <div className="flex items-center flex-1 min-w-0">
                                        {React.cloneElement(item.icon, {
                                            className: `flex-shrink-0 w-5 h-5 mr-3 transition-colors duration-200
                                                      ${pathname.startsWith(item.href)
                                                    ? 'text-blue-700 dark:text-blue-400'
                                                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                                                }`
                                        })}
                                        <span className="truncate">{item.label}</span>
                                    </div>

                                    {/* Repositioned badges with improved styling */}
                                    {item.id === 8 && messages.length > 0 && (
                                        <span className="flex-shrink-0 ml-2 px-2 py-0.5 text-xs font-medium
                                                       bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 
                                                       rounded-full">
                                            {messages.length}
                                        </span>
                                    )}
                                    {item.id === 3 && forgetCheckInRequests > 0 && (
                                        <span className="flex-shrink-0 ml-2 px-2 py-0.5 text-xs font-medium
                                                       bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 
                                                       rounded-full">
                                            {forgetCheckInRequests}
                                        </span>
                                    )}

                                    <ChevronRight className={`flex-shrink-0 w-4 h-4 ml-2 opacity-0 -translate-x-2
                                                            group-hover:opacity-100 group-hover:translate-x-0
                                                            transition-all duration-200
                                                            ${pathname.startsWith(item.href) ? 'opacity-100 translate-x-0' : ''}`} />
                                </Link>
                            ))
                        }
                    </nav>

                    <div className="pt-4 mt-4 space-y-1 border-t border-gray-200 dark:border-gray-800">
                        <Link
                            href="/"
                            className="group flex items-center px-3 py-2.5 rounded-lg
                                     text-sm font-medium text-gray-700 dark:text-gray-300
                                     hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                        >
                            <Home className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 
                                           group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                            กลับหน้าหลัก
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full group flex items-center px-3 py-2.5 rounded-lg
                                     text-sm font-medium text-red-600 dark:text-red-400
                                     hover:bg-red-50 dark:hover:bg-red-900/30 transition duration-200"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default SideBar