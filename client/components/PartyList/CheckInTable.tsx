import { Attendee, CheckInData, ProcessedData } from "@/app/interfaces/PartyList/checkIn";
import React, { FC, useMemo } from "react";

interface CheckInTableProps {
  checkInData: CheckInData[];
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear() + 543;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const CheckInTable: FC<CheckInTableProps> = ({ checkInData }) => {
  const { uniqueDates, processedData } = useMemo(() => {
    const datesSet = new Set<string>();
    const dataMap = new Map<number, ProcessedData>();

    checkInData.forEach(dayData => {
      const formattedDate = formatDate(new Date(dayData.date));
      datesSet.add(formattedDate);

      dayData.attendees.forEach(attendee => {
        if (!dataMap.has(attendee.userId)) {
          dataMap.set(attendee.userId, {
            user: attendee.userData,
            attendance: new Map()
          });
        }

        const userAttendance = dataMap.get(attendee.userId)!.attendance;
        const checkInType = attendee.checkIns[0]?.type || 0; 
        userAttendance.set(formattedDate, checkInType);
      });
    });

    const sortedDates = Array.from(datesSet).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/').map(Number);
      const [dayB, monthB, yearB] = b.split('/').map(Number);
      return new Date(yearA - 543, monthA - 1, dayA).getTime() - new Date(yearB - 543, monthB - 1, dayB).getTime();
    });

    return {
      uniqueDates: sortedDates,
      processedData: Array.from(dataMap.values())
    };
  }, [checkInData]);

  const getAttendanceDisplay = (type: number) => {
    switch (type) {
      case 1: return { text: "✓", bg: "bg-green-300" };
      case 2: return { text: "ป่วย", bg: "bg-pink-300" };
      case 3: return { text: "ลากิจ", bg: "bg-cyan-300" };
      default: return { text: "-", bg: "bg-orange-300" };
    }
  };

  return (
    <div className="my-10">
      <div className="container mx-auto px-4">
        <div className="bg-custom-white relative overflow-x-auto shadow-md w-full sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3" scope="col">ลำดับ</th>
                <th className="px-6 py-3" scope="col">ชื่อ</th>
                <th className="px-6 py-3" scope="col">ตำแหน่ง</th>
                {uniqueDates.map((date, index) => (
                  <th className="px-6 py-3 text-center" key={index} scope="col">{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.map((item, index) => (
                <tr className="border-b border-custom-light-2" key={index}>
                  <td className="px-6 py-4" scope="row">{index + 1}</td>
                  <td className="px-6 py-4" scope="row">{item.user?.displayName || 'N/A'}</td>
                  <td className="px-6 py-4" scope="row">{item.user?.rolesData[0]?.name || 'N/A'}</td>
                  {uniqueDates.map((date, dateIndex) => {
                    const attendanceType = item.attendance.get(date) || 0;
                    const { text, bg } = getAttendanceDisplay(attendanceType);
                    return (
                      <td className={`px-6 py-4 text-center font-semibold ${bg}`} key={dateIndex}>
                        {text}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckInTable;
