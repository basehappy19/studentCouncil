export interface Location {
    id: number;
    name: string;
    image: string;
    stats: Status;
    subLocations: SubLocation[];
    totalProblems: number;
}

export interface Problem {
    id: number;
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
    location: {
        location: Location;
        subLocation: SubLocation;
        room: Room;
    },
    solutions: Solution;
    reportedImages: ReportedImage[];
    createdAt: string;
}

interface Solution {
    id: number,
    title: string,
    description: string,
    resolvedImages: ReportedImage[]
}

export interface ReportedImage {
    id: number;
    title: string;
    path: string;
}

export interface Status {
    PENDING: number;
    IN_PROGRESS: number; 
    RESOLVED: number;
}

export interface SubLocation {
    id: number;
    name: string;
    image: string;
    stats: Status;
    rooms: Room[];
    totalProblems: number;
}

interface Room {
    id: number;
    name: string;
    image: string;
    stats: Status;
    totalProblems: number;
}