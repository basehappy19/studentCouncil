export const AllWork = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/work",{ next: { revalidate: 0 } });
    return response.json();
};

export const UserWorks = async (userId) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user-works/"+userId,{ next: { revalidate: 0 } });
    return response.json();
};
  
export const AllWorkTag = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/work/tag",{ next: { revalidate: 0 } });
    return response.json();
};
  
export const AddWork = async (formData: any) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/work", {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to add work');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding work:', error);
        throw error;
    }
};


  

  