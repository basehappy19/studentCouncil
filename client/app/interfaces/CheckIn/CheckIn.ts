import { PartyList } from "../PartyList/partylist";

export interface CheckIns {
    partyLists: PartyList[],
    days: Day[],
}

interface Day {
    id: number,
    dateTime: string,
    checkIns: CheckIn[]
}

interface CheckIn {
    id:number,
}