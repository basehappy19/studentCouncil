'use client'
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Policy, Status } from "@/app/interfaces/Policy/Policy";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PolicyProgressModal = ({
  policy,
  statuses
}: {
  policy: Policy,
  statuses: Status[]
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStepStatus = (stepNumber: number) => {
    if (policy.progresses.length > stepNumber) {
      return 'completed';
    }
    if (policy.progresses.length === stepNumber) {
      return 'current';
    }
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300';
      case 'current': return 'bg-blue-100 border-blue-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="w-full group"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center justify-between bg-white shadow-sm hover:shadow-md rounded-xl p-4 transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: policy.currentProgress.status.color }}
            />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              สถานะ: {policy.currentProgress.status.name}
            </span>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 group-hover:bg-blue-100 transition-colors"
          >
            ดูรายละเอียด
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-4 bg-white shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 tracking-tight">
            ความคืบหน้านโยบาย
          </DialogTitle>
          <p className="text-center text-gray-500 text-sm mt-1">
            {policy.title}
          </p>
        </DialogHeader>

        <div className="space-y-3 relative">
          {/* Progress Line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200"
            style={{
              height: `calc(100% - 20px)`,
              transform: 'translateY(10px)'
            }}
          />

          {statuses.map((status, index) => {
            const stepStatus = getStepStatus(status.step);

            return (
              <div
                key={status.step}
                className="relative flex items-center space-x-3 z-10"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-4 z-20",
                    getStatusColor(stepStatus)
                  )}
                >
                  {getStatusIcon(stepStatus)}
                </div>
                <div
                  className={cn(
                    "flex-grow p-3 rounded-xl transition-all duration-300 border-l-4",
                    getStatusColor(stepStatus)
                  )}
                >
                  <h3 className="font-bold text-base text-gray-800">{status.name}</h3>
                  {policy.progresses[index] && (
                    <p className="text-xs text-gray-600 mt-1">
                      {policy.progresses[index].description}
                    </p>
                  )}
                  {stepStatus === 'completed' && policy.progresses[index] && (
                    <p className="text-xs text-gray-600 mt-1">
                      เริ่มต้นเมื่อ: {new Date(policy.progresses[index].startedAt).toLocaleDateString()}
                    </p>
                  )}
                  {stepStatus === 'current' && (
                    <p className="text-xs text-blue-600 mt-1">
                      กำลังดำเนินการ
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyProgressModal;