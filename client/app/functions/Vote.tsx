export const AllVote = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/vote",{ next: { revalidate: 0 } });
    return response.json();
};

export const Vote = async (idQuery:string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/vote/" + idQuery, { next: { revalidate: 0 } });
    return response.json();
};
  


  