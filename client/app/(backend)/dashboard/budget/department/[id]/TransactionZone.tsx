'use client'
import React, { useState } from 'react'
import TransactionTable from '@/components/Transaction/TransactionTable'
import { AddTransaction, EditTransaction } from './ActionButton'
import { Budget } from '@/app/interfaces/Budget/Budget'
import { Transaction } from '@/app/interfaces/Transaction/Transaction'

const TransactionZone = ({ budget }: { budget: Budget }) => {
    const [open, setOpen] = useState(false)
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)

    const onEdit = (transaction: Transaction) => {
        setEditTransaction(transaction)
        setOpen(true)
    }

    return (
        <div>
            <div className="flex justify-end mb-5 items-center">
                <AddTransaction />
            </div>

            <TransactionTable
                budget={budget}
                onEdit={onEdit}
            />

            <EditTransaction
                open={open}
                setOpen={setOpen}
                editTransaction={editTransaction}
                setEditTransaction={setEditTransaction}
            />
        </div>
    )
}

export default TransactionZone
