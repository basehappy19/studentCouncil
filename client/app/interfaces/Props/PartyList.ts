import { PartyList } from "../PartyList/partylist"; 

export interface PartyListCardProps {
  partyList: PartyList;
  imgSrc: string;
}

export interface AllPartyListCardProps {
  partyList: PartyList;
  imgSrc: string;
  skillsIconSrc: string;
}