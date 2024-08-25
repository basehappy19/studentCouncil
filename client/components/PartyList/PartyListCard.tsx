import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { PartyListCardProps } from "@/app/interfaces/Props/PartyList";

const PartyListCard: FC<PartyListCardProps> = ({ partyList, imgSrc }) => {
  
  return (
    <div>
      <Link href={`/partylist/${partyList.id}`}>
        <div className="bg-custom-white rounded-lg mb-3 transition-transform ease-in-out hover:scale-105 shadow-lg">
          <div>
            <Image
              className="w-full h-max max-h-[400px] object-cover rounded-lg"
              width={600}
              height={1200}
              quality={100}
              src={imgSrc + partyList.image}
              alt={partyList.nickName}
            />
          </div>
          <div className="p-3">
            <div className="text-custom-black h-full max-h-10 text-3xl font-semibold">
              {partyList.nickName}
            </div>
            <div className="flex flex-wrap gap-1">
              {partyList.roleData.map((role) => (
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
          </div>
          <div>
            <Link href={`/partylist/${partyList.id}`}>
              <button
                className="w-full py-2.5 text-lg font-medium px-2.5 text-custom-white bg-custom-btn-secondary rounded-b-lg p-3"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)" }}
              >
                ทำความรู้จักผู้สมัคร
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PartyListCard;
