import { AllCheckIns } from "@/app/functions/CheckIn";
import { CheckIns } from "@/app/interfaces/CheckIn/CheckIn";
import TagInHeader from "@/app/layouts/TagInHeader";
import CheckInTrackingTable from "@/components/PartyList/CheckInTrackingTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    openGraph: {
        title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    },
};

const CheckInTrack = async (props: {
    searchParams: { [key: string]: string | string[] | undefined };
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
    const checkIns: CheckIns = await AllCheckIns({ startDate, endDate, search });

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

                        <h1 className="text-5xl md:text-7xl font-bold">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
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
        </div>
    );
};

export default CheckInTrack;
