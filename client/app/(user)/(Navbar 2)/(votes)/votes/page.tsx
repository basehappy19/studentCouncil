import { AllVotes } from "@/app/functions/Vote";
import { Vote } from "@/app/interfaces/Vote/Vote";
import VoteCard from "@/components/Vote/VoteCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `ติดตามการลงมติ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
  openGraph: {
    title: `ติดตามการลงมติ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
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


async function VotesPage() {
  const votes: Vote[] = await AllVotes();

  return (
    <div className="min-h-screen
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
        bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-yellow-400/20 to-pink-400/20 backdrop-blur-sm" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            <h1 className="text-3xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-pink-400 dark:bg-pink-500">
                ติดตามประชุม | การลงมติ
              </span>
            </h1>

            <p className={`text-xl md:text-2xl dark:text-gray-300 text-gray-600`}>
              พัฒนา | ปรับปรุง | แก้ไข
            </p>

          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8">
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {votes.map((vote) => (
              <VoteCard key={vote.id} vote={vote} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default VotesPage;
