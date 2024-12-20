import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckInStatistic, StatusCountType } from '@/app/interfaces/CheckIn/CheckIn';
import StatisticSearchBar from './StatisticSearchBar';

const StatisticPartyLists = ({ checkInStatistics }: { checkInStatistics: CheckInStatistic[] }) => {
    const getStatusColor = (status: StatusCountType) => {
        const colors: { [key in StatusCountType]: string } = {
            NORMAL: "bg-green-500",
            SICK_LEAVE: "bg-orange-500",
            PERSONAL_LEAVE: "bg-yellow-500",
            NOT_CHECKED_IN: "bg-red-500",
            ABSENT: "bg-red-700",
            FORGOT_TO_CHECK_IN: "bg-purple-500",
            REQUEST_FOR_CHECK_IN: "bg-blue-500",
        };
        return colors[status] || "bg-gray-500";
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl">ภาพรวมการเช็คอิน</CardTitle>
                <div className="text-sm text-muted-foreground">
                    ทั้งหมด {checkInStatistics[0]?.statistics.days} วัน
                </div>
            </CardHeader>
            <CardContent>
                <StatisticSearchBar />
                <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                        {checkInStatistics.map((person) => (
                            <Card key={person.id} className="p-4">
                                <div className="flex flex-col space-y-4">
                                    {/* Header Section with Avatar and Basic Info */}
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage
                                                src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH}${person.profile_image_128x128}`}
                                                alt={person.fullName}
                                            />
                                            <AvatarFallback>{person.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{person.fullName}</h3>
                                            <p className="text-sm text-muted-foreground">{person.nickName}</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {person.roles.map((role, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                                                    >
                                                        {role.role.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Average Check-in Time */}
                                    <div className="bg-muted p-3 rounded-lg">
                                        <div className="text-sm text-muted-foreground">เวลาเช็คอินเฉลี่ย</div>
                                        <div className="text-lg font-semibold">
                                            {person.statistics.averageCheckInTime}
                                        </div>
                                    </div>

                                    {/* Status Grid */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {person.statistics.statusCounts.map((status, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 rounded-md bg-muted"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${getStatusColor(
                                                            status.type
                                                        )}`}
                                                    />
                                                    <span className="text-xs md:text-sm">{status.name}</span>
                                                </div>
                                                <span className="font-medium text-sm">{status.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default StatisticPartyLists;