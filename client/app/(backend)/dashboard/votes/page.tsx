import { AllVotes } from "@/app/functions/Vote"
import VoteZone from "./VoteZone"
import { Vote } from "@/app/interfaces/Vote/Vote";
import { User } from "@/app/interfaces/User/User";
import { AllUsers } from "@/app/functions/User";


const Votes = async () => {
    const votes : Vote[] = await AllVotes();
    const users : User[] = await AllUsers();
    
    return (
        <VoteZone votes={votes} users={users} />
    )
}

export default Votes