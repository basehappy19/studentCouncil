export const RecommendPolicies = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/policies_recommend",{ next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching recommendations: ${e.message}`);
    throw new Error("Failed to fetch recommendations");
  }
}

export const AllPolicies = async ({ category = undefined, subCategory = undefined }: { category: string | undefined, subCategory: string | undefined }) => {
  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (subCategory) queryParams.append('subCategory', subCategory);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policies?${queryParams.toString()}`, { next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: Error | any) {
    console.error(`Error fetching all policies: ${e.message}`);
    throw new Error("Failed to fetch all policies");
  }
};

export const AllPolicyProgresses = async (category: string | undefined) => {
  try {
    const queryParams = new URLSearchParams();
    if(category) queryParams.set('category', category);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_track?${queryParams.toString()}`, { next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching policy progress: ${e.message}`)
    throw new Error("Failed to fetch policy progress")
  }
};

export const AllStatuses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_statuses`, { next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching statuses: ${e.message}`)
    throw new Error("Failed to fetch statuses")
  }
};

export const StatisticProgresses = async () => {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_track_statistic`, { next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching policy statistic: ${e.message}`)
    throw new Error("Failed to fetch policy statistic")
  }
};

export const getPolicy = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy?id=${id}`,{ next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching policy: ${e.message}`);
    throw new Error("Failed to fetch policy");
  }
};

export const PolicyFilter = async (category: string, subCategory: string = "0") => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_APP_API_URL + "/policy/category/" + category + "/" + subCategory,{ next: { revalidate: 0 } }
  );
  return response.json();
};
