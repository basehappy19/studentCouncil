import PolicyTrackCategory from "./PolicyTrackByCategory";
import {
  PolicyFilter,
  AllPolicyProgress,
} from "@/app/functions/Policy";
import { AllPolicyCategory } from "@/app/functions/Category";

const title = `จับตานโยบายสภานักเรียนรุ่นเรา ${process.env.NEXT_PUBLIC_APP_TITLE}`;
const description = 'สภาจะโปร่งใส ถ้าเราไม่รู้ว่านโยบายที่เคยพูดไว้ถึงไหนแล้ว';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

async function getPolicyFilter(category) {
  const response = PolicyFilter(category);
  return response;
}

async function getAllPolicyProgress() {
  const response = AllPolicyProgress();
  return response;
}

async function page({ params }) {
  const { category } = params;
  const categoryId = category;
  const policies = await getPolicyFilter(category);
  const categories = await getCategories();
  const policyProgress = await getAllPolicyProgress();
  return (
    <PolicyTrackCategory
      categories={categories}
      categoryId={categoryId}
      policies={policies}
      policyProgress={policyProgress}
    />
  );
}

async function getCategories() {
  const response = await AllPolicyCategory();
  return response;
}

export default page;
