'use server'
import { CheckInType, StatusRequest } from "../interfaces/CheckIn/CheckIn";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const AllCheckIns = async ({ startDate = undefined, endDate = undefined, search = undefined }: { startDate: string | undefined, endDate: string | undefined, search: string | undefined }) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkIns`);
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (search) params.append('search', search);

        url.search = params.toString();
        const response = await fetch(url.toString(), {
            next: {
                revalidate: 0,
            }
        });

        if (!response.ok) {
            throw new Error('Failed To Fetch AllCheckIn');
        }

        return await response.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch AllCheckIn: ${e.message}`);
            throw new Error("Failed to AllCheckIn");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to AllCheckIn");
        }
    }
};

export const getCheckInStatus = async () => {
    try {
        const session = await auth()
        if (!session) {
            return null;
        }
        const token = session?.user?.token


        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkInUser`, {
            next: {
                revalidate: 0,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        if (!res.ok) {
            return null
        }

        if (!res.ok) {
            throw new Error('Failed to Fetch CheckIn Status');
        }

        return await res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error CheckInStatus: ${e.message}`);
            throw new Error("Failed to CheckInStatus");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to CheckInStatus");
        }
    }
};

export const CheckIn = async ({ type, reason = null }: { type: CheckInType, reason: string | null }) => {
    try {
        const session = await auth();
        if (!session) {
            return null;
        }
        const token = session?.user?.token

        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/checkIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                type,
                reason
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to CheckIn');
        }
        revalidatePath('/dashboard');
        return await res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error CheckIn: ${e.message}`);
            throw new Error("Failed to CheckIn");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to CheckIn");
        }
    }
};

export const CheckInStatistics = async ({ search = undefined }: { search: string | undefined }) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkIn_statistics`);
        const params = new URLSearchParams();

        if (search) params.append('search', search);

        url.search = params.toString();

        const res = await fetch(url.toString(), {
            next: {
                revalidate: 0,
            }
        })

        if (!res.ok) {
            throw new Error('Failed To Fetch CheckIn Statistics');
        }
        return res.json()
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch CheckIn Statistics: ${e.message}`);
            throw new Error("Failed to CheckIn Statistics");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to CheckIn Statistics");
        }
    }
}

export const getForgetCheckInRequests = async () => {
    try {
        const session = await auth();
        if(!session){
            return null;
        }
        const token = session?.user?.token || ''

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkInRequests`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        if (!res.ok) {
            throw new Error('Failed to Fetch CheckIn Requests');
        }

        return await res.json();
    } catch (e: unknown) {
        console.error(`Failed to fetch user data: ${e instanceof Error ? e.message : 'Unknown error'}`);
        return null;
    }
};

export const checkInRequestExist = async () => {
    try {
        const session = await auth();
        if (!session) {
            return null;
        }
        const token = session?.user?.token;

        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/checkInRequest", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
    
        if (!res.ok) {
            throw new Error('Failed to CheckInRequestExist');
        }
    
        const responseBody = await res.text();
        if (!responseBody) {
            return null;
        }
        const data = JSON.parse(responseBody);

        if (!data || data.length === 0) {
            return null;
        }

        return data;

    } catch (e) {
        if (e instanceof Error) {
            console.error(`Error CheckInRequestExist: ${e.message}`);
            throw new Error("Failed To Fetch CheckInRequestExist");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed To Fetch CheckInRequestExist");
        }
    }
}

export const ActionCheckInRequest = async ({ requestId, status }: { requestId: number, status: StatusRequest }) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }
        const token = session.user.token
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/actionRequestCheckIn", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                requestId,
                status
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to ActionCheckInRequest');
        }
        revalidatePath('/dashboard/checkInForgetRequests');
        return await res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Action CheckIn Request: ${e.message}`);
            throw new Error("Failed To Action CheckIn Request");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed To Action CheckIn Request");
        }
    }
}
