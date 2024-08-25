import { FC } from 'react';
import { VoteStaticProgressProps } from '@/app/interfaces/Props/Vote';
const VoteStaticProgress : FC<VoteStaticProgressProps> = ({voteAgreePercentage, voteDisagreePercentage, voteAbstentionPercentage, voteAbstainPercentage}) => {
  return (
    <div className="flex w-full h-[15px] max-h-[15px] mb-2">
      <div
        className="bg-[#76c8b8]"
        style={{ width: `${voteAgreePercentage}%` }}
      >
        <span></span>
      </div>
      <div
        className="bg-[#f0324b]"
        style={{ width: `${voteDisagreePercentage}%` }}
      >
        <span></span>
      </div>
      <div
        className="bg-[#ccc]"
        style={{ width: `${voteAbstentionPercentage}%` }}
      >
        <span></span>
      </div>
      <div
        className="bg-[#3b3b3b]"
        style={{ width: `${voteAbstainPercentage}%` }}
      >
        <span></span>
      </div>
    </div>
  );
}

export default VoteStaticProgress;
