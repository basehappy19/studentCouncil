'use server'
import { revalidatePath } from "next/cache";

export const getPartyListInHomepages = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/partyList_for_homepages", { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching party lists: ${e.message}`);
      throw new Error("Failed to fetch party lists");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to fetch party lists");
    }
  }
};

export const SupportPartyList = async ({ partyListId }: { partyListId: number }) => {
  try {
    

    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/support`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ partyListId }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath(`/partyList/${partyListId}`);
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Support PartyList: ${e.message}`);
      throw new Error("Failed To Support PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Support PartyList");
    }
  }
}

export const SendMessageToPartyList = async ({ partyListId, message }: { partyListId: number, message: string }) => {
  try {
    

    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/message`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ partyListId: partyListId, message: message}),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath(`/partyList/${partyListId}`);
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Send Message PartyList: ${e.message}`);
      throw new Error("Failed To Send Message PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Send Message PartyList");
    }
  }
}


export const AllPartyLists = async ({ search }: { search: string | undefined }) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search.toString());

    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyLists?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching all party lists: ${e.message}`);
      throw new Error("Failed to fetch all party lists");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to fetch all party list");
    }
  }
};

export const getPartyList = async (id: number) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + `/partyList?id=${id.toString()}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching party list: ${e.message}`);
      throw new Error("Failed to fetch party list");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to fetch party list");
    }
  }
};
