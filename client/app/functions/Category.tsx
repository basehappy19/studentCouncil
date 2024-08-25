export const AllPolicyCategory = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/policy/category",{ next: { revalidate: 0 } });
  return response.json();
};

export const PolicyCategories = async (category:string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/policy/category/info/"+category,{ next: { revalidate: 0 } });
  return response.json();
};


  

