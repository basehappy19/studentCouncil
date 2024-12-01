import { PartyList } from "../PartyList/partylist";
import { User } from "../User/User";

export type CheckInType =
    | "NORMAL"
    | "SICK_LEAVE"
    | "PERSONAL_LEAVE"
    | "NOT_CHECKED_IN"
    | "ABSENT"
    | "REQUEST_FOR_CHECK_IN"
    | "FORGOT_TO_CHECK_IN"
    | "HOLIDAY"
    | "CLOSED_FOR_CHECK_IN";

type Status =
    | "ปกติ"
    | "ลาป่วย"
    | "ลากิจ"
    | "ไม่ได้เช็คอิน"
    | "ขาด"
    | "ลืมเช็คอิน"
    | "วันหยุด"
    | "ปิดการเช็คอิน";

export interface CheckIns {
    partyLists: PartyList[];
    days: Day[];
}

interface Day {
    id: number;
    dateTime: string;
    checkIns: CheckIn[];
}

export interface CheckIn {
    id: number;
    message: string;
    attendTime: string | null;
    type: CheckInType;
    reason: string | null;
    user: User;
}

export interface CheckInStatistic
    extends Pick<
        PartyList,
        | "fullName"
        | "nickName"
        | "profile_image_128x128"
        | "profile_image_full"
        | "roles"
    > {
    id: number;
    statistics: Statistic;
}

interface Statistic {
    id: number;
    days: number;
    averageCheckInTime: string;
    statusCounts: StatusCount[];
}

export type StatusCountType = Exclude<CheckInType, "HOLIDAY" | "CLOSED_FOR_CHECK_IN">;
type StatusName = Exclude<Status, "วันหยุด" | "ปิดการเช็คอิน">;

interface StatusCount {
    type: StatusCountType; 
    count: number;
    name: StatusName;
}

export interface RequestData {
    count: number,
    requests: Request[]
}

export type StatusRequest = 
    "PENDING"
    | "APPROVED"
    | "REJECTED"

export interface Request {
    id: number,
    userId: number,
    checkInDayId: number,
    timeRequested: string,
    status: StatusRequest,
    createdAt: string,
    updatedAt: string,
    user: User
}