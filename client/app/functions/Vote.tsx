export const AllVotes = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/votes`,
            {
                next:{
                    revalidate: 0,
                }
            }
        )
        if(!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Failed to fetch all votes: ${e.message}`);
            throw new Error(`Failed to fetch all votes`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed to add vote`);
        }
    } 
};

export const AddVote = async (formData : FormData) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/vote/", {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            throw new Error(`Failed to add vote`);
        }
        return res.json();
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Failed to add vote: ${e.message}`);
            throw new Error(`Failed to add vote`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed to add vote`);
        }
    }
};

export const getVote = async ({
    id,
    search,
    }: {
        id: number;
        search: string | undefined;
    }) => {    
    
    try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set('search', search);
    
        const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/vote/${id}${
            queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;
        const res = await fetch(url, {
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
            console.error(`Failed to fetch vote: ${e.message}`);
            throw new Error(`Failed to fetch vote`, { cause: e });
        } else {
            console.error("Unknown error occurred", e);
            throw new Error(`Failed to fetch vote`);
        }
    }    
};

export const RemoveVote = async (id:number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/vote/" + id, { method: 'DELETE' });
    return response.json();
};
  


  