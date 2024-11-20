export const AllCategories = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/categories", { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories. Status: ${res.status}`);
    }
    return res.json();
  } catch (e: Error | any) {
    console.error(`Error fetching categories: ${e.message}`);
    throw new Error("Failed to fetch categories");
  }
};

export const getCategory = async (category: string | undefined) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + `/category?id=` + category, { next: { revalidate: 0 } });
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching policy categories: ${e.message}`);
    throw new Error("Failed to fetch policy categories");
  }
};




