import { Icon } from "../Icon/Icon";

export interface PartyList {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    nickName: string;
    fullName: string;
    bioId: number;
    rank: string;
    profile_image_full: string;
    profile_image_128x128: string;
    showInHomepage: boolean;
    contacts: Contact[];
    roles: Roles[];
    bio: Bio;
    order: number;
    orderInHomepage: number;
    support: number;
}

export interface Roles {
    id: number;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
}

export interface Bio {
    id: number;
    shortMessage: string;
    classroom: string;
    messageToStudent: string;
    skills: Skills[];
    experiences: Experience[];
}

export interface Skills {
    id: number;
    skill: Skill;
}
export interface Skill {
    id: number;
    name: string;
    icon: Icon;
}

export interface Experience {
    id: number;
    experience: {
        id: number;
        title: string;
    };
}
export interface Contact {
    id: number;
    username: string;
    link: string;
    platform: Platform;
}

export interface Platform {
    id: number;
    name: string;
    icon: string;
    color: string;
}

export interface Role {
    id: number;
    partyListId: number;
    roleId: number;
}
