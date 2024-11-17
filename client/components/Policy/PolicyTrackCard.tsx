import Link from "next/link";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";
import ProgressStep from "./ProgressStep";

const PolicyTrackCard = ({ policy, statuses }: { policy: Policy, statuses : Status[] }) => {
  const splitText = (text: string) => {
    const words = text.split(" ");
    const limitedWords = words.slice(0, 3);
    if (words.length > 3) {
      limitedWords.push("...");
    }
    return limitedWords.join(" ");
  };


  return (
    <Link href={`/policy/detail/${policy.id}`} className="block">
      <Card className="transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-700 group">
        <CardContent className="p-6 relative min-h-[235px]">
          <div className="space-y-4">
            <Badge variant="default">
              {policy.category.title}
            </Badge>
            
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-200 line-clamp-2">
              {policy.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-200 line-clamp-2">
              {splitText(policy.description.offer)}
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
            <div className="flex-1 grid grid-cols-6 gap-1">
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
              variant="outline"
              className="rounded-full h-8 w-8 transition-transform group-hover:translate-x-1 bg-white text-black dark:bg-slate-900 dark:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PolicyTrackCard;