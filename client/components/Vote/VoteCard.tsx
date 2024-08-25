import VoteStaticProgress from "./VoteStaticProgress";
import ListVote from "./ListVote";
import Link from "next/link";
import { FC } from "react";
import { VoteCardProps } from "@/app/interfaces/Props/Vote";

const VoteCard : FC<VoteCardProps> = ({ vote }) => {
  const voteMaxAttendees = vote.voteMaxAttendees;
  const voteAgreeCount = vote.voteAgree.length;
  const voteDisagreeCount = vote.voteDisagree.length;
  const voteAbstentionCount = vote.voteAbstention.length;
  const voteAbstainCount = vote.voteAbstain.length;
  const voteAttendees =
    voteAgreeCount + voteDisagreeCount + voteAbstentionCount + voteAbstainCount;

  const voteAgreePercentage = ((voteAgreeCount / voteAttendees) * 100).toFixed(
    2
  );
  const voteDisagreePercentage = (
    (voteDisagreeCount / voteAttendees) *
    100
  ).toFixed(2);
  const voteAbstentionPercentage = (
    (voteAbstentionCount / voteAttendees) *
    100
  ).toFixed(2);
  const voteAbstainPercentage = (
    (voteAbstainCount / voteAttendees) *
    100
  ).toFixed(2);

  const maxPercentage = Math.max(
    voteAgreePercentage,
    voteDisagreePercentage,
    voteAbstentionPercentage,
    voteAbstainPercentage
  );
  
  return (
    <div className="bg-custom-white p-4 rounded-lg border border-custom-light-2 my-2 transition-all cursor-pointer hover:scale-105">
      <Link href={`/vote/${vote.id}`}>
        <VoteStaticProgress
          voteAgreePercentage={voteAgreePercentage}
          voteDisagreePercentage={voteDisagreePercentage}
          voteAbstentionPercentage={voteAbstentionPercentage}
          voteAbstainPercentage={voteAbstainPercentage}
        />
        <div className="my-2">
          {voteAgreePercentage == 50 ||
          voteDisagreePercentage == 50 ||
          voteAbstentionPercentage == 50 ||
          voteAbstainPercentage == 50 ? (
            <div className="text-custom-black text-4xl font-medium">มติคะแนนเท่ากัน 50/50%</div>
          ) : (
            <div className="text-custom-black text-4xl font-medium">
              {voteAgreePercentage == maxPercentage
                ? `${voteAgreePercentage}% เห็นด้วย`
                : voteDisagreePercentage == maxPercentage
                ? `${voteDisagreePercentage}% ไม่เห็นด้วย`
                : voteAbstentionPercentage == maxPercentage
                ? `${voteAbstentionPercentage}% งดออกเสียง`
                : voteAbstainPercentage == maxPercentage
                ? `${voteAbstainPercentage}% ไม่ลงคะแนน`
                : null}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-custom-black font-medium">{vote.voteDescription}</p>
        </div>
        <div className="mb-8">
          <p className="text-custom-black font-light">{vote.voteContent}</p>
        </div>
        <div className="flex items-center flex-wrap gap-1.5 text-2xl">
          <div
            className={`rounded-[50%] align-middle w-[20px] h-[20px] ${
              voteAgreePercentage == 50 ||
              voteDisagreePercentage == 50 ||
              voteAbstentionPercentage == 50 ||
              voteAbstainPercentage == 50
                ? "bg-[#76c8b8]"
                : voteAgreePercentage == maxPercentage
                ? "bg-[#76c8b8]"
                : voteDisagreePercentage == maxPercentage
                ? "bg-[#f0324b]"
                : voteAbstentionPercentage == maxPercentage
                ? "bg-[#ccc]"
                : voteAbstainPercentage == maxPercentage
                ? "bg-[#494949]"
                : ""
            }`}
          >
            <span></span>
          </div>
          {voteAgreePercentage == 50 ||
          voteDisagreePercentage == 50 ||
          voteAbstentionPercentage == 50 ||
          voteAbstainPercentage == 50 ? (
            <div className="font-semibold text-custom-black">เท่ากัน</div>
          ) : (
            <div
              className={`font-semibold ${
                voteAgreePercentage == 50 ||
                voteDisagreePercentage == 50 ||
                voteAbstentionPercentage == 50 ||
                voteAbstainPercentage == 50
                  ? "text-custom-black"
                  : voteAgreePercentage == maxPercentage
                  ? "text-[#76c8b8]"
                  : voteDisagreePercentage == maxPercentage
                  ? "text-[#f0324b]"
                  : voteAbstentionPercentage == maxPercentage
                  ? "text-[#707070]"
                  : voteAbstainPercentage == maxPercentage
                  ? "text-[#494949]"
                  : ""
              }`}
            >
              {voteAgreePercentage == maxPercentage
                ? `เห็นด้วย`
                : voteDisagreePercentage == maxPercentage
                ? `ไม่เห็นด้วย`
                : voteAbstentionPercentage == maxPercentage
                ? `งดออกเสียง`
                : voteAbstainPercentage == maxPercentage
                ? `ไม่ลงคะแนน`
                : null}
            </div>
          )}
        </div>
        <ListVote
          voteAgreeCount={voteAgreeCount}
          voteDisagreeCount={voteDisagreeCount}
          voteAbstentionCount={voteAbstentionCount}
          voteAbstainCount={voteAbstainCount}
        />
        <div className="text-custom-black font-medium">
          {new Date(new Date(vote.voteDate).getTime()).toLocaleDateString(
            "th-TH",
            {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }
          )}
        </div>
      </Link>
    </div>
  );
}

export default VoteCard;
