import { VoteSummary as TypeSummary } from "@/app/interfaces/Vote/Vote"
import { Badge } from "../ui/badge"
import { Ban, Loader, ThumbsDown, ThumbsUp } from "lucide-react";

const VoteSummary = ({ summary }: { summary: TypeSummary }) => {
  const getStatusColor = (type : string) => {
    switch (type) {
      case 'Agree':
        return 'bg-green-500 hover:bg-green-600';
      case 'Disagree':
        return 'bg-rose-500 hover:bg-rose-600';
      case 'Abstention':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusIcon = (type : string) => {
    switch (type) {
      case 'Agree':
        return <ThumbsUp className="h-4 w-4 mr-1" />;
      case 'Disagree':
        return <ThumbsDown className="h-4 w-4 mr-1" />;
      case 'Abstention':
        return <Loader className="h-4 w-4 mr-1" />;
      default:
        return <Ban className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Badge
      variant="outline"
      className={`${getStatusColor(summary.type)} text-white`}
    >
      <span className="flex items-center text-nowrap">
        {getStatusIcon(summary.type)}
        {summary.type === 'Agree' ? 'เห็นด้วย' :
          summary.type === 'Disagree' ? 'ไม่เห็นด้วย' :
            summary.type === 'Abstention' ? 'งดออกเสียง' :
              'เท่ากัน'}
      </span>
    </Badge>
  )
}



export default VoteSummary