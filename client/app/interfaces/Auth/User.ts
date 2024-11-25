import { PartyList } from "../PartyList/partylist";
import { Access } from "../User/User";


export interface UserData {
    data: {
        id: number;
        username: string;
        email: string;
        fullName: string;
        displayName: string;
        profile_image_full: string;
        profile_image_128x128: string;
        sid: number;
        accessId: number;
        access: Access;
        partyList: PartyList;
    };
    token: string;
}


