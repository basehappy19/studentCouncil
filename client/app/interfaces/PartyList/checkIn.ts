export interface RoleData {
    id: number;
    name: string;
}

export interface CheckIn {
    attendTime: Date;
    type: number;
}

export interface Attendee {
    userId: number;
    checkIns: CheckIn[];
    userData?: {
        displayName: string;
        profilePicture: string;
        rolesData: RoleData[];
    };
}

export interface CheckInData {
    attendees: Attendee[];
    date: Date;
}

export interface ProcessedData {
    user: Attendee['userData'];
    attendance: Map<string, number>;
}

  
  