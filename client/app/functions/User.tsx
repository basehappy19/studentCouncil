export const AllUser = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user",{ next: { revalidate: 0 } });
    return response.json();
};
  
export const AddUser = async (user) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/register",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
}
  