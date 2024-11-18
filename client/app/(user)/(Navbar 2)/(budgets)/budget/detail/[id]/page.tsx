import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Budget } from "@/app/interfaces/Budget/Budget";
import { getBudgetInDepartment } from "@/app/functions/Budget";

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
        <Card className="mb-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: budget.department.color }}
                >
                  <span className="text-4xl font-bold text-white">
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
                <div className="text-xl font-semibold">
                  หัวหน้วฝ่าย: {' '}
                  <span className="text-blue-600 dark:text-blue-400">
                    {budget.department.leader.firstName} {budget.department.leader.middleName} {budget.department.leader.lastName}
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

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>บัญชีงบประมาณฝ่าย{budget.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>หัวข้อ</TableHead>
                    <TableHead>คำอธิบาย</TableHead>
                    <TableHead className="text-right">จำนวน</TableHead>
                    <TableHead>ประเภท</TableHead>
                    <TableHead>สร้างเมื่อ</TableHead>
                    <TableHead>อัพเดทเมื่อ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budget.transactions.length > 0 ? (
                    budget.transactions.map((transaction, index) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {transaction.title}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right">
                          {transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={transaction.type === "INCOME" ? "default" : "destructive"}
                            className="font-semibold"
                          >
                            {transaction.type === "INCOME" ? "รายรับ" : "รายจ่าย"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(transaction.createdAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          {new Date(transaction.updatedAt).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                ))
                ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
                  )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
    </div >
  );
}

export default BudgetInDepartment;