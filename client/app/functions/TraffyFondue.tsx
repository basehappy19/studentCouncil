'use server'

import { revalidatePath } from "next/cache";
import { baseFetcher } from "@/lib/fetcher";
import { Location, Problem } from "../interfaces/TraffyFondue/Location";

export const getLocations = async ({ 
    search 
}: { 
    search: string | undefined 
}): Promise<Location[]> => {
    const params = new URLSearchParams();
    if (search) params.append("search", search.toString());
    
    return baseFetcher<Location[]>(`/traffyFondue/locations?${params.toString()}`);
};

export const getReports = async ({ 
    search 
}: { 
    search: string | undefined 
}): Promise<Problem[]> => {
    const params = new URLSearchParams();
    if (search) params.append("search", search.toString());

    return baseFetcher<Problem[]>(`/traffyFondue/reports?${params.toString()}`);
};

export const ReportProblem = async ({ 
    formData 
}: { 
    formData: FormData 
}): Promise<any> => {
    const result = await baseFetcher<any>('/traffyFondue/report', {
        method: 'POST',
        headers: {
            'X-Upload-Type': 'report-problem',
        },
        body: formData,
    });

    revalidatePath(`/traffy-fondue`);
    return result;
};

