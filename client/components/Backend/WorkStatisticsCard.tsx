import { getUserWorkStatistics } from '@/app/functions/Work';
import { WorkStatistics } from '@/app/interfaces/Work/Work';
import { BriefcaseBusiness, UsersRound, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatItem = ({ icon: Icon, count, label, linkHref, linkText, iconColor }: {
    icon: any;
    count: number;
    label: string;
    linkHref: string;
    linkText: string;
    iconColor: string;
}) => (
    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className={`p-3 rounded-full bg-opacity-10 dark:bg-opacity-10 ${iconColor}`}>
            <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{count.toString()}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <Link
            href={linkHref}
            className="group inline-flex items-center text-sm font-medium hover:underline space-x-1"
        >
            <span className={`${iconColor} opacity-80`}>{linkText}</span>
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${iconColor}`} />
        </Link>
    </div>
);

const WorkStatisticsCard = async () => {
    const works: WorkStatistics = await getUserWorkStatistics();

    return (
        <Card className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
                <CardTitle className="text-2xl font-bold text-white text-center">
                    สถิติการทำงาน
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatItem
                        icon={BriefcaseBusiness}
                        count={works.workPostsCount}
                        label="งานที่โพสต์เอง"
                        linkHref="/dashboard/works?filter=owner"
                        linkText="ดูงานที่โพสต์เอง"
                        iconColor="text-indigo-500"
                    />
                    <StatItem
                        icon={UsersRound}
                        count={works.workParticipatedCount}
                        label="งานที่มีส่วนร่วม"
                        linkHref="/dashboard/works?filter=participated"
                        linkText="ดูงานที่มีส่วนร่วมทั้งหมด"
                        iconColor="text-purple-500"
                    />
                </div>
                <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        งานทั้งหมด{' '}
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {works.totalWorks.toString()}
                        </span>
                        {' '}งาน
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkStatisticsCard;