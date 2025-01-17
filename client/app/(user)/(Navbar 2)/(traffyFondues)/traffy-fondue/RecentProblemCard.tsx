import React from 'react';
import { Problem } from '@/app/interfaces/TraffyFondue/Location';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, Clock, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Carousel from './Carousel';

const RecentProblemCard = ({ problems }: { problems: Problem[] }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RESOLVED':
                return 'bg-green-500';
            case 'IN_PROGRESS':
                return 'bg-yellow-500';
            default:
                return 'bg-orange-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'RESOLVED':
                return 'แก้ไขแล้ว';
            case 'IN_PROGRESS':
                return 'กำลังดำเนินการแก้ไข';
            default:
                return 'รอรับเรื่อง';
        }
    };

    return (
        <Card className="bg-white dark:bg-slate-700">
            <CardHeader className="border-b dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                    <span className="text-xl">ปัญหาที่แจ้งล่าสุด</span>
                    <Badge variant="outline" className="ml-2 dark:text-white">
                        {problems.length} รายการ
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid gap-6">
                    {problems.map((problem) => (
                        <Card
                            key={problem.id}
                            className="overflow-hidden bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image Section */}
                                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                    {problem.reportedImages.length > 0 ? (
                                        <Carousel images={problem.reportedImages} />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                                            <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    )}
                                    <div className={`absolute top-4 right-4 ${getStatusColor(problem.status)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                                        {getStatusText(problem.status)}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                                {problem.status === "RESOLVED" ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <Clock className="h-5 w-5 text-orange-500" />
                                                )}
                                                {problem.title}
                                            </h3>
                                            <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                                                {problem.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                                <span className="flex items-center gap-1 text-sm">
                                                    {problem.location.location.name}
                                                    {problem.location?.subLocation?.name && (
                                                        <>
                                                            <ChevronRight className="h-4 w-4" />
                                                            {problem.location.subLocation.name}
                                                        </>
                                                    )}
                                                    {problem.location?.room?.name && (
                                                        <>
                                                            <ChevronRight className="h-4 w-4" />
                                                            {problem.location.room.name}
                                                        </>
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                <Clock className="h-4 w-4 flex-shrink-0" />
                                                <time dateTime={problem.createdAt} className="text-sm">
                                                    {new Date(problem.createdAt).toLocaleString("th-TH", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </time>
                                            </div>
                                        </div>

                                        {problem.solutions && (
                                            <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-600 rounded-lg">
                                                <h4 className="font-medium text-gray-800 dark:text-white mb-2">การแก้ไข</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {problem.solutions.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentProblemCard;