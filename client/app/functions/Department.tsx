'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Department } from "../interfaces/Department/Department";

/**
 * Fetch all departments with their leaders and budgets
 */
export const AllDepartments = async (): Promise<Department[]> => {
    return baseFetcher<Department[]>("/departments");
};
