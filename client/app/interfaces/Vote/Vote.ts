import { PartyList } from "../PartyList/partylist";

export interface Vote {
    id: number,
    title: string,
    description: string,
    content: string,
    refers: VoteRefers[],
    documents: VoteDocuments[],
    result: VoteResult,
    createdAt: string;
    updatedAt: string;
}

interface VoteRefers {
    id:number,
    refer: VoteRefer,
}

interface VoteRefer {
    id: number,
    name: string,
}

interface VoteDocuments {
    id: number,
    document: VoteDocument,
}

interface VoteDocument {
    id:number,
    name:string,
    path:string,
}

export interface VoteResult {
    maxAttendees: VoteMaxAttendees,
    agrees: VoteAgree[],
    disagrees: VoteDisagree[],
    abstains: VoteAbstain[],
    noVotes: NoVote[],
    total: VoteTotal,
    percentages: Percentages,
    summary: VoteSummary,
}

export interface VoteTotal {
    maxAttendees: number,
    agreeCount: number,
    disagreeCount: number,
    abstainCount: number,
    noVoteCount: number,
    totalPartyListCount: number,
}

interface Percentages {
    agreePercentage: number,
    disagreePercentage: number,
    abstainPercentage: number
    noVotePercentage: number,
}

interface VoteMaxAttendees {
    id:number,
    number: number
}

export interface VoteAgree {
    id:number,
    partyList: PartyList,
}

export interface VoteDisagree {
    id:number,
    partyList: PartyList,
}

export interface VoteAbstain {
    id:number,
    partyList: PartyList,
}

export interface NoVote {
    id:number,
    partyList: PartyList,
}

export interface VoteSummary {
    type: string,
    with: number | null,
    to: number | null,
    percentage: number | null
}