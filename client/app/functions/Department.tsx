export const AllDepartments = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/departments`, {
            next: {
                revalidate: 0,
            }
        })
        if (!res.ok) {
            throw new Error(`Failed to fetch vote`);
        }
        return res.json();
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Failed to fetch departments: ${e.message}`);
            throw new Error(`Failed to fetch departments`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed to fetch departments`);
        }
    }
}