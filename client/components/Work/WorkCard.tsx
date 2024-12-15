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
import { Calendar, FileText, Users, ChevronRight } from 'lucide-react';

const WorkCard = ({ work }: { work: Work }) => {
  const [hoveredOperatorId, setHoveredOperatorId] = useState<number | null>(null);

  return (
    <Card className="overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl bg-white dark:bg-slate-800 border-none">
      {/* Carousel Section */}
      <div className="relative">
        <Carousel images={work.images} />

        {/* Tags Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {work.tags.map((tag) => (
            <Badge
              key={tag.id}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-sm"
            >
              <Image
                loading='lazy'
                width={16}
                height={16}
                src={`${process.env.NEXT_PUBLIC_WORK_ICON_PATH}${tag.tag.icon.name}`}
                alt={tag.tag.icon.name}
                className="mr-1"
              />
              <span className="text-slate-700 font-medium text-sm">{tag.tag.title}</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 space-y-5">
        {/* Title */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
          <FileText className="w-6 h-6 text-blue-600" />
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">ชื่อผลงาน</h3>
            <p className="text-slate-600 dark:text-slate-300">{work.title}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-slate-700 dark:text-blue-400">คำอธิบาย</h4>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            {work.description}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-amber-500" />
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-blue-400">วันที่</h4>
            <p className="text-slate-600 dark:text-slate-300">
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
            </p>
          </div>
        </div>

        {/* Operators */}
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-purple-500" />
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-blue-400 mb-2">ผู้ดำเนินงาน</h4>
            <div className="flex flex-wrap gap-2">
              {work.operators.map((operator) => (
                <TooltipProvider key={operator.id}>
                  <Tooltip open={hoveredOperatorId === operator.id}>
                    <TooltipTrigger
                      className="transform transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredOperatorId(operator.id)}
                      onMouseLeave={() => setHoveredOperatorId(null)}
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          fill={true}
                          src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + operator.user.partyList.profile_image_128x128}
                          alt={`profile-${operator.id}`}
                          className="object-cover"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-slate-200 shadow-lg rounded-md">
                      <p className="text-sm text-slate-700 p-1">
                        {operator.user.partyList.fullName}
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