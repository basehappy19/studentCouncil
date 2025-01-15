export interface Location {
    id: number;
    name: string;
    image: string;
    stats: Status;
    subLocations: SubLocation[];
    totalProblems: number;
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