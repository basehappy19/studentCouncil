import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Budget } from '@/app/interfaces/Budget/Budget'
import { Button } from '../ui/button'
import { Transaction } from '@/app/interfaces/Transaction/Transaction'

interface TransactionTableProps {
    budget: Budget;
    onEdit: (transaction: Transaction) => void;
}

const TransactionTable = ({ budget, onEdit }: TransactionTableProps) => {
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
                                <TableHead>จัดการ</TableHead>
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
                                        <TableCell>
                                            <div className='flex flex-row gap-3 justify-center items-center'>
                                                <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap' onClick={() => onEdit(transaction)}>แก้ไข</Button>
                                                <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 whitespace-nowrap'>ลบ</Button>
                                            </div>
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
