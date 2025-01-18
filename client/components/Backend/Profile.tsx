import { UserData } from '@/app/interfaces/Auth/User';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfileCard = ({ user }: { user: UserData['data'] }) => {
    return (
        <Card className="w-full md:w-1/2 flex-1 overflow-hidden border-0 shadow-xl dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-orange-300/20 to-cyan-500/20 dark:from-cyan-500/10 dark:via-orange-300/10 dark:to-cyan-500/10 blur-xl" />
                
                {/* Content Container */}
                <div className="relative p-6 flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 to-orange-300 dark:from-cyan-400 dark:to-orange-400 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur" />
                        <Image
                            src={`${process.env.NEXT_PUBLIC_USER_PROFILE_IMG_128X128_PATH}${user.profile_image_128x128}`}
                            alt={user.displayName}
                            width={192}
                            height={192}
                            className="relative h-48 w-48 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl transform group-hover:scale-105 transition duration-300"
                        />
                    </div>
                </div>
            </div>

            <CardHeader className="space-y-2 text-center px-6 pb-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-300 bg-clip-text text-transparent">
                    {user.displayName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    @{user.username}
                </p>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                            ตำแหน่ง
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.partyList.roles.map((role) => (
                                <Badge 
                                    key={role.role.id} 
                                    variant="secondary"
                                    className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-orange-100 dark:from-cyan-900/40 dark:to-orange-900/40 text-gray-800 dark:text-gray-200 hover:from-cyan-200 hover:to-orange-200 dark:hover:from-cyan-900/60 dark:hover:to-orange-900/60 transition-colors duration-300"
                                >
                                    {role.role.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;