export interface PartyList {
    id: number,
    firstName: string,
    middleName: string | null,
    lastName: string,
    nickName: string,
    fullName: string,
    bioId : number,
    rank: string,
    profile_image_full: string,
    profile_image_128x128: string,
    showInHomepage: boolean,
    contacts: Contact[],
    roles: Role[],
    bio: Bio,
}

export interface Role {
    role:{
        id:number,
        name:string,
    }
}

export interface Bio {
    id: number,
    shortMessage: string,
    classroom: string,
    messageToStudent: string,
    skills: Skill[],
    experiences: Experience[],
}

export interface Skill {
    id:number
    skill:{
        id:number,
        name:string,
        icon:string | null,
    }
}
export interface Experience {
    id:number
    experience:{
        id:number,
        title:string,
        description: string,
        date: string | null,
    }
}
export interface Contact {
    id: number,
    username: string,
    link: string,
    platform: Platform,
}

export interface Platform {
    id:number,
    name:string,
    icon:string,
    color:string,
}

export interface Role {
    id:number,
    partyListId:number,
    roleId:number,
}