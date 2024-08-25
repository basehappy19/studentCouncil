"use client"
import Carousel from "./Carousel";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { WorkCardProps } from "@/app/interfaces/Props/Work";
import { FC } from "react";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const WorkCard: FC<WorkCardProps> = ({ work, workImgSrc, workIconSrc, profileImgSrc }) => {
  const thaiDate = new Date(new Date(work.createdAt).getTime()).toLocaleDateString("th-TH",{year: "numeric",month: "long",day: "2-digit",});

  return (
    <div className="transition-all ease-in-out bg-custom-white rounded-lg border border-custom-light-2 hover:drop-shadow-lg">
      <div className="px-4 pt-4 relative">
        <div className="carousel-container">
          <Carousel workImgSrc={workImgSrc} images={work.workImage} />
        </div>
        <div className="flex items-center flex-wrap gap-1 absolute py-1 px-[0.35rem] left-[25px] top-[25px] bg-custom-primary rounded-lg">
          <div>
            <img className="min-w-4 min-h-4 w-4 h-4" src={workIconSrc + work.workTagData[0]?.tagIcon} alt={work.workTagData[0]?.tagIcon} />
          </div>
          <div className="font-semibold">{work.workTagData[0]?.tagTitle}</div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center flex-wrap gap-1 mb-3">
          <div className="text-custom-black font-semibold">ชื่อผลงาน :</div>
          <div>{work.workTitle}</div>
        </div>
        <div className="flex items-center flex-wrap gap-1 mb-3">
          <div className="text-custom-black font-semibold">คำอธิบาย :</div>
          <div>{work.workDescription}</div>
        </div>
        <div className="flex items-center flex-wrap gap-1 mb-3">
          <div className="text-custom-black font-semibold">วันที่ :</div>
          <div>{thaiDate}</div>
        </div>
        <div className="flex items-center flex-wrap gap-1 mb-3">
          <div className="text-custom-black font-semibold">ผู้ดำเนินงาน :</div>
          <div>
            <div className="flex items-center flex-wrap gap-1">
              {work.workOperatorData.map((workOperator) => (
                <div key={workOperator.id}>
                  <LightTooltip arrow title={workOperator.displayName}>
                    <Image
                      width={20}
                      height={20}
                      src={profileImgSrc + workOperator.profilePicture}
                      alt={`profile-${workOperator.id}`}
                      className="align-middle w-[30px] h-[30px] rounded-[50%]"
                    />
                  </LightTooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
