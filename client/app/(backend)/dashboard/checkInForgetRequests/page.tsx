import { getForgetCheckInRequests } from '@/app/functions/CheckIn';
import { Request, RequestData, StatusRequest } from '@/app/interfaces/CheckIn/CheckIn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ActionButtons from './ActionButtons';

export const dynamic = 'force-dynamic'
const RequestForgetCheckIn = async () => {
    const requests: RequestData = await getForgetCheckInRequests();

    const renderStatusBadge = (status: StatusRequest) => {
        switch (status) {
            case 'PENDING':
                return <Badge color="orange">รอยืนยัน</Badge>;
            case 'APPROVED':
                return <Badge color="green">อนุมัติ</Badge>;
            case 'REJECTED':
                return <Badge color="red">ปฏิเสธ</Badge>;
            default:
                return <Badge color="gray">ไม่ทราบ</Badge>;
        }
    };

    const renderRequestCard = (request: Request) => (
        <Card key={request.id} className="w-full max-w-sm mx-auto mb-5 p-4">
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH}${request.user.partyList.profile_image_128x128}`} alt={request.user.partyList.fullName} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">{request.user.fullName}</h3>
                    <p className="text-sm text-gray-700">{request.user.partyList.nickName}</p>
                    <div className="flex flex-wrap gap-2">
                        {request.user.partyList.roles.map((role) => (
                            <span key={role.role.id} className="text-blue-800 rounded-full text-sm">
                                {role.role.name}
                            </span>
                        ))
                        }
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                <div>
                    <strong>ยื่นคำขอเมื่อ : </strong>
                    {new Date(request.timeRequested).toLocaleString()}
                </div>
                <div className='flex items-center gap-1'>
                    <strong>สถานะ :</strong>
                    {renderStatusBadge(request.status)}
                </div>
            </div>

            <div className="mt-4 flex space-x-3">
                <ActionButtons requestId={request.id} />
            </div>
        </Card>
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">คำขอลืมเช็คอิน ({requests.count.toString()})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.requests.map((request) => renderRequestCard(request))}
            </div>
        </div>
    );
};

export default RequestForgetCheckIn;
