"use client";
import Link from "next/link";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import { PolicyTrackCardProps } from "@/app/interfaces/Props/Policy";

const PolicyTrackCard: FC<PolicyTrackCardProps> = ({ policies }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
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

  const splitText = (text) => {
    const words = text.split(" ");
    const limitedWords = words.slice(0, 3);
    if (words.length > 3) {
      limitedWords.push("...");
    }
    return limitedWords;
  };
  return (
    <div>
      <Link href={`/policy/detail/${policies.id}`}>
        <div className="relative p-5 pb-16 rounded-lg bg-white border border-custom-light-2 my-2 min-h-[235px] transition-all hover:drop-shadow-lg">
          <div className="text-white font-medium bg-custom-primary py-1 px-[10px] inline-block mb-4 rounded-lg">
            {policies.categoryData[0]?.title}
          </div>
          <div className="text-xl text-primary font-semibold mb-1">
            {policies.title}
          </div>
          <div className="mb-2 text-gray">
            <p>
              {splitText(policies.offer).map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </p>
          </div>
          <div className="flex absolute items-center left-4 right-4 bottom-4">
            <ul className="flex p-0 h-[14px] border border-white rounded-2xl m-0 mr-4 overflow-hidden w-full text-white bg-[#eee]">
              <LightTooltip
                title="เริ่มนโยบาย"
                open={isTooltipOpen || policies.statusId === 1}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 1
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="วางแผน"
                open={isTooltipOpen || policies.statusId === 2}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 2
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="ดำเนินการ"
                open={isTooltipOpen || policies.statusId === 3}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 3
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="ตรวจสอบ"
                open={isTooltipOpen || policies.statusId === 4}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 4
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="รอโรงเรียนอนุมัติ"
                open={isTooltipOpen || policies.statusId === 5}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 5
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="สำเร็จ"
                open={isTooltipOpen || policies.statusId === 6}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  className={`w-[calc(21%-2px)] border-l border-white list-none flex gap-1 items-center justify-center relative ${
                    policies.statusId >= 6
                      ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary"
                      : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
            </ul>
            <Link href={`/policy/detail/${policies.id}`}>
              <button>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PolicyTrackCard;
