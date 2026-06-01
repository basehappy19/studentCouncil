'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Access } from "../interfaces/User/User";

/**
 * Fetch all access levels
 */
export const AllAccesses = async (): Promise<Access[]> => {
    return baseFetcher<Access[]>("/accesses");
};
