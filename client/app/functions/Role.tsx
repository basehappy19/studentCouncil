export const AllRole = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/roles",{ next: { revalidate: 0 } });
    return response.json();
}