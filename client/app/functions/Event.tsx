'use server'

export const AllEvents = async () => {
    try {
        
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/events`;
        const res = await fetch(url, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error(`Failed To Fetch Events: ${res.status}`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Events: ${e.message}`);
            throw new Error(`Failed To Fetch Events`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed To Fetch Events`);
        }
    }
};