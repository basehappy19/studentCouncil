'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Transaction } from "../interfaces/Transaction/Transaction";

export const TransactionById = async (BudgetId: number): Promise<Transaction[]> => {
    return baseFetcher<Transaction[]>(`/transaction/${BudgetId}`);
};

export const AddTransaction = async ({ 
    transaction 
}: { 
    transaction: Transaction 
}): Promise<Transaction> => {
    return baseFetcher<Transaction>("/transaction", {
        method: 'POST',
        body: JSON.stringify(transaction),
    });
};

export const UpdateTransaction = async ({ 
    id, 
    transaction 
}: { 
    id: number, 
    transaction: Transaction 
}): Promise<Transaction> => {
    return baseFetcher<Transaction>(`/transaction/${id}`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
    });
};

export const RemoveTransaction = async (id: number): Promise<any> => {
    return baseFetcher<any>(`/transaction/${id}`, {
        method: 'DELETE',
    });
};