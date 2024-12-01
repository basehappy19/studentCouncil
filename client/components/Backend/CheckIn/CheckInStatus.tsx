import { CheckIn, CheckInType, Request } from '@/app/interfaces/CheckIn/CheckIn';
import { checkInRequestExist, getCheckInStatus } from '@/app/functions/CheckIn';
import { AlarmClockMinus, CalendarCheck, CalendarX2, CircleAlert, ClockAlert, DoorClosed, TentTree } from 'lucide-react';
import CheckInButton from './CheckInButton';
import RequestForgetCheckIn from './RequestForgetCheckIn';

const getStatusConfig = (statusType: CheckInType) => {
  switch (statusType) {
    case "NORMAL":
      return {
        icon: <CalendarCheck width={96} height={96} />,
        color: "text-green-800",
        bgColor: "bg-green-100",
      };
    case "SICK_LEAVE":
      return {
        icon: <CalendarCheck width={96} height={96} />,
        color: "text-blue-800",
        bgColor: "bg-blue-100",
      };
    case "PERSONAL_LEAVE":
      return {
        icon: <CalendarCheck width={96} height={96} />,
        color: "text-purple-800",
        bgColor: "bg-purple-100",
      };
    case "NOT_CHECKED_IN":
      return {
        icon: <CalendarX2 width={96} height={96} />,
        color: "text-yellow-800",
        bgColor: "bg-yellow-100",
      };
    case "ABSENT":
      return {
        icon: <CircleAlert width={96} height={96} />,
        color: "text-red-800",
        bgColor: "bg-red-100",
      };
    case "REQUEST_FOR_CHECK_IN":
      return {
        icon: <ClockAlert width={96} height={96} />,
        color: "text-orange-800",
        bgColor: "bg-orange-100",
      };
    case "FORGOT_TO_CHECK_IN":
      return {
        icon: <AlarmClockMinus width={96} height={96} />,
        color: "text-orange-800",
        bgColor: "bg-orange-100",
      };
    case "HOLIDAY":
      return {
        icon: <TentTree width={96} height={96} />,
        color: "text-pink-800",
        bgColor: "bg-pink-100",
      };
    case "CLOSED_FOR_CHECK_IN":
      return {
        icon: <DoorClosed width={96} height={96} />,
        color: "text-gray-800",
        bgColor: "bg-gray-100",
      };
    default:
      return {
        icon: <CalendarX2 width={96} height={96} />,
        color: "text-gray-800",
        bgColor: "bg-gray-100",
      };
  }
};


const CheckInStatusCard = async () => {
  const status: Omit<CheckIn, 'user'> = await getCheckInStatus()
  const request : Request = await checkInRequestExist()
  
  const { icon, color, bgColor } = getStatusConfig(status.type);

  return (
    <div className={`w-full md:w-1/2 flex-1 md:flex md:items-center md:justify-center p-6 rounded-lg shadow-md transition-all duration-300 ${bgColor}`}>
      <div className="text-center w-full">
        <div className="flex justify-center mb-4">{icon}</div>
        <div>
          <h2 className={`text-2xl font-bold ${color}`}>สถานะการเช็คอิน</h2>
          <p className={`text-lg ${color}`}>
            {status.message}
          </p>
          {status.reason && (
            <p className={`text-lg ${color}`}>
              หมายเหตุ : {status.reason}
            </p>
          )
          }
          {status.attendTime && (
            <p className={`text-sm ${color}`}>
              เช็คอินเมื่อ: {new Date(status.attendTime).toLocaleString('th-TH')}
            </p>
          )}
          {(status.type === 'NOT_CHECKED_IN') && (<CheckInButton />)}
          {(status.type === 'REQUEST_FOR_CHECK_IN' && request !== null) && (<RequestForgetCheckIn />)}
        </div>
      </div>
    </div>
  );
};

export default CheckInStatusCard;