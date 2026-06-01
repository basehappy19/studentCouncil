'use server'

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { baseFetcher } from "@/lib/fetcher";
import { Work, Tag, WorkStatistics, UserWorks, Option } from "../interfaces/Work/Work";

/**
 * Helper to get authorization header
 */
const getAuthHeader = async () => {
    const session = await auth();
    return session?.user?.token ? { 'Authorization': session.user.token } : {};
};

/**
 * Fetch all works with optional search and tag filtering
 */
export const AllWorks = async ({ 
    search, 
    tag 
}: { 
    search?: string; 
    tag?: string; 
}): Promise<Work[]> => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (tag) params.append("tag", tag);

    return baseFetcher<Work[]>(`/works?${params.toString()}`);
};

/**
 * Fetch all tags that have associated works
 */
export const AllTagsWithWork = async (): Promise<Tag[]> => {
    return baseFetcher<Tag[]>("/work/tags");
};

/**
 * Fetch work statistics for the currently authenticated user
 */
export const getUserWorkStatistics = async (): Promise<WorkStatistics | null> => {
    const headers = await getAuthHeader();
    if (!headers.Authorization) return null;

    return baseFetcher<WorkStatistics>("/userWorkStatistics", { headers });
};

/**
 * Fetch a single work by ID
 */
export const getWork = async ({ id }: { id: number | null }): Promise<Work | null> => {
    if (id === null) return null;
    const params = new URLSearchParams({ id: id.toString() });
    return baseFetcher<Work | null>(`/work?${params.toString()}`);
};

/**
 * Fetch works related to the currently authenticated user
 */
export const getUserWorks = async ({
    search,
    page = 1,
    filter = ""
}: {
    search?: string;
    page?: number;
    filter?: string;
}): Promise<UserWorks | null> => {
    const headers = await getAuthHeader();
    if (!headers.Authorization) return null;

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page.toString());
    if (filter) params.append("filter", filter);

    return baseFetcher<UserWorks>(`/userWorks?${params.toString()}`, { headers });
};

/**
 * Fetch options (users, tags) for adding a new work
 */
export const getOptionsForAddWork = async (): Promise<Option | null> => {
    const headers = await getAuthHeader();
    if (!headers.Authorization) return null;

    return baseFetcher<Option>("/optionsForAddWork", { headers });
};

/**
 * Add a new work entry with images and metadata
 */
export const AddWork = async ({
    title, 
    description, 
    images, 
    operators, 
    tags
}: {
    title: string;
    description: string;
    images: File[];
    operators: number[];
    tags: number[];
}): Promise<any> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (operators) formData.append('operators', JSON.stringify(operators));
    if (tags) formData.append('tags', JSON.stringify(tags));

    if (images && images.length > 0) {
        images.forEach(image => formData.append('images', image));
    } else {
        throw new Error('At least one image is required');
    }

    const result = await baseFetcher("/work", {
        method: 'POST',
        headers: {
            'Authorization': session.user.token,
            'X-Upload-Type': 'work',
        },
        body: formData,
    });

    revalidatePath(`/dashboard/works`);
    return result;
};

/**
 * Add a comment to a work
 */
export const CommentWork = async ({ 
    workId, 
    message 
}: { 
    workId: number; 
    message: string; 
}): Promise<any> => {
    const result = await baseFetcher("/work/comment", {
        method: 'POST',
        body: JSON.stringify({ workId, message }),
    });
    revalidatePath(`/works`);
    return result;
};

/**
 * Like a comment on a work
 */
export const LikeComment = async ({ commentId }: { commentId: number }): Promise<any> => {
    const result = await baseFetcher("/work/comment", {
        method: 'PUT',
        body: JSON.stringify({ commentId }),
    });
    revalidatePath(`/works`);
    return result;
};
