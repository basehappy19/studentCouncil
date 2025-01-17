import { Category } from "@/app/interfaces/Category/category";
import { Policy, StatisticProgresses as InterfaceStatisticProgresses, Status } from "@/app/interfaces/Policy/Policy";
import { AllCategories } from "@/app/functions/Category";
import { AllPolicyProgresses, AllStatuses, StatisticProgresses } from "@/app/functions/Policy";
import Section from "./section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `ติดตามนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สำรวจและติดตามความคืบหน้าของนโยบายต่าง ๆ ผ่านหมวดหมู่ สถานะ และขั้นตอนที่แตกต่างกัน อัปเดตข้อมูลนโยบายแบบเรียลไทม์",
  openGraph: {
    title: `ติดตามนโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "สำรวจและติดตามความคืบหน้าของนโยบายต่าง ๆ ผ่านหมวดหมู่ สถานะ และขั้นตอนที่แตกต่างกัน อัปเดตข้อมูลนโยบายแบบเรียลไทม์",
  },
  keywords: [
    "Student Own School",
    "เพราะนักเรียนเป็นเจ้าของโรงเรียน",
    "ติดตามนโยบาย",
    "ความคืบหน้านโยบาย",
    "หมวดหมู่นโยบาย",
    "สถานะนโยบาย",
    "นโยบายสภานักเรียน",
    "การอัปเดตนโยบาย",
    "การตรวจสอบนโยบาย",
    "สถิตินโยบาย",
    "สภานักเรียนโปร่งใส",
    "สภาโปร่งใส",
    "สภานักเรียน",
    "นักเรียน",
    "นโยบาย",
    "งบประมาณ",
    "มติ",
    "โรงเรียนภูเขียว"
  ],
};


async function PolicyTrack(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = params.slug
  const categories: Category[] = await AllCategories();
  const policies: Policy[] = await AllPolicyProgresses(
    slug ? (slug.length >= 1 ? slug[0] : undefined) : undefined
  );
  const policyProgressesStatus: InterfaceStatisticProgresses = await StatisticProgresses();
  const statuses: Status[] = await AllStatuses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Section policyProgressesStatus={policyProgressesStatus} params={params} categories={categories} policies={policies} statuses={statuses} />
    </div>
  );
}

export default PolicyTrack;