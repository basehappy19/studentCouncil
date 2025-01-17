import { getUserData } from '@/app/functions/Auth'
import { UserData } from '@/app/interfaces/Auth/User';
import React from 'react'
import SettingProfile from './SettingProfile';
import { AllPlatforms, AllSkills } from '@/app/functions/PartyList';
import { Platform, Skill } from '@/app/interfaces/PartyList/partylist';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: `แก้ไขข้อมูลส่วนตัว ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "แก้ไขข้อมูลส่วนตัว สำหรับสมาชิก",
    openGraph: {
        title: `แก้ไขข้อมูลส่วนตัว ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description: "แก้ไขข้อมูลส่วนตัว สำหรับสมาชิก",
    },
    keywords: [
        "Student Own School",
        "เพราะนักเรียนเป็นเจ้าของโรงเรียน",
        "ติดตามนโยบาย",
        "ความคืบหน้านโยบาย",
        "หมวดหมู่นโยบาย",
        "สถานะนโยบาย",
        "นโยบายสภานักเรียน",
        "การอัปเดตนโยบาย",
        "การตรวจสอบนโยบาย",
        "สถิตินโยบาย",
        "สภานักเรียนโปร่งใส",
        "สภาโปร่งใส",
        "สภานักเรียน",
        "นักเรียน",
        "นโยบาย",
        "งบประมาณ",
        "มติ",
        "โรงเรียนภูเขียว"
    ],
}

const ProfilePage = async () => {
    const user: UserData | null = await getUserData();
    const platforms: Platform[] = await AllPlatforms();
    const skills: Skill[] = await AllSkills();
    if (!user) {
        return
    }

    return (
        <SettingProfile user={user} platforms={platforms} skills={skills} />
    )
}

export default ProfilePage