import { Budget } from '@/app/interfaces/Budget/Budget'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'


const TransactionTable = ({ budget }: { budget: Budget }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>บัญชีงบประมาณฝ่าย{budget.title} คงเหลือ {budget.total.toString()} บาท</CardTitle>
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
                                            <div className='flex justify-center items-center'>
                                                <Badge
                                                    variant={transaction.type === 'INCOME' ? 'default' : 'destructive'}
                                                    className={`font-semibold text-center text-nowrap ${transaction.type === 'INCOME' ? 'bg-green-500' : 'bg-red-500'}`}
                                                >
                                                    {transaction.type === 'INCOME' ? 'รายรับ' : 'รายจ่าย'}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.createdAt).toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(transaction.updatedAt).toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        ไม่มีข้อมูล
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default TransactionTable
