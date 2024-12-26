'use client'
import Link from "next/link";
import Image from "next/image";
import { PartyList } from "../../app/interfaces/PartyList/partylist";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowRight } from "lucide-react";
import { usePathname } from 'next/navigation'

const PartyListCard = ({ partyList }: { partyList: PartyList }) => {
  const pathname = usePathname()

  return (
    <Card className="group overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10">
      <div className="relative">
        <div className="relative h-96 overflow-hidden">
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            quality={100}
            src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_FULL_PATH}${partyList.profile_image_full}`}
            alt={partyList.nickName}
          />
          {(pathname === `/partyList/${partyList.id}` || pathname === `/partyLists`) && (
            <Badge className="absolute top-4 right-4 p-2 font-light bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 hover:dark:bg-blue-900 dark:text-gray-200">
              {partyList.rank}
            </Badge>
          )}
          {pathname !== `/partyList/${partyList.id}` && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent dark:from-black/80 transition-all duration-300 group-hover:from-black/20 dark:group-hover:from-black/40" />
          )}
        </div>

        <CardContent className="relative -mt-20 space-y-4 p-6">
          <div className="rounded-lg bg-white dark:bg-gray-900 p-4 shadow-lg dark:shadow-gray-900/50">
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {partyList.nickName}
            </h3>
            <div className="mb-2 flex flex-wrap gap-2">
              {partyList.roles.map((role) => (
                <Badge
                  key={role.role.id}
                  variant="secondary"
                  className="font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100"
                >
                  {role.role.name}
                </Badge>
              ))}
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {partyList.bio.skills.map((skill) => (
                <Badge
                  key={skill.skill.id}
                  variant="secondary"
                  className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  <Image
                    width={16}
                    height={16}
                    quality={100}
                    src={`${process.env.NEXT_PUBLIC_PARTYLIST_SKILLS_ICON_PATH}${skill.skill.icon}`}
                    className="min-w-4 min-h-4 w-4 h-4 mr-2"
                    alt="skill"
                  />{skill.skill.name}
                </Badge>
              ))}
            </div>
            {pathname !== `/partyList/${partyList.id}` && (
              <Link
                href={`/partyList/${partyList.id}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                ทำความรู้จักผู้สมัคร
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PartyListCard;