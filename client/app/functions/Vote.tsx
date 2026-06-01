'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Vote } from "../interfaces/Vote/Vote";

/**
 * Fetch all votes
 */
export const AllVotes = async (): Promise<Vote[]> => {
    return baseFetcher<Vote[]>("/votes");
};

/**
 * Add a new vote entry
 */
export const AddVote = async (formData: FormData): Promise<any> => {
    return baseFetcher("/vote/", {
        method: 'POST',
        body: formData, // FormData handles its own Content-Type
    });
};

/**
 * Fetch a single vote by ID with optional search filter for results
 */
export const getVote = async ({
    id,
    search,
}: {
    id: number;
    search?: string;
}): Promise<Vote> => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);

    return baseFetcher<Vote>(`/vote/${id}${params.toString() ? `?${params.toString()}` : ''}`);
};

/**
 * Remove a vote by ID
 */
export const RemoveVote = async (id: number): Promise<any> => {
    return baseFetcher(`/vote/${id}`, { 
        method: 'DELETE' 
    });
};
