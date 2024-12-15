'use client'

import React from 'react';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import {
    Info,
    Target,
    DollarSign,
} from "lucide-react";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import PolicyProgressModal from '@/components/Policy/PolicyProgressModal';
import LinkPolicy from './LikePolicy';
import CommentForm from './Comment';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="relative">
                        <Image
                            className="w-full h-full max-h-[500px] object-cover rounded-2xl shadow-2xl"
                            width={1200}
                            height={500}
                            src={policySrc + policy.thumbnailImage}
                            alt={policy.title}
                        />
                    </div>

                    {/* Policy Info Section */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            {policy.title}
                        </h1>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
                                            <Image
                                                width={16}
                                                height={16}
                                                src={categoryIconSrc + policy.category.icon}
                                                className="w-4 h-4"
                                                alt={policy.category.title}
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
                                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
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

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <PolicyProgressModal policy={policy} statuses={statuses} />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <LinkPolicy policy={policy} />
                </div>

                {/* Policy Details Section */}
                <div className="mt-6 space-y-8">
                    {/* Problem Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-700 dark:text-white">
                            <Info className="w-6 h-6 text-blue-500" /> ปัญหา
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-8">
                            {policy.description.problem}
                        </p>
                    </div>

                    {/* Offer Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-700 dark:text-white">
                            <Target className="w-6 h-6 text-green-500" /> ข้อเสนอ
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-8">
                            {policy.description.offer}
                        </p>
                    </div>

                    {/* Budget Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-700 dark:text-white">
                            <DollarSign className="w-6 h-6 text-purple-500" /> งบประมาณ
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-8">
                            {policy.description.budget}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <CommentForm policy={policy} />
                </div>
            </div>
        </div>
    );
};

export default PolicyDetail;