import { AllCheckIns, CheckInStatistics } from "@/app/functions/CheckIn";
import { CheckIns, CheckInStatistic } from "@/app/interfaces/CheckIn/CheckIn";
import TagInHeader from "@/app/layouts/TagInHeader";
import CheckInTrackingTable from "@/components/PartyList/CheckInTrackingTable";
import type { Metadata } from "next";
import StatisticPartyLists from "./StatisticPartyLists";

export const metadata: Metadata = {
    title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    openGraph: {
        title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    },
    keywords: [
        "Student Own School",
        "เพราะนักเรียนเป็นเจ้าของโรงเรียน",
        "ติดตามนโยบาย",
        "ความคืบหน้านโยบาย",
        "หมวดหมู่นโยบาย",
        "สถานะนโยบาย",
        "นโยบายสภานักเรียน",
        "การอัปเดตนโยบาย",
        "การตรวจสอบนโยบาย",
        "สถิตินโยบาย",
        "สภานักเรียนโปร่งใส",
        "สภาโปร่งใส",
        "สภานักเรียน",
        "นักเรียน",
        "นโยบาย",
        "งบประมาณ",
        "มติ",
        "โรงเรียนภูเขียว"
    ],
};

const CheckInTrack = async (props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParams = await props.searchParams;
    const startDate =
        typeof searchParams.startDate === "string"
            ? searchParams.startDate
            : undefined;
    const endDate =
        typeof searchParams.endDate === "string"
            ? searchParams.endDate
            : undefined;
    const search =
        typeof searchParams.search === "string"
            ? searchParams.search
            : undefined;
    const search_statistic =
        typeof searchParams.search_statistic === "string"
            ? searchParams.search_statistic
            : undefined;
    const checkIns: CheckIns = await AllCheckIns({ startDate, endDate, search });
    const statistics: CheckInStatistic[] = await CheckInStatistics({ search: search_statistic })

    return (
        <div
            className="min-h-screen
                dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
                bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50"
        >
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

                <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <TagInHeader
                            icon="Eye"
                            color="text-yellow-400"
                            title="ติดตามสภานักเรียนทุกคน"
                        />

                        <h1 className="text-3xl md:text-7xl font-bold">
                            <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                                ติดตามการเข้าทำงาน
                            </span>
                        </h1>

                        <p
                            className={`text-xl md:text-2xl dark:text-gray-300 text-gray-600`}
                        >
                            มา | ลา | ขาด
                        </p>
                    </div>
                </div>
            </section>
            <section className="relative py-10 overflow-hidden">
                <div className="relative container mx-auto px-4">
                    <CheckInTrackingTable checkIns={checkIns} />
                </div>
            </section>
            <section className="relative py-10 overflow-hidden">
                <div className="relative container mx-auto px-4">
                    <StatisticPartyLists checkInStatistics={statistics} />
                </div>
            </section>
        </div>
    );
};

export default CheckInTrack;
