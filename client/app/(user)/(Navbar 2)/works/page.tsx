import { AllWorks } from "@/app/functions/Work";
import { Work } from "@/app/interfaces/Work/Work";
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
};

async function TrackWorks(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
  const works: Work[] = await AllWorks({search});

  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <TagInHeader icon="Flag" color="text-yellow-400" title="โรงเรียนในแบบที่เราอยากเห็น" />

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
                ผลงานของเรา
              </span>
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-yellow-500 to-pink-500">
                ตลอดวาระการทำงาน
              </span>
            </h1>
          </div>

        </div>
      </section>
      <SectionData works={works} />
    </div>
  );
}

export default TrackWorks;
