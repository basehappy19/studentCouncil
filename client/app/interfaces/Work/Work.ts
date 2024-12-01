import { Pagination } from "../Pagination";
import { User } from "../User/User";

export interface UserWorks {
    data: Work[];
    pagination: Pagination;
    additionalData: AdditionalWork
}

export interface Option {
    users: Pick<User, 'id' | 'fullName' | 'partyList'>[];
    tags: Tag[];
}

export interface AdditionalWork {
    totalOwned: number,
    totalParticipated: number,
    totalWorks: number,
}

export interface Work {
    id: number;
    title: string;
    description: string;
    postBy: User;
    date: string;
    images: WorkImages[];
    operators: WorkOperators[];
    tags: TagInWorks[];
    updatedAt: string;
}

export interface WorkStatistics {
    workPostsCount: number;
    workParticipatedCount: number;
    workPosts: Work[];
    workParticipated: Work[];
    totalWorks: number;
}

export interface WorkImages {
    id: number;
    path: string;
}

export interface WorkOperators {
    id: number;
    user: User;
}

interface TagInWorks {
    id: number;
    tag: Tag;
}

export interface Tag {
    id: number;
    title: string;
    icon?: string;
    color?: string;
}
