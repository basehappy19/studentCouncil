import Link from "next/link";
import { PartyList } from "@/app/interfaces/PartyList/partylist";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChevronDown,
  ExternalLink
} from "lucide-react";
import PartyListCard from "@/components/PartyList/PartyListCard";
import { getPartyList } from '@/app/functions/PartyList';
import Image from "next/image";
import ContactForm from "./ContactForm";
import SupportButton from "./SupportButton";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const partyList: PartyList = await getPartyList(parseInt(id));
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


async function AboutPartyList(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const partyList: PartyList = await getPartyList(parseInt(id));
  const platformIconSrc = process.env.NEXT_PUBLIC_PLATFORM_ICON_PATH || "";
  
  return (
    <div className="relative bg-[#f4f4fc] dark:bg-slate-900 pb-5">
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

      <section className="relative -mt-20 mb-10">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden bg-white/90 dark:bg-stone-200 backdrop-blur-sm border-0 shadow-xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-pink-500/60" />
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


      <section className="relative my-10">
        <div className="container mx-auto px-4">

          <div className="group relative overflow-hidden rounded-xl p-8 mb-8 bg-white/90 dark:bg-stone-200 shadow-md dark:shadow-none transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 min-w-[120px]">
                ชื่อ
              </h3>
              <span className="text-xl md:text-3xl text-gray-600">
                {partyList.fullName}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <div className="group relative overflow-hidden rounded-xl p-8 mb-8 bg-white/90 dark:bg-stone-200 shadow-md dark:shadow-none transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 min-w-[120px]">
                ระดับชั้น
              </h3>
              <span className="text-xl md:text-3xl text-gray-600">
                ม.{partyList.bio.classroom}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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
                    <h4 className="text-md font-semibold text-gray-800">
                      {experience.experience.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        </div>
      </section>

      <section className="relative my-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partyList.contacts.map((contact) => (
              <Link
                key={contact.id}
                href={contact.link}
                target="_blank"
                className="group"
              >
                <div className="bg-white dark:bg-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 rounded-xl overflow-hidden">
                  <div className="flex items-center p-4 space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-700 p-3 rounded-full">
                      <Image
                        width={32}
                        height={32}
                        src={platformIconSrc + contact.platform.icon}
                        alt={contact.username}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg font-semibold text-blue-800 dark:text-blue-100">
                        {contact.platform.name}
                      </p>
                    </div>
                    <ExternalLink className="text-blue-600 dark:text-blue-300 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm partyList={partyList} />
      <SupportButton partyList={partyList} />
    </div>
  );
}

export default AboutPartyList;