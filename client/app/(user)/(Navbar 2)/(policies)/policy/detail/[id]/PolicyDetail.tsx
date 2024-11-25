'use client'

import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Info,
    Target,
    DollarSign,
    CheckCircle2,
    Circle,
    Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";

const PolicyProgressModal = ({
    policy,
    statuses
}: {
    policy: Policy,
    statuses: Status[]
}) => {
    const getStepStatus = (stepNumber: number) => {
        if (policy.progresses.length >= stepNumber) return 'completed';
        if (policy.progresses.length === stepNumber - 1) return 'current';
        return 'pending';
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="text-green-500" />;
            case 'current': return <Clock className="text-blue-500" />;
            default: return <Circle className="text-gray-300 dark:text-gray-600" />;
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Badge
                    variant="outline"
                    style={{
                        backgroundColor: policy.currentProgress.status.color + '20',
                        color: policy.currentProgress.status.color
                    }}
                >
                    ดูความคืบหน้า
                </Badge>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        ความคืบหน้านโยบาย
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {statuses.map((status, index) => {
                        const stepStatus = getStepStatus(status.step);

                        return (
                            <div
                                key={status.step}
                                className={cn(
                                    "flex items-center space-x-4 p-4 rounded-lg transition-all duration-300",
                                    stepStatus === 'completed' && "bg-green-50 dark:bg-green-300",
                                    stepStatus === 'current' && "bg-blue-50 dark:bg-blue-300",
                                    stepStatus === 'pending' && "bg-gray-50 dark:bg-gray-300"
                                )}
                            >
                                <div className="flex-shrink-0">
                                    {getStatusIcon(stepStatus)}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg dark:text-gray-800">{status.name}</h3>
                                    {stepStatus === 'completed' && policy.progresses[index] && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            เสร็จสิ้นเมื่อ: {new Date(policy.progresses[index].startedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};

const PolicyDetail = ({
    policy,
    statuses,
    policySrc,
    subcategoryIconSrc,
    categoryIconSrc
}: {
    policy: Policy,
    statuses: Status[],
    policySrc: string,
    subcategoryIconSrc: string,
    categoryIconSrc: string
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-12">
                <Card className="w-full">
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-full md:w-1/3">
                            <Image
                                className="object-cover w-full h-full max-h-[300px] rounded-lg shadow-lg"
                                width={1200}
                                height={500}
                                src={policySrc + policy.thumbnailImage}
                                alt={policy.title}
                            />
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <CardTitle className="text-4xl font-bold text-custom-gray">
                                {policy.title}
                            </CardTitle>

                            <div className="flex flex-wrap gap-2 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-500 px-3 py-1 rounded-full">
                                                <Image
                                                    width={16}
                                                    height={16}
                                                    src={categoryIconSrc + policy.category.icon}
                                                    className="w-4 h-4"
                                                    alt=""
                                                />
                                                {policy.category.title}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            หมวดหมู่นโยบาย
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {policy.subCategories.map((subCategory) => (
                                    <TooltipProvider key={subCategory.id}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-500 px-3 py-1 rounded-full">
                                                    <Image
                                                        width={16}
                                                        height={16}
                                                        src={subcategoryIconSrc + subCategory.subCategory.icon}
                                                        className="w-4 h-4"
                                                        alt=""
                                                    />
                                                    {subCategory.subCategory.title}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                หัวข้อย่อยของนโยบาย
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>

                            <div className="flex items-center gap-1">
                                <span className="text-lg font-semibold">สถานะ :</span>
                                <PolicyProgressModal policy={policy} statuses={statuses} />
                            </div>

                        </div>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="problem" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="problem" className="flex items-center gap-2">
                                    <Info className="w-4 h-4" /> ปัญหา
                                </TabsTrigger>
                                <TabsTrigger value="offer" className="flex items-center gap-2">
                                    <Target className="w-4 h-4" /> ข้อเสนอ
                                </TabsTrigger>
                                <TabsTrigger value="budget" className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> งบประมาณ
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="problem" className="mt-4">
                                <p className="text-muted-foreground leading-9">{policy.description.problem}</p>
                            </TabsContent>
                            <TabsContent value="offer" className="mt-4">
                                <p className="text-muted-foreground leading-9">{policy.description.offer}</p>
                            </TabsContent>
                            <TabsContent value="budget" className="mt-4">
                                <p className="text-muted-foreground leading-9">{policy.description.budget}</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PolicyDetail;