import { User } from "../User/User";

export interface Transaction {
    id: number,
    title: string;
    description: string;
    amount: number;
    budgetBefore: number;
    budgetAfter: number;
    type: string | 'INCOME' | 'EXPENSE';
    byUser?: User;
    createdAt: string;
    updatedAt: string;
}