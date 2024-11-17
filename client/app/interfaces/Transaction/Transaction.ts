import { User } from "../User/User";

export interface Transaction {
    id: number,
    title: string;
    description: number;
    amount: string;
    budgetBefore: string;
    type: string | 'INCOME' | 'EXPENSE';
    date: string;
    byUser: User;
    createdAt: string;
}