import { Pagination } from "../Pagination";

export interface Announce {
    announcements: Announcement[];
    highlight: HighlightAnnouncement;
    pagination: Pagination;
}

interface HighlightAnnouncement {
    id: number;
    content: string;
    priority: Priority;
}

export type Priority = "NORMAL" | "IMPORTANT" | "URGENT" | "VERY_URGENT";

export interface Announcement {
    id: number;
    title: string;
    content: string;
    timestamp: string;
    schedules?: Schedules[] | [];
    links?: Links[] | [];
    iframes?: Iframes[] | [];
    images: Images[] | [];
    newAnnouncement: boolean;
}

interface Schedules {
    id: number;
    schedule: Schedule;
}

interface Schedule {
    id: number;
    date: string;
    time?: string;
    activity?: string;
    location?: string;
}

interface Links {
    id: number;
    link: Link
}

interface Link {
    id: number;
    title: string;
    url: string;
}

interface Iframes {
    id: number;
    iframe: Iframe;
}

interface Iframe {
    id: number;
    title: string;
    url: string;
}

export interface Images {
    id: number;
    image: Image;
}

export interface Image {
    title: string;
    description: string;
    path: string;
}
