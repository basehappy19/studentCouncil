import { AllDepartments } from "@/app/functions/Department";
import { Department } from "@/app/interfaces/Department/Department";
import TagInHeader from "@/app/layouts/TagInHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Coins } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata : Metadata = {
  title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
  openGraph: {
    title: `ติดตามงบประมาณ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
  },
};


async function BudgetInDepartment() {
  const departments : Department[] = await AllDepartments();
  console.log(departments);
  
  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />
      <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <TagInHeader icon="HandCoins" color="text-yellow-400" title="ฝ่ายทั้งหมด" />
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
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
            <Link 
              href={`/budget/department/${department.id}`} 
              key={department.id} 
              className="block"
            >
              <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-6" style={{ backgroundColor: department.color }}>
                  <div className="flex items-center justify-between">
                    <Coins className="w-8 h-8 text-white" />
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r"
                    style={{ 
                      backgroundImage: `linear-gradient(to right, ${department.color}, ${department.color}dd)`
                    }}
                  >
                    {department.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    คลิกเพื่อดูรายละเอียดงบประมาณ
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BudgetInDepartment;
