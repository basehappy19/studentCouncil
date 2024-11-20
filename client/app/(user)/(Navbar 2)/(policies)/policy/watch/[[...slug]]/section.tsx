'use client'
import { motion } from "framer-motion";
import {
    CheckCircle,
    PlusCircle,
    ClipboardCheck,
    TrendingUp,
    Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PolicyTrackCard from "@/components/Policy/PolicyTrackCard";
import Link from "next/link";
import { Policy, StatisticProgresses as InterfaceStatisticProgresses, Status } from "@/app/interfaces/Policy/Policy";
import { Category } from "@/app/interfaces/Category/category";
import TagInHeader from "@/app/layouts/TagInHeader";

const SectionComponents = ({ policyProgressesStatus, params, categories, policies, statuses }: { policyProgressesStatus: InterfaceStatisticProgresses, params: { slug: string[] }, categories: Category[], policies: Policy[], statuses: Status[] }) => {

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    return (
        <>
            <HeroSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
            <StatsSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} policyProgressesStatus={policyProgressesStatus} />
            <CategoriesAndPoliciesSection fadeInUp={fadeInUp} staggerContainer={staggerContainer} params={params} categories={categories} policies={policies} statuses={statuses} />
        </>
    )
}

export default SectionComponents

export const HeroSection = ({ fadeInUp, staggerContainer }:
    {
        fadeInUp: {
            initial: { opacity: number, y: number },
            animate: { opacity: number, y: number },
            transition: { duration: number }
        },
        staggerContainer: {
            animate: {
                transition: {
                    staggerChildren: number
                }
            }
        }
    }
) => {

    return (
        <motion.section
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative py-20 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />
            <div className="relative container mx-auto px-4">
                <motion.div
                    className="flex flex-col items-center space-y-4"
                    variants={staggerContainer}
                >
                    <motion.div
                        variants={fadeInUp}
                    >

                        <TagInHeader icon="Rocket" color="text-blue-500" title="ติดตามความคืบหน้า" />

                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-center text-5xl md:text-7xl font-bold mb-3"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
                            จับตานโยบายเดินทาง
                        </span>
                    </motion.h1>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-center text-5xl md:text-7xl font-bold"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
                            ไปถึงขั้นตอนไหนแล้ว
                        </span>
                    </motion.h1>
                </motion.div>
            </div>
        </motion.section>
    )
}

export const StatsSection = ({ fadeInUp, staggerContainer, policyProgressesStatus }:
    {
        fadeInUp: {
            initial: { opacity: number, y: number },
            animate: { opacity: number, y: number },
            transition: { duration: number }
        },
        staggerContainer: {
            animate: {
                transition: {
                    staggerChildren: number
                }
            }
        },
        policyProgressesStatus: InterfaceStatisticProgresses
    }
) => {

    return (
        <motion.section
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="container mx-auto px-4 pt-12"
        >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
                <motion.div
                    variants={fadeInUp}
                    className="col-span-2 md:col-span-6"
                >
                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">นโยบายทั้งหมด</p>
                                    <h4 className="text-2xl font-bold">{policyProgressesStatus.policies}</h4>
                                </div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-blue-500/50" />
                        </CardContent>
                    </Card>
                </motion.div>

                {policyProgressesStatus.statistic.map((status) => (
                    <motion.div
                        key={status.statusId}
                        variants={fadeInUp}
                        className="col-span-1 md:col-span-3"
                    >
                        <Card className="hover:shadow-lg transition-all duration-300">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">{status.status.name}</p>
                                    <h4 className="text-2xl font-bold">{status.count}</h4>
                                </div>
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                                    <ClipboardCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

export const CategoriesAndPoliciesSection = ({ fadeInUp, staggerContainer, params, categories, policies, statuses }:
    {
        fadeInUp: {
            initial: { opacity: number, y: number },
            animate: { opacity: number, y: number },
            transition: { duration: number }
        },
        staggerContainer: {
            animate: {
                transition: {
                    staggerChildren: number
                }
            }
        },
        params: { slug: string[] },
        categories: Category[],
        policies: Policy[],
        statuses: Status[]
    }
) => {

    return (
        <motion.section
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="container mx-auto px-4 py-12"
        >
            <div className="space-y-8">
                {/* Categories */}
                <motion.div variants={fadeInUp} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-white pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-1 bg-blue-400 dark:bg-white pointer-events-none" />
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex items-center flex-row px-4 gap-4">
                                <Link
                                    href="/policy/watch"
                                    className={cn(
                                        "inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300",
                                        "hover:shadow-md hover:-translate-y-1 hover:text-white",
                                        !params.slug || params.slug.length !== 1
                                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                                            : "bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500"
                                    )}
                                >
                                    ทั้งหมด
                                    {!params.slug || params.slug.length <= 0 ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <PlusCircle className="w-4 h-4" />
                                    )}
                                </Link>

                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/policy/watch/${category.id}`}
                                        className={cn(
                                            "inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300",
                                            "hover:shadow-md hover:-translate-y-1 hover:text-white",
                                            params.slug && Number(params.slug[0]) === category.id
                                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                                                : "bg-white dark:bg-gray-800 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500"
                                        )}
                                    >
                                        {category.title}
                                        {params.slug && Number(params.slug[0]) === category.id ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <PlusCircle className="w-4 h-4" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">หมวดหมู่นโยบาย</p>
                </motion.div>

                {/* Policy Cards Grid */}
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {policies.map((policy, index) => (
                        <motion.div
                            key={policy.id}
                            variants={fadeInUp}
                            custom={index}
                            className="transform transition-all duration-300 hover:-translate-y-2"
                        >
                            <PolicyTrackCard policy={policy} statuses={statuses} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}