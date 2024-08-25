import { PartyList } from "@/app/interfaces/PartyList/partylist";
import { PartyList as FetchPartyList } from "@/app/functions/PartyList";
import Link from "next/link";
import Image from "next/image";
import NavbarPink from "@/app/layouts/NavbarPink";

export async function generateMetadata({ params }: { params: any }) {
  const { idQuery } = params;
  const partyList: PartyList[] = await getPartyList(idQuery);
  const imgSrc = process.env.NEXT_PUBLIC_APP_PARTYLISTS_IMG_PATH_SERVER || "";

  return {
    title:
      "ทำความรู้จัก" +
      partyList[0].nickName +
      ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      partyList[0].numberTag +
      " " +
      partyList[0].description +
      " " +
      partyList[0].nickName +
      " " +
      partyList[0].study,
    openGraph: {
      title:
        "ทำความรู้จัก" +
        partyList[0].nickName +
        ` ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
        partyList[0].numberTag +
        " " +
        partyList[0].description +
        " | " +
        partyList[0].nickName +
        " " +
        partyList[0].study,
      images: {
        url: `${imgSrc}${partyList[0].image}`,
      },
    },
  };
}

async function AboutPartyList({ params }: { params: any }) {
  const { idQuery } = params;
  const partyList = await getPartyList(idQuery);
  const imgSrc = process.env.NEXT_PUBLIC_APP_PARTYLISTS_IMG_PATH_SERVER || "";
  const skillsIconSrc = process.env.NEXT_PUBLIC_APP_PARTYLISTS_SKILLS_ICON_PATH_SERVER || "";

  return (
    <div className="bg-custom-background pb-5">
      <NavbarPink />
      <section className="min-h-screen bg-custom-primary py-10 px-2">
        <div className="flex flex-col items-center justify-center">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-y-20 md:gap-x-20">
              <div className="flex-1">
                <div className="relative bg-custom-white rounded-lg mb-3 transition-transform hover:scale-105 shadow-lg">
                  <div>
                    <Image
                      className="w-full h-max max-h-[300px] md:max-h-[450px] object-cover rounded-lg"
                      width={600}
                      height={1200}
                      src={imgSrc + partyList[0].image}
                      alt={partyList[0].nickName}
                    />
                  </div>
                  <div className="z-10 absolute px-3 py-2 bg-custom-primary text-custom-black top-4 right-5 rounded-2xl">
                    <span className="font-semibold">
                      {partyList[0].numberTag}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="text-custom-black h-full max-h-10 text-3xl font-semibold">
                      <div>{partyList[0].nickName}</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {partyList[0].roleData.map((role) => (
                        <div
                          key={role.id}
                          className="text-xl font-normal text-custom-text-black-secondary"
                        >
                          <div className="text-custom-text-black-secondary">
                            {role.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 text-custom-dark font-medium">
                      {partyList[0].skillData.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center mr-2 gap-1"
                        >
                          <img
                            src={skillsIconSrc + skill.skillIcon}
                            className="min-w-4 min-h-4 w-4 h-4"
                            alt=""
                          />{" "}
                          {skill.skillTitle}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-3xl md:text-5xl text-center font-semibold drop-shadow-md">
                  <div>{partyList[0]?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative container px-4 mx-auto py-10">
          <div className="absolute inset-x-0 bottom-0 translate-y-full py-10 px-4 bg-custom-secondary drop-shadow-xl rounded-lg">
            <div>
              <h1 className="font-semibold text-3xl text-custom-primary-dark">
                ถึงพี่น้องชาวชมพูขาว
              </h1>
            </div>
            <div className="mt-3">
              <p className="text-custom-gray font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat veritatis itaque reiciendis explicabo ad eligendi
                perferendis possimus officia. Quis optio, tenetur fugit
                aliquid labore dolorem quidem ea. Numquam, dolore sit?
              </p>
            </div>
          </div>
          <div className="absolute right-4 -bottom-4 translate-y-full flex flex-row space-x-2">
            <div className="w-5 h-5 bg-custom-primary-dark rounded-full"></div>
            <div className="w-5 h-5 bg-custom-primary-dark rounded-full"></div>
            <div className="w-5 h-5 bg-custom-primary-dark rounded-full"></div>
          </div>
        </div>
      </section>
      <section className="pt-60 md:pt-32 pb-10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-center py-8">
            <h1 className="flex-initial m-0 font-bold text-2xl md:text-4xl">ชื่อ</h1>
            <span className="flex-1 text-xl md:text-3xl font-normal md:ml-3">
              {partyList[0]?.firstName} {partyList[0]?.lastName}
            </span>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row md:items-center justify-center py-8">
            <h1 className="flex-initial m-0 font-bold text-2xl md:text-4xl">การศึกษา</h1>
            <span className="flex-1 text-xl md:text-3xl font-normal md:ml-3">
              {partyList[0]?.study}
            </span>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row md:items-center justify-center py-8">
            <span className="flex-initial m-0 font-bold text-2xl md:text-4xl">
              ผลงาน
              <span className="flex-initial m-0 font-bold text-2xl md:text-4xl">
                {" "}/
              </span>
              <span className="flex-initial m-0 font-bold text-2xl md:text-4xl">
                {" "}ประสบการณ์
              </span>
            </span>
            <span className="flex-1 text-xl md:text-3xl font-normal md:ml-3">
              {partyList[0]?.experience_work}
            </span>
          </div>
          <hr />
          {partyList && partyList[0]?.social && partyList[0].social[0] ? (
            <div className="flex flex-row items-center justify-start md:justify-center mt-8">
              {partyList[0].social[0]?.facebook ? (
                <Link
                  href={`${partyList[0].social[0].facebook}`}
                  target="_blank"
                >
                  <button className="transition duration-300 hover:bg-custom-primary text-custom-black bg-none border border-custom-primary rounded-xl mr-2 p-4">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </button>
                </Link>
              ) : null}
              {partyList[0].social[0]?.instagram ? (
                <Link
                  href={`${partyList[0].social[0].instagram}`}
                  target="_blank"
                >
                  <button className="transition duration-300 hover:bg-custom-primary text-custom-black bg-none border border-custom-primary rounded-xl mr-2 p-4">
                    <i className="fa-brands fa-instagram"></i> Instagram
                  </button>
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

async function getPartyList(idQuery: string): Promise<PartyList[]> {
  const response = await FetchPartyList(idQuery);
  return response;
}

export default AboutPartyList;
