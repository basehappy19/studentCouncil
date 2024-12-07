import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Vote } from '@/app/interfaces/Vote/Vote';
import VoteSummary from "@/components/Vote/VoteSummary";
import VoteStatistics from "@/components/Vote/VoteStatistics";
import { Button } from "@/components/ui/button";

const VoteCard = ({ vote }: { vote: Vote }) => {


  return (
    <Link href={`/vote/detail/${vote.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-950 dark:to-pink-950 border-blue-200 dark:border-blue-400">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-semibold text-lg text-blue-950 dark:text-blue-100">
              หัวข้อ : {vote.title}
            </h3>
            <VoteSummary summary={vote.result.summary} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            เนื้อหา : {vote.content}
          </p>
        </CardHeader>

        <VoteStatistics result={vote.result} />

        <CardFooter>
          <div className="w-full flex flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(vote.createdAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </div>
            <div className="flex gap-3">
              <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 whitespace-nowrap'>แก้ไข</Button>
              <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 whitespace-nowrap'>ลบ</Button>
            </div>

          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VoteCard;