import { Category, SubCategories } from "../Category/category";

export interface Policy {
  id: number;
  rank: string;
  title: string;
  thumbnailImage: string;
  category: Category;
  description: Description
  subCategories: SubCategories[];
  progresses: Progresses[];
  currentProgress: Progresses;
}

interface Description {
  id:number,
  problem:string,
  offer:string,
  budget:string,
}

interface Progresses {
  id:number,
  description: string,
  startedAt: string,
  status: Status,
}

export interface Status {
  id:number,
  name:string,
  color:string,
  step:number,
}

export interface StatisticProgresses {
  policies:number,
  statistic : {
    statusId:number,
    count: number,
    status: Status,
  }[]
}