import Link from "next/link";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, XCircle } from "lucide-react";
import ProgressStep from "./ProgressStep";
import PolicyProgressModal from "./PolicyProgressModal";

const PolicyTrackCard = ({ policy, statuses }: { policy: Policy, statuses: Status[] }) => {
  const splitText = (text: string) => {
    const words = text.split(" ");
    const limitedWords = words.slice(0, 3);
    if (words.length > 3) {
      limitedWords.push("...");
    }
    return limitedWords.join(" ");
  };

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md 
          ${policy.isApproved
          ? 'bg-white dark:bg-gray-700 group'
          : 'bg-red-50 dark:bg-red-950 opacity-80 border-2 border-red-200 dark:border-red-800'}`}
    >
      <Link href={`/policy/detail/${policy.id}`} className="block">
        <CardContent className="p-6 relative min-h-[235px]">
          {!policy.isApproved && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 text-red-600 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              <span className="font-medium text-sm">โรงเรียนไม่อนุมัติ</span>
            </div>
          )}

          <div className="space-y-4">
            <Badge
              className={`${policy.isApproved ? "bg-pink-500" : "bg-none"}`}
              variant={policy.isApproved ? "default" : "destructive"}
            >
              {policy.category.title}
            </Badge>

            <h3 className={`text-xl font-semibold 
              ${policy.isApproved
                ? 'text-gray-600 dark:text-gray-200'
                : 'text-red-800 dark:text-red-300'} 
              line-clamp-2`}
            >
              {policy.title}
            </h3>

            <p className={`
              ${policy.isApproved
                ? 'text-gray-600 dark:text-gray-200'
                : 'text-red-700 dark:text-red-200'}
              line-clamp-2`}
            >
              {splitText(policy.description.offer)}
            </p>
          </div>

          {policy.isApproved && (
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
              <div className="flex-1 grid grid-cols-6 gap-1 opacity-60">
                {statuses.map((step) => (
                  <ProgressStep
                    policy={policy}
                    key={step.step}
                    step={step.step}
                    name={step.name}
                  />
                ))}
              </div>

              <Button
                size="icon"
                variant={policy.isApproved ? "outline" : "destructive"}
                className={`
                rounded-full h-8 w-8 transition-transform 
                ${policy.isApproved
                    ? 'group-hover:translate-x-1 bg-white text-black dark:bg-slate-900 dark:text-white'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}
              `}
              >
                {policy.isApproved ? <ArrowRight className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Link>
      {policy.isApproved && (
        <CardFooter>
          <PolicyProgressModal policy={policy} statuses={statuses} />
        </CardFooter>
      )}
    </Card>
  );
};

export default PolicyTrackCard;