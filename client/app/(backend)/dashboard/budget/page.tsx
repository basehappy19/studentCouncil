import { getIncomeExpenseStatistics } from "@/app/functions/Budget";
import { AllDepartments } from "@/app/functions/Department";
import { Department } from "@/app/interfaces/Department/Department";
import { Metadata } from "next";
import IncomeExpenseChart from "./IncomeExpenseChart";
import AllBudgetChart from "./AllBudgetChart";
import IncomeExpenseChartBar from "./IncomeExpenseChartBar";
import { DepartmentCard } from "./DepartmentCard";

export const metadata: Metadata = {
    title: `จัดการงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "หน้าจัดการงบประมาณสำหรับการวางแผนและบริหารจัดการงบประมาณโครงการภายในสภานักเรียน ทำให้ทุกคนสามารถติดตามได้อย่างโปร่งใสและมีประสิทธิภาพ",
    openGraph: {
        title: `จัดการงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "หน้าจัดการงบประมาณสำหรับการวางแผนและบริหารจัดการงบประมาณโครงการภายในสภานักเรียน ทำให้ทุกคนสามารถติดตามได้อย่างโปร่งใสและมีประสิทธิภาพ",
    },
};


const DashBoardBudget = async (props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParams = await props.searchParams;
    const month =
        typeof searchParams.month === "string"
            ? searchParams.month
            : undefined;
    const year =
        typeof searchParams.year === "string"
            ? searchParams.year
            : undefined;
    const departments: Department[] = await AllDepartments();
    const statistics = await getIncomeExpenseStatistics({month,year});

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className='text-2xl font-semibold mb-3'>ฝ่ายงบประมาณทั้งหมด</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 flex-col md:flex-row gap-3">
                    {departments.map((department) => (
                        <DepartmentCard key={department.id} department={department} />
                    )
                    )}
                </div>
            </div>
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <AllBudgetChart departments={departments} />
                    <IncomeExpenseChart statistics={statistics} />
                </div>
                <IncomeExpenseChartBar budgets={statistics.budgets} />
            </div>
        </div>
    );
}


export default DashBoardBudget