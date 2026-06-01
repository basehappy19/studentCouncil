'use server'
import { CheckIn as CheckInInterface, CheckIns, CheckInStatistic, CheckInType, Request, RequestData, StatusRequest } from "../interfaces/CheckIn/CheckIn";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { baseFetcher } from "@/lib/fetcher";

export const AllCheckIns = async ({ 
    startDate = undefined, 
    endDate = undefined, 
    search = undefined 
}: { 
    startDate: string | undefined, 
    endDate: string | undefined, 
    search: string | undefined 
}): Promise<CheckIns> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (search) params.append('search', search);

    return baseFetcher<CheckIns>(`/checkIns?${params.toString()}`);
};

export const getCheckInStatus = async (): Promise<CheckInInterface | null> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    return baseFetcher<CheckInInterface | null>('/checkInUser', {
        headers: {
            'Authorization': session.user.token
        },
    });
};

export const CheckIn = async ({ 
    type, 
    reason = null 
}: { 
    type: CheckInType, 
    reason: string | null 
}): Promise<CheckInInterface | null> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    const result = await baseFetcher<CheckInInterface>("/checkIn", {
        method: 'POST',
        headers: {
            'Authorization': session.user.token
        },
        body: JSON.stringify({ type, reason }),
    });

    revalidatePath('/dashboard');
    return result;
};

export const CheckInStatistics = async ({ 
    search = undefined 
}: { 
    search: string | undefined 
}): Promise<CheckInStatistic[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    return baseFetcher<CheckInStatistic[]>(`/checkIn_statistics?${params.toString()}`);
};

export const getForgetCheckInRequests = async (): Promise<RequestData | null> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    return baseFetcher<RequestData>('/checkInRequests', {
        headers: {
            'Authorization': session.user.token
        },
    });
};

export const checkInRequestExist = async (): Promise<Request[] | null> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    const data = await baseFetcher<Request[] | null>("/checkInRequest", {
        headers: {
            'Authorization': session.user.token
        },
    });

    if (!data || data.length === 0) return null;
    return data;
};

export const ActionCheckInRequest = async ({ 
    requestId, 
    status 
}: { 
    requestId: number, 
    status: StatusRequest 
}): Promise<Request | null> => {
    const session = await auth();
    if (!session?.user?.token) return null;

    const result = await baseFetcher<Request>("/actionRequestCheckIn", {
        method: 'PUT',
        headers: {
            'Authorization': session.user.token
        },
        body: JSON.stringify({ requestId, status }),
    });

    revalidatePath('/dashboard/checkInForgetRequests');
    return result;
};

