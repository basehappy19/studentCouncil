'use server'

import { revalidatePath } from "next/cache";

export const RecommendPolicies = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/policies_recommend", { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching recommendations: ${e.message}`);
      throw new Error("Failed to fetch recommendations");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to fetch recommendations");
    }
  }
}

export const AllPolicies = async ({ category = undefined, subCategory = undefined }: { category: string | undefined, subCategory: string | undefined }) => {
  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (subCategory) queryParams.append('subCategory', subCategory);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policies?${queryParams.toString()}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching all policies: ${e.message}`);
      throw new Error("Failed to all policies");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to all policies");
    }
  }
};

export const CommentPolicy = async ({ policyId, message }: { policyId: number, message: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/policy/comment`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ policyId: policyId, message: message}),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath(`/policy/detail/${policyId}`);
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Send Comment Policy: ${e.message}`);
      throw new Error("Failed To Send Comment Policy");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Send Comment Policy");
    }
  }
}

export const LikePolicy = async ({ policyId }: { policyId: number }) => {
  try {
    

    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/policy/like`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ policyId }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath(`/policy/detail/${policyId}`);
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error Like Policy: ${e.message}`);
      throw new Error("Failed To Like Policy");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Like Policy");
    }
  }
}

export const AllPolicyProgresses = async (category: string | undefined) => {
  try {
    const queryParams = new URLSearchParams();
    if (category) queryParams.set('category', category);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_track?${queryParams.toString()}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching policy progress: ${e.message}`);
      throw new Error("Failed to policy progress:");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed to policy progress:");
    }
  }
};

export const AllStatuses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_statuses`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching Policy statuses: ${e.message}`);
      throw new Error("Failed To Fetch Policy statuses");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Fetch Policy statuses");
    }
  }
};

export const StatisticProgresses = async () => {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy_track_statistic`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching Policy Statistic: ${e.message}`);
      throw new Error("Failed To Fetch Policy Statistic");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Fetch Policy Statistic");
    }
  }
};

export const getPolicy = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/policy?id=${id}`, { next: { revalidate: 0 } });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error fetching Policy: ${e.message}`);
      throw new Error("Failed To Fetch Policy");
    } else {
      console.error('An unknown error occurred');
      throw new Error("Failed To Fetch Policy");
    }
  }
};