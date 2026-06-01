'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Announce, Announcement } from "../interfaces/Announcement/Announcement";

/**
 * Fetch all announcements with optional search and pagination
 */
export const AllAnnouncements = async ({ 
    search, 
    page 
}: { 
    search?: string; 
    page?: number; 
}): Promise<Announce> => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());

    return baseFetcher<Announce>(`/announcements?${params.toString()}`);
};

/**
 * Fetch a single announcement by ID
 */
export const GetAnnouncement = async ({ id }: { id: string }): Promise<Announcement> => {
    return baseFetcher<Announcement>(`/announcement/${id}`);
};
