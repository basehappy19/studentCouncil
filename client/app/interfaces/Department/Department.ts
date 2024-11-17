import { Budget } from "../Budget/Budget";
import { PartyList } from "../PartyList/partylist";

export interface Department {
    id: number,
    name: string,
    description: string,
    color: string,
    budget: Budget,
    leader: PartyList,
}