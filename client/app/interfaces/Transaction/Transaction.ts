export interface TransactionData {
    id: number,
    budgetTitle?: string;
    budgetId: number;
    transactionTitle: string;
    transactionDescription: string;
    transactionAmount: number;
    transactionType: number;
    createdAt: string;
}