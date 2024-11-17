export const AllCheckIn = async (filterData: any) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/checkin/list", {
            method: 'POST',
            body: filterData,
        });

        if (!response.ok) {
            throw new Error('Failed to Query AllCheckIn');
        }
        
        return await response.json();
    } catch (e) {
        console.error('Error AllCheckIn:', e);
        throw e;
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