"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { CheckInStatus } from '@/app/functions/CheckIn';
import CheckinStatus from '@/components/DashBoard/CheckInStatus';
import ProfileCard from '@/components/DashBoard/Profile';
import { UserWorks } from '@/app/functions/Work';
import WorkStatsCard from '@/components/DashBoard/WorkStatsCard';
import Loading from '@/components/Other/Loading';


const Homepage = () => {
    const { data: session, status } = useSession()
    const [checkInStatusData, setCheckInStatusData] = useState(null);
    const [worksData, setWorksData] = useState(null);


    const userWorks = async (userId) => {
        try {
            const res = await UserWorks(userId);
            setWorksData(res);
        } catch (err) {
            console.log(err);
        }
    };
    const checkInStatus = async (userId) => {
        try {
            const res = await CheckInStatus({ userId: userId });
            setCheckInStatusData(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session.user) {
            checkInStatus(session.user.id);
            userWorks(session.user.id)
        }
    }, [status, session]);

    if (status === "loading" || !session) {
        return <Loading />
    }
    
    return (
        status === 'authenticated' && session.user && (
            <div>
                <h1 className='text-3xl'>สวัสดี "{session.user.displayName}"!</h1>
                <div className="flex flex-wrap flex-col md:flex-row gap-3 my-5">
                    <ProfileCard user={session.user} />
                    {session.user && checkInStatusData && (
                        <CheckinStatus status={checkInStatusData} />
                    )}
                    {session.user && worksData && (
                        <WorkStatsCard
                            userId={session.user.id}
                            works={worksData}
                        />
                    )}
                </div>
            </div>
        )
    );
};

export default Homepage;
