'use server'

import { revalidatePath } from "next/cache";
import { baseFetcher } from "@/lib/fetcher";

export interface Fakbok {
    id: number;
    likes: number;
    color: string;
    content: string;
    publicId: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Fetch all Fakbok messages
 */
export const GetFakbokMessages = async (): Promise<Fakbok[]> => {
    return baseFetcher<Fakbok[]>("/fakbok");
}

/**
 * Add a new Fakbok message
 */
export const AddFakbokMessage = async (content: string): Promise<any> => {
    const result = await baseFetcher("/fakbok", {
        method: "POST",
        body: JSON.stringify({ content })
    });
    revalidatePath('/fakbok');
    return result;
}

/**
 * Like a Fakbok message
 */
export const LikeFakbokMessage = async (id: string): Promise<any> => {
    const result = await baseFetcher(`/fakbok/like/${id}`, {
        method: "PUT"
    });
    revalidatePath('/fakbok');
    return result;
}
