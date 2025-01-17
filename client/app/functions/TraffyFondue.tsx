'use server'

import { revalidatePath } from "next/cache";

export const getLocations = async ({ search }: { search: string | undefined }) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search.toString());
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/traffyFondue/locations?${params.toString()}`;
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

export const getReports = async ({ search }: { search: string | undefined }) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search.toString());
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/traffyFondue/reports?${params.toString()}`;
        const res = await fetch(url, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error(`Failed To Fetch Reports: ${res.status}`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Reports: ${e.message}`);
            throw new Error(`Failed To fetch Reports`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed To fetch Reports`);
        }
    }
};

export const ReportProblem = async ({ formData }: { formData: FormData }) => {
    try {
        const url = process.env.NEXT_PUBLIC_APP_API_URL + '/traffyFondue/report';
        
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Upload-Type': 'report-problem',
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Failed To Report: ${res.status}`);
        }
        revalidatePath(`/traffy-fondue`)
        return await res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Report: ${e.message}`);
            throw new Error(`Failed To Report`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed To Report`);
        }
    }
};
