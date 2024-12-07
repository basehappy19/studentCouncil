import { getUserData } from "@/app/functions/Auth";
import CheckInStatus from "@/components/Backend/CheckIn/CheckInStatus";
import ProfileCard from "@/components/Backend/Profile";
import WorkStatisticsCard from "@/components/Backend/WorkStatisticsCard";
export const dynamic = 'force-dynamic'

const DashBoardIndex = async () => {
    const user = await getUserData();

    return (
        <div>
            <h1 className='text-3xl'>สวัสดี {`${user?.data.displayName}`}!</h1>
            <div className="flex flex-wrap flex-col md:flex-row gap-3 my-5">
                {user && (
                    <>
                        <ProfileCard user={user?.data} />
                        <CheckInStatus />
                        <WorkStatisticsCard />
                    </>
                )}
            </div>
        </div>
    );

};

export default DashBoardIndex;
