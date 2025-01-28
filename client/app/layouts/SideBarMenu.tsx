import { Backpack, BadgeDollarSign, BellRing, LayoutDashboard, MessageCircleMoreIcon, Monitor, User, UserCog, Vote } from 'lucide-react'

export const menuItems = [
    {   
        id: 1,
        href: '/dashboard/home',
        icon: <LayoutDashboard className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'แดชบอร์ด',
        accessId: [
            0
        ],
        public: true
    },
    {
        id: 2,
        href: '/dashboard/works',
        icon: <Backpack className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'การทำงาน',
        accessId: [
            0
        ],
        public: true
    },
    {
        id: 3,
        href: '/dashboard/checkInForgetRequests',
        icon: <BellRing className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'คำขอลืมเช็คอิน',
        accessId: [
            1, 3, 2
        ],
        public: false,
        badgeCount: 12,
    },
    {
        id: 4,
        href: '/dashboard/votes',
        icon: <Vote className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'การลงมติ',
        accessId: [
            1
        ],
        public: false
    },
    {
        id: 5,
        href: '/dashboard/traffy-fondue',
        icon: <Monitor className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'Traffy Fondue',
        accessId: [
            1, 4
        ],
        public: false
    },
    {
        id: 6,
        href: '/dashboard/budget',
        icon: <BadgeDollarSign className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'งบประมาณ',
        accessId: [
            0, 1, 2
        ],
        public: false
    },
    {
        id: 7,
        href: '/dashboard/users',
        icon: <UserCog className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'สมาชิกสภานักเรียน',
        accessId: [
            1
        ],
        public: false
    },
    {
        id: 8,
        href: '/dashboard/messages',
        icon: <MessageCircleMoreIcon className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'ข้อความ',
        accessId: [
            1
        ],
        public: true
    },
    {
        id: 9,
        href: '/dashboard/profile',
        icon: <User className='w-5 h-5 text-gray-500 dark:text-white' />,
        label: 'แก้ไขข้อมูลส่วนตัว',
        accessId: [
            0
        ],
        public: true
    },

]