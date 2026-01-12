'use server'

import { revalidatePath } from "next/cache";

export const GetFakbokMessages = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/fakbok", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

export const AddFakbokMessage = async (content: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/fakbok", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
    });
    revalidatePath('/fakbok')
    return response.json();
}

export const LikeFakbokMessage = async (id: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + `/fakbok/like/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });
    revalidatePath('/fakbok')
    return response.json();
}