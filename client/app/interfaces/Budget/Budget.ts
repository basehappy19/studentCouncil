import { Department } from "../Department/Department";
import { Transaction } from "../Transaction/Transaction";

export interface Budget {
    id: number;
    title: string;
    description: string;
    total: number;
    transactions: Transaction[]
    department: Department
}

