'use server'

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { baseFetcher } from "@/lib/fetcher";
import { PartyList, Platform, Skill, Message } from "../interfaces/PartyList/partylist";

/**
 * Helper to get authorization header
 */
const getAuthHeader = async () => {
    const session = await auth();
    return session?.user?.token ? { 'Authorization': session.user.token } : {};
};

/**
 * Fetch party lists for the homepage
 */
export const getPartyListInHomepages = async (): Promise<PartyList[]> => {
    return baseFetcher<PartyList[]>("/partyList_for_homepages");
};

/**
 * Support a party list
 */
export const SupportPartyList = async ({ partyListId }: { partyListId: number }): Promise<any> => {
    const result = await baseFetcher("/partyList/support", {
        method: 'PUT',
        body: JSON.stringify({ partyListId }),
    });
    revalidatePath(`/partyList/${partyListId}`);
    return result;
};

/**
 * Send a message to a party list
 */
export const SendMessageToPartyList = async ({ 
    partyListId, 
    message 
}: { 
    partyListId: number; 
    message: string; 
}): Promise<any> => {
    const result = await baseFetcher("/partyList/message", {
        method: 'POST',
        body: JSON.stringify({ partyListId, message }),
    });
    revalidatePath(`/partyList/${partyListId}`);
    return result;
};

/**
 * Fetch all party lists with optional search
 */
export const AllPartyLists = async ({ search }: { search?: string }): Promise<PartyList[]> => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    return baseFetcher<PartyList[]>(`/partyLists?${params.toString()}`);
};

/**
 * Fetch a single party list by ID
 */
export const getPartyList = async (id: number): Promise<PartyList> => {
    return baseFetcher<PartyList>(`/partyList?id=${id}`);
};

/**
 * Update the bio of the currently authenticated user's party list
 */
export const UpdateBio = async ({ 
    shortMessage, 
    messageToStudent, 
    classroom 
}: { 
    shortMessage: string; 
    messageToStudent: string; 
    classroom: string; 
}): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/bio", {
        method: 'PUT',
        headers,
        body: JSON.stringify({ shortMessage, messageToStudent, classroom }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Update an experience entry
 */
export const UpdateExperience = async ({ id, title }: { id: number; title: string }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/experience", {
        method: 'PUT',
        headers,
        body: JSON.stringify({ experienceId: id, title }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Add a new experience entry
 */
export const AddExperience = async ({ title }: { title: string }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/experience", {
        method: 'POST',
        headers,
        body: JSON.stringify({ title }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Remove an experience entry
 */
export const RemoveExperience = async ({ id }: { id: number }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/experience", {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ experienceId: id }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Fetch all platforms
 */
export const AllPlatforms = async (): Promise<Platform[]> => {
    return baseFetcher<Platform[]>("/platforms");
};

/**
 * Fetch all skills
 */
export const AllSkills = async (): Promise<Skill[]> => {
    return baseFetcher<Skill[]>("/skills");
};

/**
 * Add a contact to a party list
 */
export const AddContact = async ({ 
    username, 
    link, 
    platformId 
}: { 
    username: string; 
    link: string; 
    platformId: number; 
}): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/contact", {
        method: 'POST',
        headers,
        body: JSON.stringify({ username, link, platformId }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Update a contact
 */
export const UpdateContact = async ({ 
    id, 
    username, 
    link 
}: { 
    id: number; 
    username: string; 
    link: string; 
}): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/contact", {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id, username, link }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Remove a contact
 */
export const RemoveContact = async ({ id }: { id: number }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/contact", {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Add a skill to a party list
 */
export const AddSkillInPartyList = async ({ skillId }: { skillId: number }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/skill", {
        method: 'POST',
        headers,
        body: JSON.stringify({ skillId }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Remove a skill from a party list
 */
export const RemoveSkill = async ({ skillId }: { skillId: number }): Promise<any> => {
    const headers = await getAuthHeader();
    const result = await baseFetcher("/partyList/skill", {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ skillId }),
    });
    revalidatePath(`/dashboard/profile`);
    return result;
};

/**
 * Fetch messages for the currently authenticated user's party list
 */
export const getMessages = async (): Promise<Message[]> => {
    const headers = await getAuthHeader();
    return baseFetcher<Message[]>("/partyList/messages", { headers });
};
