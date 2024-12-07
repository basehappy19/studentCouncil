'use server'
import { auth } from "@/auth";
import { UserData } from "../interfaces/Auth/User";

export const getUserData = async (): Promise<UserData | null> => {
    try {
        const session = await auth();
        
        if (!session) {
            return null;  
        }

        const token = session?.user?.token || '';

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/user/data`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        if (!res.ok) {
            throw new Error(`Failed To Fetch User data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return { data, token };
    } catch (e: unknown) {
        console.error(`Failed to fetch user data: ${e instanceof Error ? e.message : 'Unknown error'}`);
        return null;  
    }
};
