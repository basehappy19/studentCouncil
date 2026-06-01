'use server'

import { baseFetcher } from "@/lib/fetcher";
import { User } from "../interfaces/User/User";

export const AllUsers = async (): Promise<User[]> => {
    return baseFetcher<User[]>("/users");
};

export const getUser = async (id: number): Promise<User> => {
    return baseFetcher<User>("/user", {
        method: 'POST',
        body: JSON.stringify(id)
    });
};

export const AddUser = async ({ 
    user 
}: { 
    user: User 
}): Promise<User> => {
    return baseFetcher<User>("/register", {
        method: 'POST',
        body: JSON.stringify(user),
    });
};

export const UpdateUser = async ({ 
    id, 
    user 
}: { 
    id: string, 
    user: User 
}): Promise<User> => {
    return baseFetcher<User>(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
    });
};

export const UpdateProfile = async ({ 
    id, 
    data 
}: { 
    id: string, 
    data: User 
}): Promise<User> => {
    return baseFetcher<User>(`/upload/profile/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const RemoveUser = async (id: string): Promise<any> => {
    return baseFetcher<any>(`/user/${id}`, {
        method: 'DELETE',
    });
};