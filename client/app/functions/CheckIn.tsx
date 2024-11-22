'use server'

export const AllCheckIns = async ({startDate = undefined, endDate = undefined, search = undefined} : {startDate : string | undefined, endDate : string | undefined, search : string | undefined}) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkIns`);
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (search) params.append('search', search);

        url.search = params.toString();
        const response = await fetch(url.toString(), {
            next:{
                revalidate: 0,
            }
        });

        if (!response.ok) {
            throw new Error('Failed To Fetch AllCheckIn');
        }
        
        return await response.json();
    } catch (e : unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch AllCheckIn: ${e.message}`);
            throw new Error("Failed to AllCheckIn");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to AllCheckIn");
        }
    }
};

export const CheckInStatus = async ({ userId }: { userId: number }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkin/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Failed to CheckIn');
        }

        return await response.json();
    } catch (e) {
        console.error('Error CheckIn:', e);
        throw e;
    }
};

export const CheckIn = async (data: any) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/checkin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to CheckIn');
        }

        return await response.json();
    } catch (error) {
        console.error('Error CheckIn:', error);
        throw error;
    }
};

export const CheckInStatistics = async ({search = undefined} : { search: string | undefined }) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_APP_API_URL}/checkIn_statistics`);
        const params = new URLSearchParams();

        if (search) params.append('search', search);

        url.search = params.toString();
        
        const res = await fetch(url.toString(), {
            next:{
                revalidate: 0,
            }
        })

        if(!res.ok) {
            throw new Error('Failed To Fetch CheckIn Statistics');
        }

        return res.json()
    } catch (e : unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch CheckIn Statistics: ${e.message}`);
            throw new Error("Failed to CheckIn Statistics");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to CheckIn Statistics");
        }
    }
}