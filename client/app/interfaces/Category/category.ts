export interface Category {
  id:number,
  title:string,
  icon:string,
  thumbnailImage: string,
  subCategories: SubCategories[]
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
