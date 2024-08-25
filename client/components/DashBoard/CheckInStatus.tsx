import React from 'react'
const CheckinStatus = ({ status }) => {    
    const getStatusInfo = () => {
      switch (status.type) {
        case 'CheckedIn':
          return {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="inline-flex w-16 h-16 text-green-500 icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>,
            message: `คุณได้เช็คอินแล้ววันนี้ ${new Date(status.data.attendTime).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "2-digit" })} เวลา ${new Date(status.data.attendTime).toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' })}`,
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
          };
        case 'CheckInClosed':
          return {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="inline-flex w-16 h-16 text-red-500 icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>,
            message: 'ปิดให้เช็คอินแล้ว',
            bgColor: 'bg-red-100',
            textColor: 'text-red-800'
          };
        case 'NotChecked':
          return {
            icon: <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="inline-flex w-16 h-16 text-yellow-500 icon icon-tabler icons-tabler-outline icon-tabler-alarm"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 10l0 3l2 0" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /></svg>,
            message: 'ยังไม่เช็คอินวันนี้',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-800'
          };
        default:
          return {
            icon: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="inline-flex w-16 h-16 text-gray-500 icon icon-tabler icons-tabler-outline icon-tabler-question-mark"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><path d="M12 19l0 .01" /></svg>,
            message: 'ไม่พบข้อมูลสถานะ',
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-800'
          };
      }
    };
  
    const { icon, message, bgColor, textColor } = getStatusInfo();
  
    return (
      <div className={`w-full md:1/2 flex-1 md:flex md:items-center md:justify-center p-6 rounded-lg shadow-md ${bgColor} transition-all duration-300 hover:shadow-lg`}>
        <div className="md:text-center">
          {icon}
          <div>
            <h2 className={`text-2xl font-bold ${textColor}`}>สถานะการเช็คอิน</h2>
            <p className={`text-lg ${textColor}`}>{message}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CheckinStatus;