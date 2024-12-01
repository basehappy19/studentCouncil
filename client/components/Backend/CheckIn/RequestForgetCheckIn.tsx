'use client'
import { useState } from 'react';
import { CheckInType } from '@/app/interfaces/CheckIn/CheckIn';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { CheckIn } from '@/app/functions/CheckIn';
import { Response } from '@/app/interfaces/Response';


const RequestForgetCheckIn = () => {
  const [type, setType] = useState<CheckInType>("REQUEST_FOR_CHECK_IN");

  const handleRequest = async (type: CheckInType) => {
    setType(type);
    const res: Response = await CheckIn({ type: type, reason: null });

    if (res.type && res.message) {
      return toast[res.type](res.message);
    }
  };

  return (
    <div className="mt-3 w-full md:flex md:items-center md:justify-center p-6 rounded-lg shadow-md transition-all duration-300 bg-gray-100">
      <div className="md:text-center w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">ยื่นคำขอ ลืมเช็คอิน</h2>

        <div className="flex justify-center">
          <Button
            onClick={() => handleRequest(type)}
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
          >
            ยื่นคำขอ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestForgetCheckIn;
