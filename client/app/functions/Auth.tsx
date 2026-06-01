'use server'

import { auth } from "@/auth";
import { UserData } from "../interfaces/Auth/User";
import { baseFetcher } from "@/lib/fetcher";

/**
 * Get the currently authenticated user's data and token
 */
export const getUserData = async (): Promise<UserData | null> => {
    try {
        const session = await auth();
        
        if (!session?.user?.token) {
            return null;  
        }

        const data = await baseFetcher<UserData['data']>(`/user/data`, {
            headers: {
                'Authorization': session.user.token
            }
        });

        return { 
            data, 
            token: session.user.token 
        };
    } catch (error) {
        console.error("[getUserData Error]:", error instanceof Error ? error.message : error);
        return null;  
    }
};
