export const AllPolicy = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/policy",{ next: { revalidate: 0 } });
  return response.json();
};

export const AllPolicyProgress = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/policy/data/track",{ next: { revalidate: 0 } });
  return response.json();
};

export const Policy = async (idQuery: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/policy/" + idQuery,{ next: { revalidate: 0 } });
  return response.json();
};

export const PolicyFilter = async (category: string, subCategory: string = "0") => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_APP_API + "/policy/category/" + category + "/" + subCategory,{ next: { revalidate: 0 } }
  );
  return response.json();
};
