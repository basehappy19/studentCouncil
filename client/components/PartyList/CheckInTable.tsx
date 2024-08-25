import React, { FC, useMemo } from "react";

interface CheckIn {
  attendTime: string;
  type: number;
  motive: string;
}

interface Attendee {
  userId: number;
  checkIns: CheckIn[];
  userData: {
    displayName: string;
    profilePicture: string;
    rolesData: { roleTitle: string }[];
  };
}

interface CheckInData {
  date: string;
  attendees: Attendee[];
}

interface Props {
  checkInData: CheckInData[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear() + 543;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const CheckInTable: FC<Props> = ({ checkInData }) => {
  const { uniqueDates, processedData } = useMemo(() => {
    const datesSet = new Set<string>();
    const dataMap = new Map<number, { user: Attendee['userData'], attendance: Map<string, number> }>();

    checkInData.forEach(dayData => {
      const formattedDate = formatDate(dayData.date);
      datesSet.add(formattedDate);

      dayData.attendees.forEach(attendee => {
        if (!dataMap.has(attendee.userId)) {
          dataMap.set(attendee.userId, {
            user: attendee.userData,
            attendance: new Map()
          });
        }

        const userAttendance = dataMap.get(attendee.userId)!.attendance;
        const checkInType = attendee.checkIns[0]?.type || 0; // Assuming one check-in per day
        userAttendance.set(formattedDate, checkInType);
      });
    });

    const sortedDates = Array.from(datesSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

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
                  <td className="px-6 py-4" scope="row">{item.user.displayName}</td>
                  <td className="px-6 py-4" scope="row">{item.user.rolesData[0].roleTitle}</td>
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