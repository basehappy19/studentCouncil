export const getPartyListInHomepages = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/partyList_for_homepages",{ next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching party lists: ${e.message}`);
    throw new Error("Failed to fetch party lists");
  }
};

export const AllPartyLists = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/partyLists",{ next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching all party lists: ${e.message}`);
    throw new Error("Failed to fetch all party lists");
  }
};

export const getPartyList = async (id:number) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + `/partyList?id=${id.toString()}`,{ next: { revalidate: 0 } });
    if(!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e : Error | any) {
    console.error(`Error fetching party list: ${e.message}`);
    throw new Error("Failed to fetch party list");
  }
};
