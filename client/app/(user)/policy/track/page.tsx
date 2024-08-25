import PolicyTrack from "./PolicyTrack";
import { AllPolicy, AllPolicyProgress } from "@/app/functions/Policy";
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

async function getAllPolicy() {
  const response = AllPolicy();
  return response;
}

async function getAllPolicyProgress() {
  const response = AllPolicyProgress();
  return response;
}

async function page() {
  const [policies, categories, policyProgress] = await Promise.all([
    getAllPolicy(),
    getCategories(),
    getAllPolicyProgress(),
  ]);

  const shuffledPolicies = policies.sort(() => Math.random() - 0.5);
  
  return (
    <PolicyTrack categories={categories} policies={shuffledPolicies} policyProgress={policyProgress} />
  );
}


async function getCategories() {
  const response = await AllPolicyCategory(); 
  return response;
}  

export default page;
