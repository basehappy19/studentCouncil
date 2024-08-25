import { VoteData } from "../Vote/Vote";

export interface VoteCardProps {
    vote: VoteData;
}

export interface ListVoteProps {
    voteAgreeCount: number;
    voteDisagreeCount: number;
    voteAbstentionCount: number;
    voteAbstainCount: number;
}

export interface VoteStaticProgressProps {
    voteAgreePercentage: number;
    voteDisagreePercentage: number;
    voteAbstentionPercentage: number;
    voteAbstainPercentage: number;
}