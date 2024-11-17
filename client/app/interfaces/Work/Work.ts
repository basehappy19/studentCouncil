import { User } from "../User/User";

export interface Work {
  id:number,
  title:string,
  description:string,
  postBy: User
  date: string,
  images: WorkImages[],
  operators: WorkOperators[]
  tags: TagInWorks[],
}

export interface WorkImages {
  id:number,
  path:string,
}

interface WorkOperators {
  id:number,
  user:User
}

interface TagInWorks {
  id:number,
  tag: Tag
}

export interface Tag {
  id: number,
  title:string,
  icon?:string,
  color?: string,
}