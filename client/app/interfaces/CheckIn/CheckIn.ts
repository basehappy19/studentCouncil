import { PartyList } from "../PartyList/partylist";
import { User } from "../User/User";

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
    attendTime: string | null,
    type: 
        'NORMAL' 
        | 'SICK_LEAVE'
        | 'NORMAL'           
        | 'SICK_LEAVE'       
        | 'PERSONAL_LEAVE'   
        | 'NOT_CHECKED_IN'   
        | 'ABSENT'
        | 'FORGOT_TO_CHECK_IN'
        | 'HOLIDAY'          
        | 'CLOSED_FOR_CHECK_IN'
    reason: string | null,
    user: User
}