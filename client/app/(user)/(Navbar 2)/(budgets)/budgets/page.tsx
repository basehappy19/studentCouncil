import { AllDepartments } from "@/app/functions/Department";
import { Department } from "@/app/interfaces/Department/Department";
import TagInHeader from "@/app/layouts/TagInHeader";
import DepartmentCard from "@/components/Department/DepartmentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
  openGraph: {
    title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
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


async function BudgetInDepartment() {
  const departments: Department[] = await AllDepartments();

  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <TagInHeader icon="HandCoins" color="text-yellow-400" title="บัญชีงบประมาณ" />
            <h1 className="text-3xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                ติดตามงบประมาณ
              </span>
            </h1>

            <p className={`text-xl md:text-2xl dark:text-gray-300 text-gray-600`}>
              ตรวจสอบ | เปิดเผย | โปร่งใส
            </p>
          </div>
        </div>

      </section>
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default BudgetInDepartment;
