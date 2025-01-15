import {
    CheckCircle,
    PlusCircle,
    ClipboardCheck,
    LayoutDashboard
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PolicyTrackCard from "@/components/Policy/PolicyTrackCard";
import Link from "next/link";
import { Policy, StatisticProgresses as InterfaceStatisticProgresses, Status } from "@/app/interfaces/Policy/Policy";
import { Category } from "@/app/interfaces/Category/category";
import TagInHeader from "@/app/layouts/TagInHeader";

const Section = ({ policyProgressesStatus, params, categories, policies, statuses }: { policyProgressesStatus: InterfaceStatisticProgresses, params: { slug: string[] }, categories: Category[], policies: Policy[], statuses: Status[] }) => {

    return (
        <>
            <HeroSection />
            <StatsSection policyProgressesStatus={policyProgressesStatus} />
            <CategoriesAndPoliciesSection params={params} categories={categories} policies={policies} statuses={statuses} />
        </>
    )
}

export default Section

export const HeroSection = () => {
    return (
        <section
            className="relative py-20 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />
            <div className="relative container mx-auto px-4">
                <div
                    className="flex flex-col items-center space-y-4"
                >
                    <div>

                        <TagInHeader icon="Rocket" color="text-blue-500" title="ติดตามความคืบหน้า" />

                    </div>

                    <h1
                        className="text-center text-3xl md:text-7xl font-bold mb-3"
                    >
                        <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                            จับตานโยบายเดินทาง
                        </span>
                    </h1>
                    <h1
                        className="text-center text-3xl md:text-7xl font-bold"
                    >
                        <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                            ไปถึงขั้นตอนไหนแล้ว
                        </span>
                    </h1>
                </div>
            </div>
        </section>
    )
}

export const StatsSection = ({ policyProgressesStatus }: { policyProgressesStatus: InterfaceStatisticProgresses }) => {

    return (
        <section
            className="container mx-auto px-4 pt-12"
        >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
                <div
                    className="col-span-2 md:col-span-6"
                >
                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                    <LayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">นโยบายทั้งหมด</p>
                                    <h4 className="text-2xl font-bold">{policyProgressesStatus.policies}</h4>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {policyProgressesStatus.statistic.map((status) => (
                    <div
                        key={status.statusId}
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
                    </div>
                ))}
            </div>
        </section>
    )
}

export const CategoriesAndPoliciesSection = ({ params, categories, policies, statuses }:
    {
        params: { slug: string[] },
        categories: Category[],
        policies: Policy[],
        statuses: Status[]
    }
) => {

    return (
        <section
            className="container mx-auto px-4 py-12"
        >
            <div className="space-y-8">
                {/* Categories */}
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex items-center flex-row px-4 gap-4">
                                <Link
                                    scroll={false}
                                    href="/policy/watch"
                                    className={cn(
                                        "text-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300",
                                        "hover:shadow-md hover:-translate-y-1 hover:text-white",
                                        !params.slug || params.slug.length !== 1
                                            ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                                            : "bg-white dark:bg-gray-800 dark:text-white hover:bg-pink-500 dark:hover:bg-pink-500"
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
                                        scroll={false}
                                        key={category.id}
                                        href={`/policy/watch/${category.id}`}
                                        className={cn(
                                            "text-nowrap inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300",
                                            "hover:shadow-md hover:-translate-y-1 hover:text-white",
                                            params.slug && Number(params.slug[0]) === category.id
                                                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                                                : "bg-white dark:bg-gray-800 dark:text-white hover:bg-pink-500 dark:hover:bg-pink-500"
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
                </div>

                {/* Policy Cards Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {policies.map((policy) => (
                        <div
                            key={policy.id}
                            className="transform transition-all duration-300 hover:-translate-y-2"
                        >
                            <PolicyTrackCard policy={policy} statuses={statuses} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}