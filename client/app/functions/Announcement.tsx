'use server'

export const AllAnnouncements = async ({ search, page }: { search: string | undefined, page: number | undefined }) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search.toString());
        if (page) params.append("page", page.toString());

        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/announcements?${params.toString()}`;
        const res = await fetch(url, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error(`Failed To Fetch Announcements: ${res.status}`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Announcements: ${e.message}`);
            throw new Error(`Failed To Fetch Announcements`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed To Fetch Announcements`);
        }
    }
};