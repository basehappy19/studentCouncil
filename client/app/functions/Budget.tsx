export const AllBudget = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/budget",{ next: { revalidate: 0 } });
    return response.json();
};

export const Budget = async (idQuery: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/budget/"+idQuery,{ next: { revalidate: 0 } });
    return response.json();
};

  
  
    
  
  