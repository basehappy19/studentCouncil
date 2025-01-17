'use server'
import { auth } from "@/auth";
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
      body: JSON.stringify({ partyListId: partyListId, message: message }),
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

export const UpdateBio = async ({ shortMessage, messageToStudent, classroom }: { shortMessage: string, messageToStudent: string, classroom: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/bio`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ shortMessage, messageToStudent, classroom }),
    })

    if (!res.ok) {
      throw new Error('Failed To Update Bio');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Update Bio PartyList: ${e.message}`);
      throw new Error("Failed Update Bio PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Update Bio PartyList");
    }
  }
}

export const UpdateExperience = async ({ id, title }: { id: number, title: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/experience`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ experienceId: id, title: title }),
    })

    if (!res.ok) {
      throw new Error('Failed To Update Experience PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Update Experience PartyList: ${e.message}`);
      throw new Error("Failed Update Experience PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Update Experience PartyList");
    }
  }
}
export const AddExperience = async ({ title }: { title: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/experience`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ title }),
    })

    if (!res.ok) {
      throw new Error('Failed To Add Experience PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Add Experience PartyList: ${e.message}`);
      throw new Error("Failed Add Experience PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Add Experience PartyList");
    }
  }
}

export const RemoveExperience = async ({ id }: { id: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/experience`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ experienceId: id }),
    })

    if (!res.ok) {
      throw new Error('Failed To Remove Experience PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Remove Experience PartyList: ${e.message}`);
      throw new Error("Failed Remove Experience PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Remove Experience PartyList");
    }
  }
}

export const AllPlatforms = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/platforms`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error('Failed To Fetch Platforms');
    }
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Fetch Platforms: ${e.message}`);
      throw new Error("Failed Fetch Platforms");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Fetch Platforms");
    }
  }
}

export const AllSkills = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/skills`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error('Failed To Fetch Skills');
    }
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Fetch Skills: ${e.message}`);
      throw new Error("Failed Fetch Skills");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Fetch Skills");
    }
  }
}

export const AddContact = async ({ username, link, platformId }: { username: string, link: string, platformId: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/contact`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ username, link, platformId }),
    })

    if (!res.ok) {
      throw new Error('Failed To Add Contact PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Add Contact PartyList: ${e.message}`);
      throw new Error("Failed Add Contact PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Add Contact PartyList");
    }
  }
}
export const UpdateContact = async ({ id, username, link }: { id: number, username: string, link: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/contact`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ id, username, link }),
    })

    if (!res.ok) {
      throw new Error('Failed To Update Contact PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Update Contact PartyList: ${e.message}`);
      throw new Error("Failed Update Contact PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Update Contact PartyList");
    }
  }
}

export const RemoveContact = async ({ id }: { id: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/contact`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ id }),
    })

    if (!res.ok) {
      throw new Error('Failed To Remove Contact PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Remove Contact PartyList: ${e.message}`);
      throw new Error("Failed Remove Contact PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Remove Contact PartyList");
    }
  }
}

export const AddSkillInPartyList = async ({ skillId }: { skillId: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/skill`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ skillId }),
    })

    if (!res.ok) {
      throw new Error('Failed To Add Skill');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Add Skill: ${e.message}`);
      throw new Error("Failed Add Skill");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Add Skill");
    }
  }
}

export const RemoveSkill = async ({ skillId }: { skillId: number }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/partyList/skill`;
    const session = await auth();

    if (!session) {
      return null;
    }

    const token = session?.user?.token || '';
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ skillId }),
    })

    if (!res.ok) {
      throw new Error('Failed To Remove Skill PartyList');
    }
    revalidatePath(`/dashboard/profile`);
    return await res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Remove Skill PartyList: ${e.message}`);
      throw new Error("Failed Remove Skill PartyList");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed Remove Skill PartyList");
    }
  }
}