'use server'

import { baseFetcher } from "@/lib/fetcher";
import { Event } from "../interfaces/Event/Event";

/**
 * Fetch all events for the calendar
 */
export const AllEvents = async (): Promise<Event[]> => {
    return baseFetcher<Event[]>("/events");
};
