'use client'
import { useState } from 'react';
import { CheckInType } from '@/app/interfaces/CheckIn/CheckIn';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CheckIn } from '@/app/functions/CheckIn';
import { Response } from '@/app/interfaces/Response';


const CheckInButton = () => {
  const [type, setType] = useState<CheckInType>("NORMAL");
  const [reason, setReason] = useState<string | null>(null);
  const [reasonCheckNULL, setReasonCheckNULL] = useState<boolean>(false);

  const handleTypeChange = (type: CheckInType) => {
    setType(type);
    if (type !== "PERSONAL_LEAVE") {
      setReason(null);
    }
  };

  const handleCheckIn = async (type: CheckInType, reason: string | null) => {
    if (type === "PERSONAL_LEAVE" && (reason === null || reason === '')) {
      setReasonCheckNULL(true)
      return toast.error('กรุณาระบุเหตุผลลากิจ');
    }
    const res : Response = await CheckIn({type: type, reason: reason});

    if(res.type && res.message){
      return toast[res.type](res.message);
    }
  };

  return (
    <div className="mt-3 w-full md:flex md:items-center md:justify-center p-6 rounded-lg shadow-md transition-all duration-300 bg-gray-100">
      <div className="md:text-center w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">เลือกสถานะการเช็คอิน</h2>

        <div className="flex justify-center items-center mb-4 space-x-4">
          <button
            onClick={() => handleTypeChange("NORMAL")}
            className={`w-1/3 p-4 rounded-lg ${type === "NORMAL" ? "bg-green-500 text-white" : "bg-green-100 text-green-800"}`}
          >
            <span>มาปกติ</span>
          </button>
          <button
            onClick={() => handleTypeChange("PERSONAL_LEAVE")}
            className={`w-1/3 p-4 rounded-lg ${type === "PERSONAL_LEAVE" ? "bg-purple-500 text-white" : "bg-purple-100 text-purple-800"}`}
          >
            <span>ลากิจ</span>
          </button>
          <button
            onClick={() => handleTypeChange("SICK_LEAVE")}
            className={`w-1/3 p-4 rounded-lg ${type === "SICK_LEAVE" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800"}`}
          >
            <span>ลาป่วย</span>
          </button>
        </div>

        {type === "PERSONAL_LEAVE" && (
          <div className="mb-4">
            <textarea
              placeholder="กรุณากรอกเหตุผล"
              value={reason || ''}
              onChange={(e) => {
                setReason(e.target.value);
                setReasonCheckNULL(false);
              }}
              className={`w-full p-2 border ${reasonCheckNULL ? 'border-red-300' : 'border-gray-300'} rounded-md`}
            />
          </div>
        )}

        {/* ปุ่มเช็คอิน */}
        <div className="flex justify-center">
          <Button
            onClick={() => handleCheckIn(type, reason)}
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
          >
            เช็คอิน
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInButton;
