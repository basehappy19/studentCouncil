import type { Metadata } from 'next';
import PartyListCard from "@/components/PartyList/PartyListCard";
import { PartyList } from "@/app/interfaces/PartyList/partylist";
import { ArrowRight, Calendar } from "lucide-react";
import { getPartyListInHomepages } from '@/app/functions/PartyList';
import Link from 'next/link';
import { Menu } from '@/app/layouts/Menu';
import Image from 'next/image';
import ThankPage from './ThankPage';

export const metadata: Metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  openGraph: {
    title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
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

async function Home() {
  const partyLists: PartyList[] = await getPartyListInHomepages();

  return (
    <div className="min-h-screen pb-5 bg-[#f4f4fc] dark:bg-slate-900">
      <div className="relative min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute w-full h-full overflow-hidden">
          {/* <video
            className="absolute min-w-full min-h-full object-bottom object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/logo_vd.mp4"
          >
            <source src="/logo_vd.mp4" type="video/mp4" />
          </video> */}
          <Image src={`/home_img.jpg`} fill alt={`Home`} className='absolute min-w-full min-h-full object-center object-cover' />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main Content */}
            <ThankPage />

            {/* Quick Access Menu */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">เมนูด่วน</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Menu.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 mb-2 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-all duration-300">
                      <Image className="object-fit" width={24} height={24} src={`/${item.icon}`} alt={`${item.title}`} />
                    </div>
                    <span className="text-center text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
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