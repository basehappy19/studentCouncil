import type { Metadata } from 'next';
import PartyListCard from "@/components/PartyList/PartyListCard";
import { PartyList } from "@/app/interfaces/PartyList/partylist";
import { ArrowRight } from "lucide-react";
import { getPartyListInHomepages } from '@/app/functions/PartyList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  openGraph: {
    title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  },
};

async function Home() {
  const partyLists: PartyList[] = await getPartyListInHomepages();

  return (
    <div className="min-h-screen pb-5 bg-[#f4f4fc] dark:bg-slate-900">
      <div className="relative overflow-hidden bg-white/30 dark:bg-slate-800/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-blue-500 dark:text-blue-400"><span className='line-through'>สมาชิก</span><span>ผู้แทน</span></span>
              <span className="text-yellow-500 dark:text-amber-300"> นักเรียนของเรา</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-yellow-500 dark:text-amber-300">คัดสรร</span>
              <span className="text-yellow-500 dark:text-amber-300">ความสามารถเฉพาะทาง</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              ร่วมติดตามการทำงานของสภานักเรียน
            </p>
            <div className="flex items-center space-x-4">
              <Link href={`/partyLists`} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>ดูรายชื่อผู้สมัครทั้งหมด</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200 dark:bg-amber-400/20 rounded-full blur-3xl opacity-20 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-gray-100">ผู้แทนนักเรียน</h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partyLists.map((partyList) => (
            <div
              key={partyList.id}
              className={`transform hover:-translate-y-1 transition-transform duration-300 ${partyList.order === 1 ? 'order-first md:-order-none' : ''
                }`}
            >
              <PartyListCard partyList={partyList} />
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}

export default Home;