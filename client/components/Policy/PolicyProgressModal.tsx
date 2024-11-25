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

const PolicyProgressModal  = ({
  policy,
  statuses
}: {
  policy: Policy,
  statuses: Status[]
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStepStatus = (stepNumber: number) => {
    if (policy.progresses.length >= stepNumber) {
      return 'completed';
    }
    if (policy.progresses.length === stepNumber - 1) {
      return 'current';
    }
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="text-green-500" />;
      case 'current':
        return <Clock className="text-blue-500" />;
      default:
        return <Circle className="text-gray-300" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className="w-full text-left hover:bg-gray-100 p-2 rounded-lg transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">
            สถานะ: {policy.currentProgress.status.name}
          </span>
          <span
            className="px-2 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: policy.currentProgress.status.color + '20',
              color: policy.currentProgress.status.color
            }}
          >
            ดูรายละเอียด
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            ความคืบหน้านโยบาย
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {statuses.map((status, index) => {
            const stepStatus = getStepStatus(status.step);

            return (
              <div
                key={status.step}
                className={cn(
                  "flex items-center space-x-4 p-4 rounded-lg transition-all duration-300",
                  stepStatus === 'completed' && "bg-green-50",
                  stepStatus === 'current' && "bg-blue-50",
                  stepStatus === 'pending' && "bg-gray-50"
                )}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(stepStatus)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{status.name}</h3>
                  {stepStatus === 'completed' && policy.progresses[index] && (
                    <p className="text-sm text-gray-600 mt-1">
                      เสร็จสิ้นเมื่อ: {new Date(policy.progresses[index].startedAt).toLocaleDateString()}
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

export default PolicyProgressModal ;