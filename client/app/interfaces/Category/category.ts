export interface SubCategories {
  idQuery: number;
  title: string;
  icon: string;
  _id: string;
}

export interface Categories {
  _id: string;
  idQuery: number;
  title: string;
  image: string;
  icon: string;
  __v: number;
  subCategories: SubCategories[];
}
export interface CategoryData {
  _id: string;
  idQuery: number;
  title: string;
  image: string;
  icon: string;
  __v: number;
  subCategories: SubCategories[];
}
