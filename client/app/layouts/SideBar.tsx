"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { menuItems } from './SideBarMenu'
import { Skeleton } from '@/components/ui/skeleton'

const SideBar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { data: session, status } = useSession()
    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-custom-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className={`bg-gray-50 dark:bg-gray-800 fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-custom-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Close sidebar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {status === 'authenticated' && session.user ? (
                            menuItems
                                .filter(item =>
                                    Array.isArray(item.accessId) && (
                                        item.accessId.includes("all") || item.accessId.includes(session.user.accessId)
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
                                            {item.badge && (
                                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-custom-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-custom-gray-300">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))
                        ) : (
                            menuItems
                                .map((item) => (
                                    <li key={item.href}>
                                        <Skeleton className="h-10 w-full rounded-lg" />
                                    </li>
                                ))
                        )}
                        {status === 'authenticated' && session.user && (
                            <>
                                <li>
                                    <Link href="/" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-custom-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-custom-gray-400 group-hover:text-custom-gray-900 dark:group-hover:text-custom-white"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" /></svg>
                                        <span className="ms-3">กลับหน้าหลัก</span>
                                    </Link>
                                </li>
                                <li>
                                    <div onClick={() => signOut()} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-custom-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-custom-gray-400 group-hover:text-custom-gray-900 dark:group-hover:text-custom-white"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                                        <span className="ms-3">ออกจากระบบ</span>
                                    </div>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default SideBar