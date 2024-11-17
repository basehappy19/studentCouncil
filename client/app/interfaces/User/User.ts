import { PartyList } from "../PartyList/partylist";

export interface User {
  id: number,
  email: string,
  fullName: string,
  displayName: string,
  profileImg: string,
  sid:number,
  access: Access,
  partyList: PartyList,
}

interface Access {
  id: number,
  name: string,
  description: string,
}