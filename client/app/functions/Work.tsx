export const AllWorks = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/works",{ next: { revalidate: 0 } });
        return res.json();
    } catch (e : Error | any) {
        console.error(`Error fetching works: ${e.message}`);
        throw new Error('Error fetching works');
    }
};

export const UserWorks = async (userId:number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user-works/"+userId,{ next: { revalidate: 0 } });
    return response.json();
};
  
export const AllWorkTag = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/work/tag",{ next: { revalidate: 0 } });
    return response.json();
};
  
export const AddWork = async (formData: any) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/work", {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Failed to add work');
        }

        return await res.json();
    } catch (error) {
        console.error('Error adding work:', error);
        throw error;
    }
};


  

  