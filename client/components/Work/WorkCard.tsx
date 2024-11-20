'use client'
import React, { useState } from 'react';
import { Work } from "@/app/interfaces/Work/Work";
import Carousel from "./Carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, FileText, Users } from 'lucide-react';



const WorkCard = ({ work }: { work: Work }) => {
  const [hoveredOperatorId, setHoveredOperatorId] = useState<number | null>(null);
  const workIconSrc = process.env.NEXT_PUBLIC_WORK_ICON_PATH || "";
  const profileImgSrc = process.env.NEXT_PUBLIC_USER_PROFILE_IMG_FULL_PATH || "";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-blue-50 to-pink-50 dark:bg-none dark:border-none dark:bg-slate-700 border-2 border-blue-200">
      <div className="relative">
        <div className="carousel-container">
          <Carousel images={work.images} />
        </div>

        {/* Tags Container */}
        <div className="absolute flex flex-wrap gap-2 top-4 left-4">
          {work.tags.map((tag) => (
            <Badge
              key={tag.id}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500/90 hover:bg-blue-600 backdrop-blur-sm"
            >
              <Image
                loading = 'lazy'
                className="w-4 h-4"
                src={workIconSrc + tag.tag.icon}
                alt={tag.tag.title}
                fill={true}
              />
              <span className="text-white font-medium">{tag.tag.title}</span>
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title Section */}
        <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
          <FileText className="w-5 h-5 text-blue-500" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-blue-800 dark:text-blue-500">ชื่อผลงาน</span>
            <span className="text-gray-700 dark:text-gray-200">{work.title}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-1">
          <span className="font-semibold text-blue-800 dark:text-blue-500">คำอธิบาย</span>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{work.description}</p>
        </div>

        {/* Date Section */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-blue-800 dark:text-blue-500">วันที่</span>
          <span className="text-gray-700 dark:text-gray-200">
            {(() => {
              if (work.date !== null && work.date !== undefined) {
                const date = new Date(work.date);
                const thaiDate = date.toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                return `${thaiDate}`;
              }
              return null;
            })()}
          </span>
        </div>

        {/* Operators Section */}
        <div className="flex items-start gap-2">
          <Users className="w-5 h-5 text-pink-500" />
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-blue-800 dark:text-blue-500">ผู้ดำเนินงาน</span>
            <div className="flex flex-wrap gap-2">
              {work.operators.map((operator) => (
                <TooltipProvider key={operator.id}>
                  <Tooltip open={hoveredOperatorId === operator.id}>
                    <TooltipTrigger
                      className="transform transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredOperatorId(operator.id)}
                      onMouseLeave={() => setHoveredOperatorId(null)}
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-pink-200">
                        <Image
                          fill={true}
                          src={profileImgSrc + operator.user.profileImg}
                          alt={`profile-${operator.id}`}
                          className="object-cover"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-blue-100 shadow-lg">
                      <p className="text-sm text-gray-700">
                        {operator.user.partyList.firstName}{" "}
                        {operator.user.partyList.middleName}{" "}
                        {operator.user.partyList.lastName}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkCard;