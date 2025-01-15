import { PartyList } from "../PartyList/partylist";

export interface User {
  id: number,
  email: string,
  fullName: string,
  displayName: string,
  profile_image_full: string,
  profile_image_128x128: string,
  sid: number,
  accessId: number,
  access: Access,
  partyList: PartyList,
  token: string,
}

export interface Access {
  id: number,
  name: string,
  description: string,
}