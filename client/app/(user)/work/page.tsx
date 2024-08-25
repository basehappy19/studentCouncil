import { AllWork } from "@/app/functions/Work";
import NavbarPink from "@/app/layouts/NavbarPink";
import WorkCard from "@/components/Work/WorkCard";
import "./work.scss";
import { WorkData } from "@/app/interfaces/Work/Work";

export const metadata = {
  title: `ติดตามการทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  openGraph: {
    title: `ติดตามการทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำสภาให้โปร่งใส นักเรียนทุกคนสามารถติดตามการทำงานผลงานเราได้ที่นี้",
  },
};

async function getWork(): Promise<WorkData[]> {
  const response = AllWork();
  return response;
}

async function page() {
  const work: WorkData[] = await getWork();
  const workImgSrc = process.env.NEXT_PUBLIC_APP_WORKS_IMG_PATH_SERVER || "";
  const workIconSrc = process.env.NEXT_PUBLIC_APP_WORKS_ICON_PATH_SERVER || "";
  const profileImgSrc =
    process.env.NEXT_PUBLIC_APP_USERS_PROFILE_PATH_SERVER || "";
  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="container p-4 mx-auto">
          <div className="w-full max-w-[600px] mx-auto text-end">
            <div className="text-start">
              <h1
                className="text-custom-white text-xl md:text-4xl w-full font-semibold"
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
              >
                ผลงานของเราตลอดวาระการทำงาน
              </h1>
            </div>
            <div className="text-end">
              <span
                className="w-full text-lg md:text-2xl font-semibold text-custom-secondary"
                style={{
                  textShadow:
                    "0 1px 0 var(--color-text-shadow),0 1px 0 var(--color-text-shadow-1),0 3px 0 var(--color-text-shadow-3),0 0 0 var(--color-text-shadow-4),0 1px 0 var(--color-text-shadow-5),0 5px 0 var(--color-text-shadow-6),0 3px 0 var(--color-text-shadow-7),0 0 0 var(--color-text-shadow-8),0 0 2px var(--color-text-shadow-9),0 -1px 5px var(--color-text-shadow-10),0 3px 3px var(--color-text-shadow-11),0 6px 4px var(--color-text-shadow-12),0 8px 8px var(--color-text-shadow-13)",
                }}
              >
                โรงเรียน
                <span className="text-custom-white w-full font-semibold">
                  ในแบบที่เราอยากเห็น
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 gap-10">
          {work.map((work) => (
            <div className="col-span-1" key={work.id}>
              <WorkCard
                work={work}
                workImgSrc={workImgSrc}
                workIconSrc={workIconSrc}
                profileImgSrc={profileImgSrc}
              />
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default page;
