import Link from "next/link";
import { PartyList } from "@/app/interfaces/PartyList/partylist";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ExternalLink
} from "lucide-react";
import PartyListCard from "@/components/PartyList/PartyListCard";
import { getPartyList } from '@/app/functions/PartyList';
import Image from "next/image";

export async function generateMetadata(props : { params : { id:string } }) {
  const params = await props.params
  const id = params.id
  const partyList : PartyList = await getPartyList(parseInt(id));
  const imgSrc = process.env.NEXT_PUBLIC_PARTYLIST_IMG_FULL_PATH

  return {
    title: `ทำความรู้จัก ${partyList.nickName} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
    `${partyList.rank} ${partyList.bio.shortMessage} ${partyList.nickName} ${partyList.bio.classroom}`,
    openGraph: {
      title: `ทำความรู้จัก ${partyList.nickName} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
      `${partyList.rank} | ${partyList.bio.shortMessage} | ${partyList.nickName} | ${partyList.bio.classroom}`,
      images: {
        url: `${imgSrc}${partyList.profile_image_full}`
      }
    },
  };
}


async function AboutPartyList(props: { params: { id: string } }) {
  const params = await props.params
  const id = params.id
  const partyList: PartyList = await getPartyList(parseInt(id));
  const platformIconSrc = process.env.NEXT_PUBLIC_PLATFORM_ICON_PATH || "";

  return (
    <div className="relative bg-[#f4f4fc] dark:bg-slate-900">
      <section className="relative min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-pink-100 dark:from-slate-800/50 dark:to-transparent">
        <div className="absolute inset-0 bg-grid-white/25 bg-grid-8" />
        <div className="relative pt-20 pb-32 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-y-20 md:gap-x-20">
              <div className="flex-1 w-full">
                <div className="relative">

                  <PartyListCard partyList={partyList} />

                </div>
              </div>

              <div className="flex-1 relative">
                <div className="text-3xl md:text-6xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 dark:from-blue-600 dark:to-orange-600">
                  {partyList.bio.shortMessage}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-20 flex items-center justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </div>
      </section>

      <section className="relative -mt-20 mb-24">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden bg-white/90 dark:bg-stone-200 backdrop-blur-sm border-0 shadow-xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-pink-500/60" />
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                ถึงพี่น้องชาวชมพูขาว
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {partyList.bio.messageToStudent}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>


      <section>
        <div className="container mx-auto px-4">

          <div className="group relative overflow-hidden rounded-xl p-8 mb-8 bg-white/90 dark:bg-stone-200 shadow-md dark:shadow-none transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 min-w-[120px]">
                ชื่อ
              </h3>
              <span className="text-xl md:text-3xl text-gray-600">
                {partyList.firstName} {partyList.middleName} {partyList.lastName}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <div className="group relative overflow-hidden rounded-xl p-8 mb-8 bg-white/90 dark:bg-stone-200 shadow-md dark:shadow-none transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 min-w-[120px]">
                การศึกษา
              </h3>
              <span className="text-xl md:text-3xl text-gray-600">
                {partyList.bio.classroom}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <div className="group relative overflow-hidden rounded-xl p-8 bg-white/90 dark:bg-stone-200 shadow-md dark:shadow-none transition-colors duration-300">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800">
                ผลงาน / ประสบการณ์
              </h3>
              <div className="space-y-6">
                {partyList.bio.experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-pink-500 before:to-purple-500"
                  >
                    <h4 className="text-xl font-semibold text-gray-800">
                      {experience.experience.title}
                    </h4>
                    <p className="text-gray-600">
                      {experience.experience.description}
                    </p>
                    <span className="text-sm text-gray-500 mt-1 block">
                      {(() => {
                        if (experience.experience.date !== null && experience.experience.date !== undefined) {
                          const date = new Date(experience.experience.date);
                          const thaiDate = date.toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          });
                          return `(${thaiDate})`;
                        }
                        return null;
                      })()}

                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {partyList.contacts.map((contact) => (
              <Link
                key={contact.id}
                href={contact.link}
                target="_blank"
              >
                <Button
                  variant="outline"
                  className="group relative overflow-hidden px-6 py-3 bg-white dark:bg-stone-200 hover:bg-white/90 border border-gray-200 shadow-sm transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="flex items-center gap-3">
                    <Image
                      src={platformIconSrc + contact.platform.icon}
                      alt={contact.username}
                      className="w-5 h-5"
                    />
                    <span className="font-medium">{contact.platform.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-100 transition-opacity duration-300" />
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPartyList;