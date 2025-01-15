'use server'

export const getLocations = async () => {
    try {
        const url = process.env.NEXT_PUBLIC_APP_API_URL + '/traffyFondue/locations';
        const res = await fetch(url, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error(`Failed To Fetch Locations: ${res.status}`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Locations: ${e.message}`);
            throw new Error(`Failed To fetch Locations`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed To fetch Locations`);
        }
    }
};