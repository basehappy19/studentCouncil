import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckInStatistic, StatusCountType } from '@/app/interfaces/CheckIn/CheckIn';

const StatisticPartyLists = ({ checkInStatistics }: { checkInStatistics: CheckInStatistic[] }) => {

    const getStatusColor = (status: StatusCountType) => {
        const colors = {
            NORMAL: "bg-green-500",
            SICK_LEAVE: "bg-orange-500",
            PERSONAL_LEAVE: "bg-yellow-500",
            NOT_CHECKED_IN: "bg-red-500",
            ABSENT: "bg-red-700",
            FORGOT_TO_CHECK_IN: "bg-purple-500",
        };
        return colors[status];
    };


    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">ภาพรวมการเช็คอิน</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background">
                            <TableRow>
                                <TableHead className="w-[300px]">ชื่อ</TableHead>
                                <TableHead>ล็อคอินเฉลี่ย</TableHead>
                                <TableHead className="text-center">จาก {checkInStatistics[0]?.statistics.days} วัน</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {checkInStatistics.map((person) => (
                                <TableRow key={person.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage
                                                    src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH}${person.profile_image_128x128}`}
                                                    alt={person.fullName}
                                                />
                                                <AvatarFallback>{person.fullName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{person.fullName}</span>
                                                <span className="text-sm text-muted-foreground">{person.nickName}</span>
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {person.roles.map((role, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            {role.role.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">
                                            {person.statistics.averageCheckInTime}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="grid grid-cols-2 gap-2">
                                            {person.statistics.statusCounts.map((status, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(status.type)}`} />
                                                        <span className="text-sm">{status.name}</span>
                                                    </div>
                                                    <span className="font-medium">{status.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default StatisticPartyLists;