export const HomePagePartyList = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/homepage/partylist",{ next: { revalidate: 0 } });
  return response.json();
};

export const AllPartyList = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/partylist",{ next: { revalidate: 0 } });
  return response.json();
};

export const PartyList = async (idQuery:string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/partylist/"+ idQuery,{ next: { revalidate: 0 } });
  return response.json();
};
