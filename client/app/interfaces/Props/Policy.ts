import { Policies } from "../Policy/policies";
import { CategoryData } from "../Category/category";
import { Progress } from "../Policy/status";

export interface PolicyListCardProps {
  policies: Policies;
  policySrc: string;
  categoryData: CategoryData;
  categoryIconSrc: string;
  subcategoryIconSrc: string;
}

export interface PolicyTrackProps {
  categories: CategoryData[];
  policies: Policies[];
  policyProgress: Progress;
}

export interface PolicyTrackCardProps {
  policies: Policies;
}

export interface DetailPolicyProps {
  policySrc: string;
  categoryIconSrc: string;
  subcategoryIconSrc: string;
  policy: Policies;
}
