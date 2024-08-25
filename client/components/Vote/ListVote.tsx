import React, { FC } from "react";
import { ListVoteProps } from "@/app/interfaces/Props/Vote";

const ListVote: FC<ListVoteProps> = ({
  voteAgreeCount,
  voteDisagreeCount,
  voteAbstentionCount,
  voteAbstainCount,
}) => {
  return (
    <div className="mb-2">
      <div className="flex flex-wrap flex-col md:flex-row">
        <span className="text-custom-black mr-4 mt-2">
          <div className="rounded-[3px] min-w-[10px] min-h-[10px] w-[10px] h-[10px] max-w-[10px] max-h-[10px] inline-block bg-[#76c8b8] border border-[#76c8b8]"></div>{" "}
          เห็นด้วย {voteAgreeCount}
        </span>
        <span className="text-custom-black mr-4 mt-2">
          <div className="rounded-[3px] min-w-[10px] min-h-[10px] w-[10px] h-[10px] max-w-[10px] max-h-[10px] inline-block bg-[#f0324b] border border-[#f0324b]"></div>{" "}
          ไม่เห็นด้วย {voteDisagreeCount}
        </span>
        <span className="text-custom-black mr-4 mt-2">
          <div className="rounded-[3px] min-w-[10px] min-h-[10px] w-[10px] h-[10px] max-w-[10px] max-h-[10px] inline-block bg-[#ccc] border border-[#ccc]"></div>{" "}
          งดออกเสียง {voteAbstentionCount}
        </span>
        <span className="text-custom-black mr-4 mt-2">
          <div className="rounded-[3px] min-w-[10px] min-h-[10px] w-[10px] h-[10px] max-w-[10px] max-h-[10px] inline-block bg-[#494949] border border-[#494949]"></div>{" "}
          ไม่ลงคะแนน {voteAbstainCount}
        </span>
      </div>
    </div>
  );
};

export default ListVote;
