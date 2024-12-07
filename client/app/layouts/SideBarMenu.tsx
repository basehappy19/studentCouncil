import { Backpack, BadgeDollarSign, BellRing, LayoutDashboard, Monitor, UserCog, Vote } from 'lucide-react'

export const menuItems = [
    {
        href: '/dashboard/home',
        icon: <LayoutDashboard className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'แดชบอร์ด',
        accessId: [
            0
        ]
    },
    {
        href: '/dashboard/works',
        icon: <Backpack className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'การทำงาน',
        accessId: [
            0
        ]
    },
    {
        href: '/dashboard/checkInForgetRequests',
        icon: <BellRing className='w-5 h-5 text-gray-500 dark:text-white'/>,
        label: 'คำขอลืมเช็คอิน',
        accessId: [
            1, 3, 2
        ],
        badgeCount: 12,
    },
    {
        href: '/dashboard/votes',
        icon: <Vote className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'การลงมติ',
        accessId: [
            1
        ]
    },
    {
        href: '/dashboard/traffy-fondue',
        icon: <Monitor className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'Traffy Fondue',
        accessId: [
            1,4
        ]
    },
    {
        href: '/dashboard/budget',
        icon: <BadgeDollarSign className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'งบประมาณ',
        accessId: [
            0,1,2
        ]
    },
    {
        href: '/dashboard/users',
        icon: <UserCog className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'สมาชิกสภานักเรียน',
        accessId: [
            1
        ]
    }
    
]