'use server'
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const AllWorks = async ({search}:{search: string | undefined}) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search.toString());

        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/works?${params.toString()}`;
        const res = await fetch(url ,{ next: { revalidate: 0 } });
        if(!res.ok){
            throw new Error(`Failed to fetch works`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Works: ${e.message}`);
            throw new Error("Failed to Works");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Works");
        }
    }
};

export const getUserWorkStatistics = async () => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }
        const token = session.user.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/userWorkStatistics`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            next: { revalidate: 0 } 
        });
        if(!res.ok){
            throw new Error(`Failed to fetch UserWorkStatistics`);
        }
        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch UserWorkStatistics: ${e.message}`);
            throw new Error("Failed to UserWorkStatistics");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to UserWorkStatistics");
        }
    }
};

export const getWork = async ({id:id}:{id:number | null;}) => {
    try {

        const params = new URLSearchParams();
        if (id) params.append("id", id.toString());
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/work?${params.toString()}`;

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch Work`);
        }
        const data = await res.json();

        if (!data || Object.keys(data).length === 0 || id === null) {
            return null;
        }

        return data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Work: ${e.message}`);
            throw new Error("Failed to Work");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Work");
        }
    }
};

export const getUserWorks = async ({
    search,
    page = 1,
    filter = ""
}: {
    search: string | undefined;
    page: number | undefined;
    filter: string | undefined;
}) => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const token = session.user.token;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = token;
        }

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (filter) params.append("filter", filter);
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/userWorks?${params.toString()}`;

        const res = await fetch(url, {
            headers: headers,
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch UserWorks`);
        }

        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch UserWorks: ${e.message}`);
            throw new Error("Failed to UserWorks");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to UserWorks");
        }
    }
};

export const getOptionsForAddWork = async () => {
    try {
        const session = await auth();

        if (!session) {
            return null;
        }

        const token = session.user.token;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = token;
        }

        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/optionsForAddWork`;

        const res = await fetch(url, {
            headers: headers,
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch UserWorks`);
        }

        return res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Fetch Options: ${e.message}`);
            throw new Error("Failed to Options");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Options");
        }
    }
}


  
export const AddWork = async (
    {
        title, description, images, operators, tags
    }: {
        title: string, 
        description: string, 
        images: File[],  
        operators: number[], 
        tags: number[]
    }
) => {
    try {        
        const session = await auth();

        if (!session) {
            return null;
        }

        const token = session.user.token;

        const headers: Record<string, string> = {
            'X-Upload-Type': 'work',
        };
        
        if (token) {
            headers['Authorization'] = token;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (operators) {
            formData.append('operators', JSON.stringify(operators));
        }
        if (tags) {
            formData.append('tags', JSON.stringify(tags));
        }

        if (images && images.length > 0) {
            images.forEach(image => {
                if (image instanceof File) {
                    formData.append('images', image);
                }
            });
        } else {
            throw new Error('At least one image is required');
        }

        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/work", {
            method: 'POST',
            headers: headers,
            body: formData,
        });
                    
        if (!res.ok) {
            throw new Error('Failed To Add Work');
        }        
        revalidatePath(`/dashboard/works`);
        return await res.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error Add Work ${e.message}`);
            throw new Error("Failed to Add Work");
        } else {
            console.error('An unknown error occurred');
            throw new Error("Failed to Add Work");
        }
    }
};



  

  