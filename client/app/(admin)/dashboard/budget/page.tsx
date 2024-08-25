"use client"
import React, { useEffect, useState } from 'react'
import { AllBudget } from '@/app/functions/Budget';
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { AddTransaction, RemoveTransaction, TransactionById, UpdateTransaction } from '@/app/functions/Transaction';
import Loading from '@/components/Other/Loading';
import BudgetTransactionForm from '@/components/DashBoard/Budget/BudgetTransactionForm';
import { useSession } from 'next-auth/react';
import TransactionTable from '@/components/Budget/TransactionTable';
import { toast } from 'react-toastify';
const Budget = () => {
    const { data: session, status } = useSession()
    const [departments, setDepartments] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [isOpenAddTransaction, setIsOpenAddTransaction] = useState<boolean>(false)
    const [currentBudget, setCurrentBudget] = useState("");
    const [dataSelect, setDataSelect] = useState<number>(0)
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const budgetId = searchParams.get('id')
    const pathname = usePathname()
    const router = useRouter()

    const getDepartments = async () => {
        try {
            const res = await AllBudget();
            setDepartments(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getTransactions = async (budgetId) => {
        try {
            const res = await TransactionById(budgetId);
            setTransaction(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const processedData = { ...formData };
            
            if (processedData.transactionId && session) {
                processedData.editByUserId = session.user.id;   
                delete processedData.userId;                              
                await UpdateTransaction(processedData.transactionId, processedData); 
                toast.success(`อัปเดต "${processedData.transactionTitle}" เรียบร้อย`);
                setIsOpenEdit(!isOpenEdit)
            } else {
                delete processedData.transactionId;
                await AddTransaction(processedData);
                toast.success(`เพิ่ม "${processedData.transactionTitle}" เรียบร้อย`);
                setIsOpenAddTransaction(!isOpenAddTransaction);
            }

            router.refresh();
        } catch (error) {
            console.error("Error processing transaction:", error);
            toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    };

    const handleRemove = async (id, transactionTitle) => {
        try {
            await RemoveTransaction(id);
            toast.success(`ลบ "${transactionTitle}" เรียบร้อย`);
            router.refresh();
            if (budgetId) getTransactions(budgetId)
        } catch (error) {
            console.error("Error processing transaction:", error);
            toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    };

    useEffect(() => {
        getDepartments()
        if (budgetId) getTransactions(budgetId)
    }, [isOpenEdit, isOpenAddTransaction, budgetId]);

    useEffect(() => {
        if (departments && budgetId) {
            const budget = departments.find(dept => dept.idQuery == budgetId);
            setCurrentBudget(budget);
        }
    }, [departments, budgetId]);

    return (
        !budgetId ? (
            <div className="grid grid-cols-1 md:grid-cols-3 flex-col md:flex-row gap-3">
                {departments && (
                    departments.map((dept) => (
                        <div onClick={() => { router.push(pathname + `?id=${dept.idQuery}`) }} style={{ backgroundColor: dept.budgetColor }} className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg  p-4 rounded-lg border shadow-md sm:p-6" key={dept.idQuery}>
                            <div
                                className={`flex items-center justify-center py-5`}
                            >
                                <div className="font-semibold leading-[1.1]">
                                    <div className={`text-custom-white text-5xl`}>
                                        {dept.budgetTitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        ) : !isOpenAddTransaction && !isOpenEdit ? (
            transaction ? (
                <div>
                    <div className="flex justify-between mb-5 items-center">
                        <h1 className='text-2xl font-semibold'>งบประมาณฝ่าย{currentBudget.budgetTitle}</h1>
                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => setIsOpenAddTransaction(!isOpenAddTransaction)}
                                type="button"
                                className="flex-1 transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap"
                            >
                                เพิ่มบันทึก
                            </button>
                            <button
                                onClick={() => { router.push(pathname) }}
                                type="button"
                                className="flex-1 transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 whitespace-nowrap"
                            >
                                ย้อนกลับ
                            </button>
                        </div>

                    </div>
                    <TransactionTable
                        transaction={transaction}
                        setIsOpenEdit={setIsOpenEdit}
                        setDataSelect={setDataSelect}
                        isOpenEdit={isOpenEdit}
                        handleRemove={handleRemove}
                    />
                </div>
            ) : (
                <Loading />
            )
        ) : isOpenEdit && dataSelect && transaction && session && transaction.length > 0 ? (
            <div className='max-w-2xl mx-auto p-4'>
                <h1 className='text-2xl font-semibold'>
                    รายการ "{transaction.find(tran => tran._id === dataSelect)?.transactionTitle}"
                </h1>
                <BudgetTransactionForm transaction={transaction.find((tran) => tran._id === dataSelect)} budgetId={budgetId} userId={session.user.id} onSubmit={handleSubmit} />
                <button
                    onClick={() => setIsOpenEdit(!isOpenEdit)}
                    type="button"
                    className="w-full mt-3 flex-1 transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 whitespace-nowrap"
                >
                    ย้อนกลับ
                </button>
            </div>
        ) : status === 'authenticated' && session.user && (
            <div className='max-w-2xl mx-auto p-4'>
                <h1 className='text-2xl font-semibold'>งบประมาณฝ่าย{currentBudget.budgetTitle}</h1>
                <BudgetTransactionForm budgetId={budgetId} userId={session.user.id} onSubmit={handleSubmit} />
                <button
                    onClick={() => setIsOpenAddTransaction(!isOpenAddTransaction)}
                    type="button"
                    className="w-full mt-3 transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
                >
                    ย้อนกลับ
                </button>
            </div>
        ))
}

export default Budget