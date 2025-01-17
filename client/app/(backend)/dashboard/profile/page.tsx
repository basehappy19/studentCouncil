import { getUserData } from '@/app/functions/Auth'
import { UserData } from '@/app/interfaces/Auth/User';
import React from 'react'
import SettingProfile from './SettingProfile';
import { AllPlatforms, AllSkills } from '@/app/functions/PartyList';
import { Platform, Skill } from '@/app/interfaces/PartyList/partylist';

const ProfilePage = async () => {
    const user : UserData | null = await getUserData();
    const platforms : Platform[] = await AllPlatforms();
    const skills : Skill[] = await AllSkills();
    if(!user){
        return
    }
    
    return (
        <SettingProfile user={user} platforms={platforms} skills={skills} />
    )
}

export default ProfilePage