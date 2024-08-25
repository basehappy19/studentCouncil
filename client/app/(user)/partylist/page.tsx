import { AllPartyList } from "@/app/functions/PartyList";
import NavbarPink from "@/app/layouts/NavbarPink";
import AllPartyListCard from "@/components/PartyList/AllPartyListCard";
import { PartyList } from "@/app/interfaces/PartyList/partylist";

async function getAllPartyList(): Promise<PartyList[]> {
  const response = await AllPartyList();
  return response;
}

export const metadata = {
  title: `ทำความรู้จักสภานักเรียน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "แต่ละคนมักมีความสามารถ SoftSkill HardSkill ที่แตกต่างกัน เราจึงได้คัดสรรการทำงานในความถนัดออกมาแบบในพรรคของเรา",
  openGraph: {
    title: `ทำความรู้จักสภานักเรียน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "แต่ละคนมักมีความสามารถ SoftSkill HardSkill ที่แตกต่างกัน เราจึงได้คัดสรรการทำงานในความถนัดออกมาแบบในพรรคของเรา",
  },
};

async function page() {
  const partyLists: PartyList[] = await getAllPartyList();
  const imgSrc = process.env.NEXT_PUBLIC_APP_PARTYLISTS_IMG_PATH_SERVER || "";
  const skillsIconSrc =
    process.env.NEXT_PUBLIC_APP_PARTYLISTS_SKILLS_ICON_PATH_SERVER || "";
  
  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="text-center">
          <div className="w-full max-w-[600px] mx-auto">
            <div className="text-start">
              <h1
                className="text-custom-white text-5xl font-semibold"
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
              >
                ผู้สมัครสภานักเรียน
              </h1>
            </div>
            <div className="text-end">
              <h1
                className="text-custom-white text-5xl font-semibold"
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
              >
                จำนวน {partyLists.length} คน
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="container pt-10 mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
          {partyLists.map((party) => (
            <div
              key={party.id}
              className={`col-span-3 sm:col-span-1 lg:col-span-1 ${
                party.idQuery == 10
                  ? "col-start-auto md:col-start-2 lg:col-start-2"
                  : ""
              }`}
            >
              <AllPartyListCard
                partyList={party}
                imgSrc={imgSrc}
                skillsIconSrc={skillsIconSrc}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default page;
