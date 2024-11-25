'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth-options";

export const getUserData = async () => {
    try {
        const session = await getServerSession(authOptions);
        
        if(!session){
            return null;
        }
        const token = session.token

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/user/data`, {
            next: {
                revalidate: 0,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            }
        })
        if (!res.ok) {
            return null
        }
        const data = await res.json();

        return {data, token}
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Failed to fetch user data: ${e.message}`);
            throw new Error(`Failed to fetch user data`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed to fetch user data`);
        }
    }
}