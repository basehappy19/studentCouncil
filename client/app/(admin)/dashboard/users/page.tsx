"use client"
import { AddUser, AllUser } from '@/app/functions/User';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    username: z.string().min(1, { message: "กรุณากรอกชื่อสมาชิก" }),
    password: z.string().min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
    confirmPassword: z.string().min(1, { message: "กรุณายืนยันรหัสผ่าน" }),
    fullName: z.string().min(1, { message: "กรุณากรอกชื่อ - นามสกุล" }),
    displayName: z.string().min(1, { message: "กรุณากรอกชื่อที่แสดงผล" }),
    roleId: z.string().min(1, { message: "กรุณาเลือกตำแหน่ง" }),
    accessId: z.number().min(1, { message: "กรุณากรอกสิทธิ์" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
});

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            displayName: "",
            roleId: "",
            accessId: "",
        },
    });

    const getUsers = async () => {
        try {
            const res = await AllUser();
            setUsers(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const showDialog = (user = null) => {
        setEditingUser(user);
        if (user) {
            form.reset({
                ...user,
                password: "",
                confirmPassword: "",
            });
        } else {
            form.reset();
        }
        setIsDialogOpen(true);
    };

    const onSubmit = async (values) => {
        const {
            username,
            password,
            fullName,
            displayName,
            roleId,
        } = values;
        const accessId = Number(values.accessId);
        try {
            if (editingUser) {
                const updatedUsers = users.map(user =>
                    user.id === editingUser.id
                        ? { ...user, username, password, fullName, displayName, roleId, accessId }
                        : user
                );
                getUsers();
            } else {
                const newUser = {
                    username,
                    password,
                    fullName,
                    displayName,
                    roleId,
                    accessId,
                };
                AddUser(newUser);
                getUsers();
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleDelete = (userId) => {
        getUsers();
    };

return (
    <div>
        <Button onClick={() => showDialog()} className="mb-4">เพิ่มสมาชิก</Button>
        <Table>
            <TableHeader>
                <TableRow>
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
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.displayName}</TableCell>
                        <TableCell>
                            {user.roleData &&
                                user.roleData.map((role) => (
                                    <span key={role.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {role.name}
                                    </span>
                                ))
                            }
                        </TableCell>
                        <TableCell>{user.accessData[0].title}</TableCell>
                        <TableCell>
                            <Button onClick={() => showDialog(user)} variant="outline" className="mr-2">Edit</Button>
                            <Button onClick={() => handleDelete(user.id)} variant="destructive">Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingUser ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อสมาชิก</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รหัสผ่าน</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อ - นามสกุล</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อที่แสดงผล</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ตำแหน่ง</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือก ตำแหน่ง" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accessId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>สิทธิ์</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
)
}

export default Users