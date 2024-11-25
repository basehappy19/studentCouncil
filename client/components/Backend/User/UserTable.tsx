import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Button } from "../../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Camera, UserRoundCheckIcon } from "lucide-react"
import { UpdateProfile } from '../../../app/functions/User';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const UserTable = ({ users, profileImgSrc, onEdit, onDelete, refreshUsers }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();
  const handleProfileClick = (userId) => {
    setSelectedUser(userId);
    setOpenDialog(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && selectedUser) {
      const formData = new FormData();
      formData.append('profileImage', file);
      await UpdateProfile(selectedUser, formData).then((res) => {
        try {
          const { message, type } = res;
          if (message && type) {
            toast[type](message);
            refreshUsers();
            router.refresh();
          } else {
            toast.error("เซิฟเวอร์ไม่ตอบสนอง");
          }
        } catch (e) {
          toast.error("เซิฟเวอร์ไม่ตอบสนอง");
          console.log(e);
        }
      });
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>โปรไฟล์</TableHead>
            <TableHead>ชื่อสมาชิก</TableHead>
            <TableHead>ชื่อ - นามสกุล</TableHead>
            <TableHead>ชื่อที่แสดงผล</TableHead>
            <TableHead>ตำแหน่ง</TableHead>
            <TableHead>สิทธิ์</TableHead>
            <TableHead>การทำงาน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="relative group cursor-pointer" onClick={() => handleProfileClick(user.id)}>
                  <Avatar className="cursor-pointer relative overflow-hidden">
                    <AvatarImage src={profileImgSrc + user.profilePicture} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"> {/* Ensure this has a higher z-index */}
                    <Camera className="text-white" size={20} />
                  </div>
                </div>
              </TableCell>

              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>
                {user.roleData && user.roleData.map((role) => (
                  <span key={role.id} className="text-blue-800 text-sm mr-2">
                    {role.name}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                {user.accessData && user.accessData.map((access) => (
                  <span key={access.id} className="text-blue-800 text-sm mr-2">
                    {access.title}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                <Button onClick={() => onEdit(user)} variant="outline" className="mr-2">แก้ไข</Button>
                <Button onClick={() => onDelete(user.id)} variant="destructive">ลบ</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>อัปโหลดรูปโปรไฟล์ใหม่</DialogTitle>
          </DialogHeader>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTable;