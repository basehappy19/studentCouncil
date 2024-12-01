'use client'

import { ActionCheckInRequest } from "@/app/functions/CheckIn";
import { StatusRequest } from "@/app/interfaces/CheckIn/CheckIn"; 
import { Response } from "@/app/interfaces/Response";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export const ApprovedButton = ({ handleSubmit }: { handleSubmit: (status: StatusRequest) => void }) => {
    return (
        <Button
            onClick={() => handleSubmit('APPROVED')} 
            className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 w-1/2 font-semibold"
        >
            อนุมัติ
        </Button>
    )
}

export const RejectedButton = ({ handleSubmit }: { handleSubmit: (status: StatusRequest) => void }) => {
    return (
        <Button
            onClick={() => handleSubmit('REJECTED')} 
            className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 w-1/2 font-semibold"
        >
            ปฏิเสธ
        </Button>
    )
}

export default function ActionButtons({requestId}:{requestId: number}) {
    const handleSubmit = async (status : StatusRequest) =>  {
        const res : Response = await ActionCheckInRequest({requestId, status});
        if(res.message && res.type){
            return toast[res.type](res.message);
        }
    }

    return (
        <div className="flex gap-4">
            <ApprovedButton handleSubmit={handleSubmit} />
            <RejectedButton handleSubmit={handleSubmit} />
        </div>
    );
}
