import { VoteData } from "@/app/interfaces/Vote/Vote";
import { AllVote } from "@/app/functions/Vote";
import NavbarPink from "@/app/layouts/NavbarPink";
import VoteCard from "@/components/Vote/VoteCard";

export const metadata = {
  title: `ติดตามการลงมติ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
  openGraph: {
    title: `ติดตามการลงมติ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
  },
};

async function getAllVote() : Promise<VoteData[]> {
  const response = AllVote();
  return response;
}

async function page() {
  const vote : VoteData[] = await getAllVote();
  
  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-[600px] mx-auto">
            <div className="text-start">
              <h1 
              className="text-custom-white text-3xl md:text-5xl w-full font-semibold"
              style={{
                textShadow:
                  "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
              }}
              >มติเพื่อใคร ?</h1>
              <h1 
              className="text-custom-white text-3xl md:text-5xl w-full font-semibold"
              style={{
                textShadow:
                  "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
              }}
              >มติได้อะไร ?</h1>
            </div>
            <div className="text-end">
              <h1 
              className="text-custom-white text-3xl md:text-5xl w-full font-semibold"
              style={{
                textShadow:
                  "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
              }}
              >มติเป็นยังไง ?</h1>
              <h1
              className="text-custom-white text-3xl md:text-5xl w-full font-semibold"
              style={{
                textShadow:
                  "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
              }}
              >ติดตามได้ที่นี่</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vote.map((vote) => (
            <div className="col-span-2 md:col-span-1" key={vote.idQuery}>
              <VoteCard vote={vote} />
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default page;
