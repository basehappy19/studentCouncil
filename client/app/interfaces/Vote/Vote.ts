export interface VoteDocument {
    title: string;
    fileName: string;
}

export interface RoleData {
    _id: string;
    roleId: number;
    roleTitle: string;
    __v: number;
}

export interface VoteMember {
    idQuery: number;
    roleId: number[];
    displayName: string;
    profilePicture: string;
    rolesData: RoleData[];
}

export interface VoteData {
    _id: string;
    idQuery: number;
    voteTitle: string;
    voteDescription: string;
    voteContent: string;
    voteRefer: string;
    voteDate: string;
    voteDocument: VoteDocument[];
    voteMaxAttendees: number;
    voteAgree: VoteMember[];
    voteDisagree: VoteMember[];
    voteAbstention: VoteMember[];
    voteAbstain: VoteMember[];
}