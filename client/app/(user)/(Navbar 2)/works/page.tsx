import { AllTagsWithWork, AllWorks } from "@/app/functions/Work";
import { Tag, Work } from "@/app/interfaces/Work/Work";
import TagInHeader from "@/app/layouts/TagInHeader";
import { Metadata } from "next";
import SectionData from "./SectionData";

export const metadata: Metadata = {
  title: `ติดตามการทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  openGraph: {
    title: `ติดตามการทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  },
  keywords: ["สภานักเรียนโปร่งใส","สภาโปร่งใส","สภานักเรียน", "นักเรียน", "นโยบาย", "งบประมาณ", "มติ", "โรงเรียนภูเขียว"],
};

async function TrackWorks(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;    
  const works: Work[] = await AllWorks({search, tag});
  const tags: Tag[] = await AllTagsWithWork();
  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <TagInHeader icon="Flag" color="text-yellow-400" title="โรงเรียนในแบบที่เราอยากเห็น" />

            <h1 className="text-3xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                ผลงานของเรา
              </span>
            </h1>
            <h1 className="text-3xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                ตลอดวาระการทำงาน
              </span>
            </h1>
          </div>

        </div>
      </section>
      <SectionData works={works} tags={tags} searchTag={tag} />
    </div>
  );
}

export default TrackWorks;
