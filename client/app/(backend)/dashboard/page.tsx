import { getUserData } from "@/app/functions/Auth";
import { UserData } from "@/app/interfaces/Auth/User";
import ProfileCard from "@/components/Backend/Profile";

const DashBoardIndex = async () => {
    const user : UserData | null = await getUserData();
    
    return (
        <div>
            <h1 className='text-3xl'>สวัสดี {`"${user?.data.displayName}"`}!</h1>
            <div className="flex flex-wrap flex-col md:flex-row gap-3 my-5">
                {user && ( <ProfileCard user={user.data} /> )}
                {/* {checkInStatusData && user.id && (
                    <CheckinStatus userId={user?.id} status={checkInStatusData} refreshCheckInStatus={refreshCheckInStatus} />
                )}
                {worksData && (
                    <WorkStatsCard
                        userId={user?.id}
                        works={worksData}
                    />
                )} */}
            </div>
        </div>
    );
    
};

export default DashBoardIndex;
