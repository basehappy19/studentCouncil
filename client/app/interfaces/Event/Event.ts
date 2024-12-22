export interface Event {
    id: string;
    title: string;
    description?: string;
    date: Date;
    time?: string;
    location?: string;
    eventType: EventType;
}

export type ViewMode = 'day' | 'week' | 'month';

type EventType = "MEETING" | "ACTIVITY" | "IMPORTANT" | "WORK";
