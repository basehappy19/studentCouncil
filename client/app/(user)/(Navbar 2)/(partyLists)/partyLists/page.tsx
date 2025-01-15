import { AllPartyLists as getPartyLists } from "@/app/functions/PartyList";
import { PartyList } from "@/app/interfaces/PartyList/partylist";
import PartyListCard from "@/components/PartyList/PartyListCard";
import type { Metadata } from "next";
import SearchBar from "./SearchBar";
import PartyListLength from "./PartyListLength";

export const metadata: Metadata = {
  title: `ทำความรู้จักสภานักเรียน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: "แต่ละคนมักมีความสามารถ SoftSkill HardSkill ที่แตกต่างกัน เราจึงได้คัดสรรการทำงานในความถนัดออกมาแบบในพรรคของเรา",
  openGraph: {
    title: `ทำความรู้จักสภานักเรียน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "แต่ละคนมักมีความสามารถ SoftSkill HardSkill ที่แตกต่างกัน เราจึงได้คัดสรรการทำงานในความถนัดออกมาแบบในพรรคของเรา",
  },
  keywords: ["สภานักเรียนโปร่งใส","สภาโปร่งใส","สภานักเรียน", "นักเรียน", "นโยบาย", "งบประมาณ", "มติ", "โรงเรียนภูเขียว"],

};

const AllPartyLists = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const searchParams = await props.searchParams
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const partyLists: PartyList[] = await getPartyLists({ search });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500 py-4">
              รายชื่อผู้สมัครสภานักเรียน
            </h1>

            <PartyListLength count={partyLists.length} />
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="container mx-auto px-4 py-12">
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partyLists.map((partyList, index) => (
            <div
              key={index}
              className="transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-full bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
                <PartyListCard partyList={partyList} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/2 right-0 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default AllPartyLists;