export interface Category {
  id:number,
  title:string,
  icon:string,
  thumbnailImage: string,
  subCategories: SubCategory[]
}

export interface SubCategories {
  id:number,
  subCategory: SubCategory
}

interface SubCategory {
  id:number,
  title:string,
  icon:string,
}

interface Progress {
  id:number,
  description: string,
  startedAt: string,
}
