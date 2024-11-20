import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIns } from "@/app/interfaces/CheckIn/CheckIn";
import SearchBar from '@/app/(user)/(Navbar 2)/(partyLists)/partyList/tracks/SearchBar';

const CheckInTrackingTable = ({ checkIns }: { checkIns: CheckIns }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          การติดตามการเข้าทำงาน
        </CardTitle>
        <CardDescription>
          ภาพรวมการเข้าทำงานของสภานักเรียน
        </CardDescription>
        <SearchBar />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>ตำแหน่ง</TableHead>
              {checkIns.days.map((day) => (
                <TableHead key={day.id} className="text-center">
                  {new Date(day.dateTime).toLocaleDateString('th-TH', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short'
                  })}
                </TableHead>
              ))}

            </TableRow>
          </TableHeader>
          <TableBody>
            {checkIns.partyLists.map((partyMember, index) => (
              <TableRow key={partyMember.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + partyMember.profile_image_128x128}
                        alt={partyMember.nickName}
                      />
                      <AvatarFallback>
                        {partyMember.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{partyMember.nickName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {partyMember.roles.map(role => role.role.name).join(', ')}
                </TableCell>
                {checkIns.days.map((day) => {
                  const dayCheckIn = day.checkIns.find(
                    (checkIn) => checkIn.user.partyList.id === partyMember.id
                  );

                  return (
                    <TableCell key={day.id} className="text-center">
                      {dayCheckIn ? (
                        <Badge
                          variant="outline"
                          className={`
                            ${dayCheckIn.type === 'NORMAL' ? 'bg-green-100 text-green-800' :
                              dayCheckIn.type === 'SICK_LEAVE' ? 'bg-yellow-100 text-yellow-800' :
                                dayCheckIn.type === 'PERSONAL_LEAVE' ? 'bg-blue-100 text-blue-800' :
                                  dayCheckIn.type === 'ABSENT' ? 'bg-red-100 text-red-800' :
                                    dayCheckIn.type === 'FORGOT_TO_CHECK_IN' ? 'bg-orange-100 text-orange-800' :
                                      dayCheckIn.type === 'HOLIDAY' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'}
                          `}
                        >
                          {dayCheckIn.type === 'NORMAL' ? 'มา' :
                            dayCheckIn.type === 'SICK_LEAVE' ? 'ลา (ป่วย)' :
                              dayCheckIn.type === 'PERSONAL_LEAVE' ? 'ลา (กิจ)' :
                                dayCheckIn.type === 'ABSENT' ? 'ขาด' :
                                  dayCheckIn.type === 'FORGOT_TO_CHECK_IN' ? 'มา (ลืมเช็คอิน)' :
                                    dayCheckIn.type === 'HOLIDAY' ? 'วันหยุด' :
                                      'ยังไม่เช็คอิน'}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">-</Badge>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CheckInTrackingTable;