import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { AllPartyListCardProps } from "@/app/interfaces/Props/PartyList";

const AllPartyListCard : FC<AllPartyListCardProps> = ({ partyList, imgSrc, skillsIconSrc }) => {  
  return (
    <div>
      <Link href={`/partylist/${partyList.id}`}>
        <div className="relative bg-custom-white rounded-lg mb-3 transition-all ease-in-out duration-300 hover:scale-105 shadow-lg">
          <div>
            <Image
              className="w-full h-max max-h-[400px] object-cover rounded-lg"
              width={600}
              height={1200}
              quality={100}
              src={imgSrc + partyList.image}
              alt={partyList.image}
            />
          </div>
          <div className="z-10 absolute px-3 py-2 bg-custom-primary text-custom-black top-4 right-5 rounded-2xl">
            <span className="font-semibold">{partyList.numberTag}</span>
          </div>
          <div className="p-3">
            <div className="text-custom-black h-full max-h-10 text-3xl font-semibold">{partyList.nickName}</div>
            <div className="flex flex-wrap gap-1">
              {partyList.roleData.map((role) => (
                <div key={role.id} className="text-xl font-normal text-custom-text-black-secondary">
                  <div className="text-custom-text-black-secondary">{role.name}</div>
                </div>
              ))}
            </div>
            <div className="min-h-[24px] flex flex-wrap gap-x-2 text-custom-dark font-medium">
              {partyList.skillData.map((skill) => (
                <div key={skill.id} className="flex items-center">
                  <Image
                    width={30} 
                    height={30}
                    src={skillsIconSrc + skill.skillIcon}
                    className="min-w-4 min-h-4 w-4 h-4 mr-1"
                    alt={skill.skillIcon}
                  />
                  {skill.skillTitle}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link href={`/partylist/${partyList.id}`}>
              <button
                className="w-full py-2.5 text-lg font-medium px-2.5 text-custom-white bg-custom-btn-secondary rounded-b-lg p-3"
              >
                ทำความรู้จักผู้สมัคร
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AllPartyListCard;
