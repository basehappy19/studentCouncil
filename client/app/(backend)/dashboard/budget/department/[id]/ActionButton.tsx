'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Transaction } from '@/app/interfaces/Transaction/Transaction'
import Link from 'next/link'

export const AddTransaction = () => {
    const [open, setOpen] = useState(false)
    const [transaction, setTransaction] = useState<Transaction>({
        id: 0,
        title: '',
        description: '',
        amount: 0,
        type: '',
        budgetBefore: 0,
        budgetAfter: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    })
    const onSubmit = (transaction: Transaction) => {
        console.log(transaction);

        setOpen(false)
    }
    const handleSubmit = () => {
        if (!transaction.title || transaction.amount <= 0 || !transaction.type) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง")
            return
        }

        onSubmit(transaction);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex gap-3">
                    <Button
                        className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap"
                    >
                        เพิ่มบันทึก
                    </Button>
                    <Link className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap" href={`/dashboard/budget`}>
                        ย้อนกลับ
                    </Link>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>เพิ่มรายการ</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            ชื่อรายการ
                        </Label>
                        <Input
                            id="title"
                            value={transaction.title}
                            onChange={(e) => setTransaction(prev => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            คำอธิบาย
                        </Label>
                        <Input
                            id="description"
                            value={transaction.description}
                            onChange={(e) => setTransaction(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            จำนวนเงิน
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={transaction.amount}
                            onChange={(e) => setTransaction(prev => ({
                                ...prev,
                                amount: parseFloat(e.target.value)
                            }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            ประเภท
                        </Label>
                        <Select
                            value={transaction.type}
                            onValueChange={(value: 'income' | 'expense') =>
                                setTransaction(prev => ({
                                    ...prev,
                                    type: value
                                }))
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="เลือกประเภท" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">รายรับ</SelectItem>
                                <SelectItem value="expense">รายจ่าย</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        variant="outline"
                        className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap"
                        onClick={() => setOpen(false)}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap"
                        onClick={handleSubmit}
                    >
                        บันทึก
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

interface EditTransactionProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    editTransaction: Transaction | null
    setEditTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>
}

export const EditTransaction: React.FC<EditTransactionProps> = ({ open, setOpen, editTransaction, setEditTransaction }) => {
    const onSubmit = (transaction: Transaction) => {
        console.log(transaction);

        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>แก้ไขรายการ</DialogTitle>
                </DialogHeader>
                {editTransaction && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">ชื่อรายการ</Label>
                            <Input
                                id="title"
                                value={editTransaction.title}
                                onChange={(e) => setEditTransaction(prev => prev ? { ...prev, title: e.target.value } : prev)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">คำอธิบาย</Label>
                            <Input
                                id="description"
                                value={editTransaction.description}
                                onChange={(e) => setEditTransaction(prev => prev ? { ...prev, description: e.target.value } : prev)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">จำนวนเงิน</Label>
                            <Input
                                id="amount"
                                type="number"
                                value={editTransaction.amount}
                                onChange={(e) => setEditTransaction(prev => prev ? { ...prev, amount: parseFloat(e.target.value) } : prev)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">ประเภท</Label>
                            <Select
                                value={editTransaction.type}
                                onValueChange={(value) => setEditTransaction(prev => prev ? { ...prev, type: value } : prev)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="เลือกประเภท" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INCOME">รายรับ</SelectItem>
                                    <SelectItem value="EXPENSE">รายจ่าย</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
                <div className="flex justify-end space-x-2">
                    <Button className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 whitespace-nowrap" variant="outline" onClick={() => setOpen(false)}>ยกเลิก</Button>
                    <Button className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 whitespace-nowrap"
                        onClick={() => editTransaction && onSubmit(editTransaction)}>บันทึก</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}