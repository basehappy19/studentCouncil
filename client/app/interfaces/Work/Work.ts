export interface WorkData {
  _id: string;
  idQuery: number;
  workTitle: string;
  workDescription: string;
  workOperator: number[];
  workPostBy: string;
  workImage: string[];
  workTagId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  workTagData: WorkTagData[];
  workOperatorData: WorkOperatorData[];
}

export interface WorkTagData {
  _id: string;
  idQuery: number;
  tagTitle: string;
  tagIcon: string;
  __v: number;
}

export interface WorkOperatorData {
  _id: string;
  idQuery: number;
  username: string;
  password: string;
  displayName: string;
  roleId: number[];
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
