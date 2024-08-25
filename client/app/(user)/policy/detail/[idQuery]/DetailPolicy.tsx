"use client";
import { useState, FC } from "react";
import Navbar from "@/app/layouts/Navbar";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { DetailPolicyProps } from "@/app/interfaces/Props/Policy";

const DetailPolicy: FC<DetailPolicyProps> = ({
  policySrc,
  categoryIconSrc,
  subcategoryIconSrc,
  policy,
}) => {
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
  return (
    <div className="bg-custom-background pb-5">
      <Navbar />
      <section className="border-b border-gray p-10">
        <div className="container p-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h1
                className="font-semibold text-custom-gray text-6xl text-center md:text-start"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {policy[0]?.title}
              </h1>
              <div className="flex gap-2 justify-center font-medium md:justify-normal text-custom-dark flex-wrap">
                <div className="flex items-center gap-1 justify-center md:justify-normal">
                  <img
                    src={categoryIconSrc + policy[0].categoryData[0].icon}
                    className="min-w-4 min-h-4 w-4 h-4"
                    alt=""
                  />
                  {policy[0].categoryData[0].title}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap text-custom-dark font-medium justify-center md:justify-normal">
                {policy[0].subCategories.map(
                  (subpolicy) =>
                    subpolicy.idQuery !== 0 && (
                      <div
                        key={subpolicy.idQuery}
                        className="flex items-center gap-1 justify-normal md:justify-center"
                      >
                        <img
                          src={subcategoryIconSrc + subpolicy.icon}
                          className="min-w-4 min-h-4 w-4 h-4"
                          alt=""
                        />
                        {subpolicy.title}
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div>
                <Image
                  className="object-cover w-full h-full max-h-[350px] rounded-lg"
                  width={1200}
                  height={500}
                  src={policySrc + policy[0].image}
                  alt={policy[0].title}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container p-4 mx-auto">
          <h1
            className={`text-4xl font-semibold text-center md:text-start mt-3`} style={{color: policy[0].statusData[0].statusColor}}
          >
            สถานะ{policy[0]?.statusData[0].statusName}
          </h1>
          <div className="mt-2 flex items-center top-0 z-30 bottom-4">
            <ul className="flex p-0 h-[14px] border border-custom-white rounded-2xl m-0 mr-4 overflow-hidden w-full text-custom-white bg-[#eee]">
              <LightTooltip
                title="เริ่มนโยบาย"
                open={isTooltipOpen || policy[0].statusId === 1}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 1 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="วางแผน"
                open={isTooltipOpen || policy[0].statusId === 2}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 2 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="ดำเนินการ"
                open={isTooltipOpen || policy[0].statusId === 3}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 3 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="ตรวจสอบ"
                open={isTooltipOpen || policy[0].statusId === 4}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 4 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="รอโรงเรียนอนุมัติ"
                open={isTooltipOpen || policy[0].statusId === 5}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 5 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
              <LightTooltip
                title="สำเร็จ"
                open={isTooltipOpen || policy[0].statusId === 6}
                onClose={() => setIsTooltipOpen(false)}
                onOpen={() => setIsTooltipOpen(true)}
                arrow
              >
                <li
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`w-[calc(21%-2px)] border-l border-custom-white list-none flex gap-1 items-center justify-center relative ${
                    policy[0].statusId >= 6 ? "bg-gradient-to-r from-custom-secondary-light to-custom-secondary" : "bg-gradient-to-r from-[#eee] to-[#e6e6e6]"
                  }`}
                >
                  <span></span>
                </li>
              </LightTooltip>
            </ul>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#ae4334]">ปัญหา</h1>
              <p>{policy[0].problem}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#a33bc8]">ข้อเสนอ</h1>
              <p>{policy[0].offer}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="my-10">
              <h1 className="text-4xl font-semibold text-[#4a9924]">งบประมาณ</h1>
              <p>{policy[0].budget}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailPolicy;
