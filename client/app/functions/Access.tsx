'use server'
export const AllAccesses = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/accesses",{ next: { revalidate: 0 } });
    return response.json();
}