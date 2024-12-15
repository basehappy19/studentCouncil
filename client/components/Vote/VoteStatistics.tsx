import { VoteResult } from "@/app/interfaces/Vote/Vote";

const VoteStatistics = ({ result }: { result: VoteResult }) => {
  return (
    <div className="space-y-2">
      <div className="flex h-2 rounded-full overflow-hidden">
        <div
          className="bg-green-500"
          style={{ width: `${result.percentages.agreePercentage.toString()}%` }}
        />
        <div
          className="bg-rose-500"
          style={{ width: `${result.percentages.disagreePercentage.toString()}%` }}
        />
        <div
          className="bg-yellow-500"
          style={{ width: `${result.percentages.abstainPercentage.toString()}%` }}
        />
        <div
          className="bg-gray-500"
          style={{ width: `${result.percentages.noVotePercentage.toString()}%` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            เห็นด้วย {result.total.agreeCount.toString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-rose-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            ไม่เห็นด้วย {result.total.disagreeCount.toString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            งดออกเสียง {result.total.abstainCount.toString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            ไม่ลงคะแนน {result.total.noVoteCount.toString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VoteStatistics;
