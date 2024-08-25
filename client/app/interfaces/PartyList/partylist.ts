export interface Social {
  instagram: string;
  facebook: string;
}

export interface Role {
  _id: string;
  roleId: number;
  roleTitle: string;
  __v: number;
}

export interface Skill {
  _id: string;
  skillId: number;
  skillIcon: string;
  skillTitle: string;
  __v: number;
}

export interface PartyList {
  _id: string;
  idQuery: number;
  firstName: string;
  lastName: string;
  nickName: string;
  description: string;
  numberTag: string;
  study: string;
  work: string;
  showInHomepage: boolean;
  __v: number;
  social: Social[];
  image: string;
  roleId: number[];
  skillId: number[];
  roleData: Role[];
  skillData: Skill[];
}
