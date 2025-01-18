import { CheckIn, CheckInType, Request } from '@/app/interfaces/CheckIn/CheckIn';
import { checkInRequestExist, getCheckInStatus } from '@/app/functions/CheckIn';
import { AlarmClockMinus, CalendarCheck, CalendarX2, CircleAlert, ClockAlert, DoorClosed, TentTree } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CheckInButton from './CheckInButton';
import RequestForgetCheckIn from './RequestForgetCheckIn';

export const getStatusConfig = (statusType: CheckInType) => {
  const configs = {
    "NORMAL": {
      icon: <CalendarCheck className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-green-800 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      gradientFrom: "from-green-50 dark:from-green-900/40",
      gradientTo: "to-green-100/50 dark:to-green-800/20"
    },
    "SICK_LEAVE": {
      icon: <CalendarCheck className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-blue-800 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      gradientFrom: "from-blue-50 dark:from-blue-900/40",
      gradientTo: "to-blue-100/50 dark:to-blue-800/20"
    },
    "PERSONAL_LEAVE": {
      icon: <CalendarCheck className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-purple-800 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      gradientFrom: "from-purple-50 dark:from-purple-900/40",
      gradientTo: "to-purple-100/50 dark:to-purple-800/20"
    },
    "NOT_CHECKED_IN": {
      icon: <CalendarX2 className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-yellow-800 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      gradientFrom: "from-yellow-50 dark:from-yellow-900/40",
      gradientTo: "to-yellow-100/50 dark:to-yellow-800/20"
    },
    "ABSENT": {
      icon: <CircleAlert className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-red-800 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      gradientFrom: "from-red-50 dark:from-red-900/40",
      gradientTo: "to-red-100/50 dark:to-red-800/20"
    },
    "REQUEST_FOR_CHECK_IN": {
      icon: <ClockAlert className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-orange-800 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      gradientFrom: "from-orange-50 dark:from-orange-900/40",
      gradientTo: "to-orange-100/50 dark:to-orange-800/20"
    },
    "FORGOT_TO_CHECK_IN": {
      icon: <AlarmClockMinus className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-orange-800 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      gradientFrom: "from-orange-50 dark:from-orange-900/40",
      gradientTo: "to-orange-100/50 dark:to-orange-800/20"
    },
    "HOLIDAY": {
      icon: <TentTree className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-pink-800 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      borderColor: "border-pink-200 dark:border-pink-800",
      gradientFrom: "from-pink-50 dark:from-pink-900/40",
      gradientTo: "to-pink-100/50 dark:to-pink-800/20"
    },
    "CLOSED_FOR_CHECK_IN": {
      icon: <DoorClosed className="w-24 h-24 transition-all duration-300 group-hover:scale-110" />,
      color: "text-gray-800 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      borderColor: "border-gray-200 dark:border-gray-800",
      gradientFrom: "from-gray-50 dark:from-gray-900/40",
      gradientTo: "to-gray-100/50 dark:to-gray-800/20"
    }
  };
  
  return configs[statusType] || configs.NOT_CHECKED_IN;
};

const CheckInStatusCard = async () => {
  const status: Omit<CheckIn, 'user'> = await getCheckInStatus();
  const request: Request = await checkInRequestExist();
  
  const config = getStatusConfig(status.type);

  return (
    <Card className={cn(
      "w-full md:w-1/2 flex-1 group",
      "border transition-all duration-300",
      "backdrop-blur-sm shadow-lg",
      config.borderColor,
      "bg-gradient-to-br",
      config.gradientFrom,
      config.gradientTo
    )}>
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          {/* Icon Container */}
          <div className="flex justify-center">
            <div className={cn(
              "p-4 rounded-full",
              config.bgColor,
              "transition-transform duration-300 group-hover:scale-105"
            )}>
              {config.icon}
            </div>
          </div>

          {/* Content Container */}
          <div className="space-y-3">
            <h2 className={cn(
              "text-2xl font-bold",
              config.color,
              "transition-all duration-300"
            )}>
              สถานะการเช็คอิน
            </h2>
            
            <p className={cn(
              "text-lg",
              config.color,
              "transition-all duration-300"
            )}>
              {status.message}
            </p>

            {status.reason && (
              <p className={cn(
                "text-lg",
                config.color,
                "transition-all duration-300"
              )}>
                หมายเหตุ : {status.reason}
              </p>
            )}

            {status.attendTime && (
              <p className={cn(
                "text-sm",
                config.color,
                "transition-all duration-300"
              )}>
                เช็คอินเมื่อ: {new Date(status.attendTime).toLocaleString('th-TH')}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {status.type === 'NOT_CHECKED_IN' && <CheckInButton />}
            {status.type === 'REQUEST_FOR_CHECK_IN' && request && <RequestForgetCheckIn />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInStatusCard;