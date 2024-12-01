import { getUserWorkStatistics } from '@/app/functions/Work';
import { WorkStatistics } from '@/app/interfaces/Work/Work';
import { BriefcaseBusiness, UsersRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const WorkStatisticsCard = async () => {
    const works: WorkStatistics = await getUserWorkStatistics();

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <h2 className="text-2xl font-bold text-white text-center">สถิติการทำงาน</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <BriefcaseBusiness className='w-12 h-12 text-indigo-500' />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{works.workPostsCount.toString()}</p>
                    <p className="text-sm text-gray-600">งานที่โพสต์เอง</p>
                    <Link className='text-sm text-blue-500/80 underline' href={`/dashboard/works?filter=owner`}>ดูงานที่โพสต์เอง</Link>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <UsersRound className='w-12 h-12 text-purple-500' />
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{works.workParticipatedCount.toString()}</p>
                    <p className="text-sm text-gray-600">งานที่มีส่วนร่วม</p>
                    <Link className='text-sm text-purple-500/80 underline' href={`/dashboard/works?filter=participated`}>ดูงานที่มีส่วนร่วมทั้งหมด</Link>
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-600">
                    งานทั้งหมด {works.totalWorks.toString()} งาน
                </p>
            </div>
        </div>
    );
};

export default WorkStatisticsCard;
