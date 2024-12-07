import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Vote } from '@/app/interfaces/Vote/Vote';
import VoteStatistics from "./VoteStatistics";
import VoteSummary from "./VoteSummary";

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
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(vote.createdAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VoteCard;