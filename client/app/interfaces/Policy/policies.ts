import { StatusData } from "./status";
import { CategoryData } from "../Category/category";
import { SubCategories } from "../Category/category";

export interface Policies {
  _id: string;
  idQuery: number;
  numberTag: string;
  title: string;
  statusId: number;
  categories: number;
  problem: string;
  image: string;
  __v: number;
  subCategories: SubCategories[];
  categoryData: CategoryData[];
  statusData: StatusData[];
}

export interface PolicyFilter {
  _id: string;
  idQuery: number;
  numberTag: string;
  title: string;
  statusId: number;
  categories: [number];
  problem: string;
  offer: string;
  budget: string;
  image: string;
  __v: number;
  subCategories: SubCategories[];
}
