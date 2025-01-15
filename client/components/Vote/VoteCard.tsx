import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Eye } from "lucide-react";
import { Vote } from '@/app/interfaces/Vote/Vote';
import VoteStatistics from "./VoteStatistics";
import VoteSummary from "./VoteSummary";

const VoteCard = ({ vote }: { vote: Vote }) => {
  return (
    <Link href={`/vote/detail/${vote.id}`} className="block">
      <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-white dark:bg-slate-800 border-none">
        <CardHeader className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200">
                  หัวข้อ : {vote.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                เนื้อหา : {vote.content}
              </p>
            </div>
            <div className="shrink-0">
              <VoteSummary summary={vote.result.summary} />
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <VoteStatistics result={vote.result} />
          </div>
        </CardHeader>

        <CardFooter className="bg-slate-50 dark:bg-slate-700/50 p-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="h-4 w-4 mr-2 text-amber-500" />
            <span>
              {new Date(vote.createdAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Eye className="h-4 w-4 mr-2 text-green-500" />
            <span>รายละเอียดเพิ่มเติม</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VoteCard;