'use server'

import { revalidatePath } from "next/cache";
import { baseFetcher } from "@/lib/fetcher";
import { Policy, Status, StatisticProgresses as IStatisticProgresses } from "../interfaces/Policy/Policy";

/**
 * Fetch recommended policies
 */
export const RecommendPolicies = async (): Promise<Policy[]> => {
    return baseFetcher<Policy[]>("/policies_recommend");
};

/**
 * Fetch all policies with optional filtering
 */
export const AllPolicies = async ({ 
    category, 
    subCategory 
}: { 
    category?: string; 
    subCategory?: string; 
}): Promise<Policy[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (subCategory) params.append('subCategory', subCategory);

    return baseFetcher<Policy[]>(`/policies?${params.toString()}`);
};

/**
 * Add a comment to a policy
 */
export const CommentPolicy = async ({ 
    policyId, 
    message 
}: { 
    policyId: number; 
    message: string; 
}): Promise<any> => {
    const result = await baseFetcher("/policy/comment", {
        method: 'POST',
        body: JSON.stringify({ policyId, message }),
    });
    revalidatePath(`/policy/detail/${policyId}`);
    return result;
};

/**
 * Like a policy
 */
export const LikePolicy = async ({ policyId }: { policyId: number }): Promise<any> => {
    const result = await baseFetcher("/policy/like", {
        method: 'PUT',
        body: JSON.stringify({ policyId }),
    });
    revalidatePath(`/policy/detail/${policyId}`);
    return result;
};

/**
 * Fetch policy progresses with optional category filtering
 */
export const AllPolicyProgresses = async (category?: string): Promise<Policy[]> => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);

    return baseFetcher<Policy[]>(`/policy_track?${params.toString()}`);
};

/**
 * Fetch all policy statuses
 */
export const AllStatuses = async (): Promise<Status[]> => {
    return baseFetcher<Status[]>("/policy_statuses");
};

/**
 * Fetch policy track statistics
 */
export const StatisticProgresses = async (): Promise<IStatisticProgresses> => {
    return baseFetcher<IStatisticProgresses>("/policy_track_statistic");
};

/**
 * Fetch a single policy by ID
 */
export const getPolicy = async (id: string): Promise<Policy> => {
    return baseFetcher<Policy>(`/policy?id=${id}`);
};
