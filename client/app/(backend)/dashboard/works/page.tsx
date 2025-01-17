import { getOptionsForAddWork, getUserWorks } from "@/app/functions/Work";
import { Option, UserWorks } from "@/app/interfaces/Work/Work";
import { Metadata } from "next";
import React from "react";
import WorkCard from "./WorkCard";
import FilterButton from "./FilterButton";
import SearchBar from "./SearchBar";
import WorkPostModal from "./WorkPostModal";
import Pagination from "@/components/Pagination";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: `โพสต์การทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
    openGraph: {
        title: `ติดตามการทำงานของเราได้ตลอด 24/7 ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
    },
};

async function WorkPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const filter =
        typeof searchParams.filter === "string"
            ? searchParams.filter
            : undefined;
    const search =
        typeof searchParams.search === "string"
            ? searchParams.search
            : undefined;
    const page =
        typeof searchParams.page === "string"
            ? parseInt(searchParams.page)
            : undefined;
    const userWorks: UserWorks = await getUserWorks({ search, page, filter });
    const options: Option = await getOptionsForAddWork();

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-3 flex flex-col justify-center gap-y-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">โพสต์ทั้งหมด</h1>
                    <FilterButton additionalData={userWorks.additionalData} />
                </div>
                <SearchBar />
                <WorkPostModal options={options} />
            </div>

            {userWorks.data.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    ไม่พบงาน
                </div>
            ) : (
                <div>
                    <Pagination
                        totalPages={userWorks.pagination.totalPages}
                        currentPage={userWorks.pagination.currentPage}
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                        {userWorks.data.map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkPage
