'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Budget } from "../interfaces/Budget/Budget";

export interface IncomeExpenseStatistics {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    budgets: {
        budgetData: {
            title: string;
            description: string;
            department: string;
        };
        income: number;
        expense: number;
        balance: number;
    }[];
}

/**
 * Fetch all budgets
 */
export const AllBudget = async (): Promise<Budget[]> => {
    return baseFetcher<Budget[]>("/budget");
};

/**
 * Fetch budget details for a specific department
 */
export const getBudgetInDepartment = async (id: number): Promise<Budget> => {
    return baseFetcher<Budget>(`/budget/department?id=${id}`);
};

/**
 * Fetch global income and expense statistics with optional month/year filtering
 */
export const getIncomeExpenseStatistics = async ({
    month,
    year
}: {
    month?: string;
    year?: string;
}): Promise<IncomeExpenseStatistics> => {
    const params = new URLSearchParams();
    if (month) params.append("month", month);
    if (year) params.append("year", year);

    return baseFetcher<IncomeExpenseStatistics>(`/budget/statistics/income_expense?${params.toString()}`);
};

/**
 * Fetch income and expense statistics for a specific budget ID
 */
export const IncomeExpenseStatisticsById = async (id: number): Promise<any[]> => {
    return baseFetcher<any[]>(`/statistics/budget/income_expense/${id}`);
};
