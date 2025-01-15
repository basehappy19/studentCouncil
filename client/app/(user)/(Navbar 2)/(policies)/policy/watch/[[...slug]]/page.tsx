import { Category } from "@/app/interfaces/Category/category";
import { Policy, StatisticProgresses as InterfaceStatisticProgresses, Status } from "@/app/interfaces/Policy/Policy";
import { AllCategories } from "@/app/functions/Category";
import { AllPolicyProgresses, AllStatuses, StatisticProgresses } from "@/app/functions/Policy";
import Section from "./section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `ติดตามนโยบาย - ตรวจสอบความคืบหน้านโยบาย ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "สำรวจและติดตามความคืบหน้าของนโยบายต่าง ๆ ผ่านหมวดหมู่ สถานะ และขั้นตอนที่แตกต่างกัน อัปเดตข้อมูลนโยบายแบบเรียลไทม์",
  keywords: [
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
  openGraph: {
    title: "ติดตามนโยบาย - ตรวจสอบความคืบหน้านโยบาย",
    description: "ติดตามความคืบหน้านโยบาย พร้อมสถิติและข้อมูลเชิงลึกในแต่ละหมวดหมู่และสถานะต่าง ๆ แบบเรียลไทม์",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/policy/watch`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_METADATA}/path/platform/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "หน้าแดชบอร์ดติดตามนโยบาย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ติดตามนโยบาย - ตรวจสอบความคืบหน้านโยบาย",
    description: "ติดตามการพัฒนานโยบายและสถานะการอัปเดตแบบเรียลไทม์",
    images: `${process.env.NEXT_PUBLIC_APP_METADATA}/path/platform/twitter-image.jpg`,
  },
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