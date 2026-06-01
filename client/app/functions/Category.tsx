'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Category } from "../interfaces/Category/category";

/**
 * Fetch all categories with their subcategories
 */
export const AllCategories = async (): Promise<Category[]> => {
    return baseFetcher<Category[]>("/categories");
};

/**
 * Fetch a single category by ID
 */
export const getCategory = async (id?: string): Promise<Category> => {
    return baseFetcher<Category>(`/category?id=${id}`);
};
