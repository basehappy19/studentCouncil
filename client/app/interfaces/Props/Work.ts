import { UserData } from "../User/User"
import { WorkTagData, WorkData } from "../Work/Work";

export interface PostWorkProps {
    listUser: UserData;
    workTag: WorkTagData;
}

export interface WorkCardProps {
    work: WorkData;
    workImgSrc: string;
    workIconSrc: string; 
    profileImgSrc: string;
}