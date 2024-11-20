import { DashboardIcon, BriefcaseIcon, UsersIcon, TraffyFondueIcon, MoneyIcon, VoteIcon } from '@/components/DashBoard/Icon'

export const menuItems = [
    {
        href: '/dashboard',
        icon: DashboardIcon,
        label: 'แดชบอร์ด',
        accessId: [
            "all"
        ]
    },
    {
        href: '/dashboard/work',
        icon: BriefcaseIcon,
        label: 'การทำงาน',
        accessId: [
            "all"
        ]
    },
    {
        href: '/dashboard/votes',
        icon: VoteIcon,
        label: 'การลงมติ',
        accessId: [
            3
        ]
    },
    {
        href: '/dashboard/traffy-fondue',
        icon: TraffyFondueIcon,
        label: 'Traffy Fondue',
        accessId: [
            3,4
        ]
    },
    {
        href: '/dashboard/budget',
        icon: MoneyIcon,
        label: 'งบประมาณ',
        accessId: [
            "all",3,2
        ]
    },
    {
        href: '/dashboard/users',
        icon: UsersIcon,
        label: 'สมาชิกสภานักเรียน',
        accessId: [
            3
        ]
    }
    
]