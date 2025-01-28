import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Budget } from "@/app/interfaces/Budget/Budget";
import { getBudgetInDepartment } from "@/app/functions/Budget";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import TransactionTable from './TransactionTable';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const budget: Budget = await getBudgetInDepartment(parseInt(id));
  return {
    title: `งบประมาณ${budget.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
    openGraph: {
      title: `งบประมาณ${budget.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามงบประมาณเราได้ที่นี้",
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
}

async function BudgetInDepartment(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const budget: Budget = await getBudgetInDepartment(parseInt(id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: budget.department.color }}
                >
                  <span className="text-center text-3xl font-bold text-white">
                    {budget.title}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">
                  ฝ่าย{budget.title}
                </h1>
                <div className="text-2xl font-semibold">
                  งบประมาณทั้งหมด: {' '}
                  <span className="text-green-600 dark:text-green-400">
                    {budget.total.toLocaleString()} บาท
                  </span>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <Avatar>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH}/${budget.department.leader.profile_image_128x128}`} />
                    <AvatarFallback>{budget.department.leader.nickName}</AvatarFallback>
                  </Avatar>
                  หัวหน้าฝ่าย: {' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {budget.department.leader.fullName}
                  </span>
                </div>
                <Separator className="my-4" />
                <div>
                  <h3 className="font-semibold mb-2">หน้าที่ของฝ่าย{budget.department.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {budget.department.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <TransactionTable budget={budget} />
      </div>
    </div >
  );
}

export default BudgetInDepartment;