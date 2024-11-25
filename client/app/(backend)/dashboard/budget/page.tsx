"use client"
import React, { useEffect, useState } from 'react'
import { AllBudget } from '../../../functions/Budget';
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { AddTransaction, RemoveTransaction, TransactionById, UpdateTransaction } from '../../../functions/Transaction';
import Loading from '../../../../components/Other/Loading';
import BudgetTransactionForm from '../../../../components/DashBoard2/Budget/BudgetTransactionForm';
import TransactionTable from '../../../../components/Budget/TransactionTable';
import AllBudgetChart from '../../../../components/Budget/AllBudgetChart';
import IncomeExpenseChart from '../../../../components/Budget/IncomeExpenseChart';
import IncomeExpenseChartBar from '../../../../components/Budget/IncomeExpenseChartBar';
import { ToastType } from '../../../types/Other/toast';
import { useUser } from '../../../context/User';
import { CurrentBudget, Departments } from '../../../interfaces/Budget/Budget';
import { TransactionData } from '../../../interfaces/Transaction/Transaction';
import { UserData } from '../../../interfaces/User/User';

const Budget = () => {
    const [departments, setDepartments] = useState<Departments[]>([]);
    const [transaction, setTransaction] = useState<TransactionData[]>([]);
    const [isOpenAddTransaction, setIsOpenAddTransaction] = useState<boolean>(false)
    const [currentBudget, setCurrentBudget] = useState<CurrentBudget>();
    const [dataSelect, setDataSelect] = useState<number>(0)
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
    const user: UserData | null = useUser();

    const searchParams = useSearchParams()
    const budgetId = Number(searchParams.get('id'))
    const pathname = usePathname()
    const router = useRouter()

    const getDepartments = async () => {
        try {
            const res = await AllBudget();

            setDepartments(res);
        } catch (e) {
            console.error(e);
        }
    };

    const getTransactions = async (budgetId: number) => {
        try {
            const res = await TransactionById(budgetId);
            setTransaction(res);
        } catch (e) {
            console.error(e);
        }
    };
    const handleSubmit = async (values : any) => {
        try {
            const data = {
                transactionId: values.transactionId,
                transactionTitle: values.transactionTitle,
                transactionDescription: values.transactionDescription,
                transactionAmount: values.transactionAmount,
                transactionType: values.transactionType,
                userId: values.userId,
                budgetId: values.budgetId,
            };
            if (data.transactionId) {
                if (user) {
                    data.editByUserId = user.id;
                }
                delete data.userId;
                await UpdateTransaction(data.transactionId, data).then((res) => {
                    const { message, type } = res;
                    if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                        toast[type as ToastType](message);
                        if (type === 'success') {
                            router.refresh();
                            getTransactions(budgetId)
                        }
                        router.refresh();
                    } else {
                        toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    }
                });
                setIsOpenEdit(!isOpenEdit)
            } else {
                delete data.transactionId;
                await AddTransaction(data).then((res) => {
                    const { message, type } = res;
                    if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                        toast[type as ToastType](message);
                        if (type === 'success') {
                            router.refresh();
                            getTransactions(budgetId)
                        }
                        router.refresh();
                    } else {
                        toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    }
                });
                setIsOpenAddTransaction(!isOpenAddTransaction);
            }

            router.refresh();
        } catch (e) {
            console.error("Error processing transaction:", e);
            toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
    };

    const handleRemove = async (id: number) => {
        await RemoveTransaction(id).then((res) => {
            try {
                const { message, type } = res;
                if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                    toast[type as ToastType](message);
                    if (type === 'success') {
                        router.refresh();
                        getTransactions(budgetId)
                    }
                    router.refresh();
                } else {
                    toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                }
            } catch (error) {
                console.error("Error processing transaction:", error);
                toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
            }
        });
    };

    useEffect(() => {
        getDepartments()
        if (budgetId) getTransactions(budgetId)
    }, [isOpenEdit, isOpenAddTransaction, budgetId]);

    useEffect(() => {
        if (departments && budgetId) {
            const budget = departments.find(dept => dept.id === budgetId);
            setCurrentBudget(budget);
        }
    }, [departments, budgetId]);

    return (
        !budgetId ? (
            <div>
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row gap-x-3">
                        <AllBudgetChart departments={departments} />
                        <IncomeExpenseChart />
                    </div>
                    <IncomeExpenseChartBar />
                </div>
                <h1 className='text-2xl font-semibold mb-3'>ฝ่ายงบประมาณทั้งหมด</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 flex-col md:flex-row gap-3">
                    {departments && (
                        departments.map((dept) => (
                            <div onClick={() => { router.push(pathname + `?id=${dept.id}`) }} style={{ backgroundColor: dept.budgetColor }} className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg p-4 rounded-lg border shadow-md sm:p-6" key={dept.id}>
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
            </div>
        ) : !isOpenAddTransaction && !isOpenEdit ? (
            transaction ? (
                <div>
                    <div className="flex justify-between mb-5 items-center">
                        <h1 className='text-2xl font-semibold'>งบประมาณฝ่าย{currentBudget?.budgetTitle}</h1>
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
                        budget={currentBudget}
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
        ) : isOpenEdit && dataSelect && transaction && user && transaction.length > 0 ? (
            <div className='max-w-2xl mx-auto p-4'>
                <h1 className='text-2xl font-semibold'>
                    รายการ "{transaction.find(tran => tran.id === dataSelect)?.transactionTitle}"
                </h1>
                <BudgetTransactionForm transaction={transaction.find((tran) => tran.id === dataSelect)} budgetId={budgetId} userId={user.id} onSubmit={handleSubmit} />
                <button
                    onClick={() => setIsOpenEdit(!isOpenEdit)}
                    type="button"
                    className="w-full mt-3 flex-1 transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 whitespace-nowrap"
                >
                    ย้อนกลับ
                </button>
            </div>
        ) : (
            <div className='max-w-2xl mx-auto p-4'>
                <h1 className='text-2xl font-semibold'>งบประมาณฝ่าย{currentBudget ? currentBudget.budgetTitle : ''}</h1>
                {user && (
                    <BudgetTransactionForm
                        budgetId={budgetId}
                        userId={user.id}
                        onSubmit={handleSubmit}
                    />
                )}
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