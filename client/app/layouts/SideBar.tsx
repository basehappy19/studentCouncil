"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { menuItems } from './SideBarMenu'
import { UserData } from '../interfaces/Auth/User'
import { Home, LogOut, Menu } from 'lucide-react'

const SideBar = ({ user, badgeCount = 0 }: { user: UserData | null, badgeCount: number }) => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-custom-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <Menu className='w-5 h-5 text-gray-500 dark:text-white' />
            </button>

            <aside id="default-sidebar" className={`bg-gray-50 dark:bg-gray-800 fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-custom-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Close sidebar</span>
                    <Menu className='w-5 h-5 text-gray-500 dark:text-white' />
                </button>
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {user && menuItems
                            .filter(item =>
                                Array.isArray(item.accessId) && (
                                    item.accessId.includes(0) || item.accessId.includes(user.data.access.id)
                                )
                            )
                            .map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-custom-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                    >
                                        {item.icon}
                                        <span className="ms-3">{item.label}</span>
                                        {item.href === '/dashboard/checkInForgetRequests' && badgeCount > 0 && (
                                            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-red-100 bg-red-600 rounded-full">
                                                {badgeCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))
                        }


                        <li>
                            <Link href="/" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-custom-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                                <Home className='w-5 h-5 text-gray-500 dark:text-white' />
                                <span className="ms-3">กลับหน้าหลัก</span>
                            </Link>
                        </li>
                        <li>
                            <div onClick={() => signOut({ callbackUrl: '/' })} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-custom-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                                <LogOut className='w-5 h-5 text-gray-500 dark:text-white' />
                                <span className="ms-3">ออกจากระบบ</span>
                            </div>
                        </li>


                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SideBar