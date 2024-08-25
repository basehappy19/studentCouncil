import { HomePagePartyList } from "@/app/functions/PartyList";
import Navbar from "@/app/layouts/Navbar";
import PartyListCard from "@/components/PartyList/PartyListCard";
import { PartyList } from "@/app/interfaces/PartyList/partylist";

async function getPartyList(): Promise<PartyList[]> {
  const response = await HomePagePartyList();
  return response;
}

export const metadata = {
  title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  openGraph: {
    title: `หน้าแรก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  },
};

async function Home() {
  const partyList: PartyList[] = await getPartyList();
  const imgSrc = process.env.NEXT_PUBLIC_APP_PARTYLISTS_IMG_PATH_SERVER || "";

  return (
    <div className="bg-custom-background pb-5">
      <Navbar />
      <div className="container pt-10 mx-auto px-4">
        <section>
          <h1 className="text-3xl drop-shadow-md font-medium">
            <span className="text-custom-text-heading">ผู้แทน</span>
            <span className="text-custom-text-main"> นักเรียนของเรา</span>
          </h1>
          <h1 className="text-3xl drop-shadow-md font-medium">
            <span className="text-custom-text-main">คัดสรร</span>
            <span className="text-custom-text-main">ความสามารถเฉพาะทาง</span>
          </h1>
        </section>
        <section className="pt-10">
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
            {partyList.map((party) => (
              <div
                key={party.idQuery}
                className={`col-span-3 sm:col-span-1 lg:col-span-1 ${
                  party.idQuery == 1 ? "order-first md:order-none lg:order-none" : ""
                } ${
                  party.idQuery == 10
                    ? "col-start-auto md:col-start-2 lg:col-start-2"
                    : ""
                }`}
              >
                <PartyListCard partyList={party} imgSrc={imgSrc} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
