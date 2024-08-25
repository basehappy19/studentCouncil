export const AllCheckIn = async (filterData: any) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/checkin/list", {
            method: 'POST',
            body: filterData,
        });

        if (!response.ok) {
            throw new Error('Failed to Query AllCheckIn');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error AllCheckIn:', error);
        throw error;
    }
};

export const CheckInStatus = async ({ userId }: { userId: number }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/checkin/status`, {
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
    } catch (error) {
        console.error('Error CheckIn:', error);
        throw error;
    }
};


export const CheckIn = async (userData: any) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/checkin", {
            method: 'POST',
            body: userData,
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