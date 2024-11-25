"use client"
import { AddUser, AllUser, RemoveUser, UpdateUser, User } from '../../../functions/User';
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { Label } from '../../../../components/ui/label';
import { AllRole } from '../../../functions/Role';
import { AllAccesses } from '../../../functions/Access';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import UserTable from '../../../../components/DashBoard2/User/UserTable';
import { access, UserData } from '../../../interfaces/User/User';
import { Role } from '../../../interfaces/PartyList/partylist';
import { ToastType } from '../../../types/Other/toast';


const Users = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [accesses, setAccesses] = useState<access[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<UserData>(null);
    const router = useRouter();
    const profileImgSrc = process.env.NEXT_PUBLIC_USER_PROFILE_IMG_FULL_PATH || "";

    const defaultFormValues = {
        username: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        displayName: "",
        Roles: [{ role: "" }],
        accessId: "",
    };

    const { register, control, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: defaultFormValues,
    });

    const resetForm = useCallback(() => {
        reset(defaultFormValues);
        setEditingUser(null);
    }, [reset]);

    const { fields: roleIdFields, append: appendRoleId, remove: removeRole } = useFieldArray({
        control,
        name: "Roles",
        rules: { minLength: 1 }
    });

    const getUsers = async () => {
        try {
            const res = await AllUser();
            setUsers(res);
        } catch (e) {
            console.error(e);
        }
    };

    const getRoles = async () => {
        try {
            const res = await AllRole();
            setRoles(res);
        } catch (e) {
            console.error(e);
        }
    };

    const getAccesses = async () => {
        try {
            const res = await AllAccesses();
            setAccesses(res);
        } catch (e) {
            console.error(e);
        }
    };
    const refreshUsers = useCallback(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
        getRoles();
        getAccesses();
    }, []);

    const showDialog = useCallback((user = null) => {        
        if (user) {
            setEditingUser(user);
            reset({
                ...user,
                password: "",
                confirmPassword: "",
                Roles: user.roleData?.map(role => ({ role: role.id.toString() })) || [],
                accessId: user.accessData?.[0]?.id.toString() || "",
            });
        } else {
            resetForm();
        }
        setIsDialogOpen(true);
    }, [reset, resetForm]);

    const getFilteredRoles = (selectedRoles : string[]) => {        
        return roles.filter(role => !selectedRoles.includes(role.id.toString()));
    };

    const onSubmit = async (values : any) => {

        const formData = new FormData();
        formData.append('username', values.username);
        if (values.password) {
            formData.append('password', values.password);
        }
        formData.append('fullName', values.fullName);
        formData.append('displayName', values.displayName);

        const roles = values.Roles.map(role => role.role);
        formData.append('roles', roles);

        formData.append('accessId', values.accessId);
        const formDataObject = Object.fromEntries(formData);
        formDataObject.roles = formDataObject.roles.split(',').map(Number);
        formDataObject.roleId = formDataObject.roles
        delete formDataObject.roles;
        formDataObject.accessId = Number(formDataObject.accessId);

        if (editingUser) {
            if (!formDataObject.password) {
                delete formDataObject.password;
            }

            await UpdateUser(editingUser.id, formDataObject).then((res) => {
                try {
                    const { message, type } = res;
                    if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                        toast[type as ToastType](message);
                        if(type === 'success') {
                            reset();
                            setIsDialogOpen(false);
                            resetForm();
                        }
                        getUsers();
                        router.refresh();
                    } else {
                        toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    }
                } catch (e) {
                    toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    console.error(e);
                }
            });
        } else {
            await AddUser(formDataObject).then((res) => {
                try {
                    const { message, type } = res;
                    if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                        toast[type as ToastType](message);
                        if(type === 'success') {
                            reset();
                            setIsDialogOpen(false);
                            resetForm();
                        }
                        getUsers();
                        router.refresh();
                    } else {
                        toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    }
                } catch (e) {
                    toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                    console.log(e);
                }
            });
        }
    };

    const handleDelete = async (userId : number) => {
        const userDelete = await User({ id: userId });
        await Swal.fire({
            title: `ต้องการลบผู้ใช้ ${userDelete.username} ใช่หรือไม่`,
            text: 'กรุณากดยืนยัน',
            icon: 'warning',
            confirmButtonText: 'ยืนยัน',
            customClass: {
                confirmButton: 'bg-green-500',
                cancelButton: 'bg-red-500'
            },
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "ยืนยันอีกครั้ง",
                    text: "กรุณากดยืนยันอีกครั้ง",
                    icon: "warning",
                    confirmButtonText: 'ยืนยัน',
                    customClass: {
                        confirmButton: 'bg-green-500',
                        cancelButton: 'bg-red-500'
                    },
                    cancelButtonText: 'ยกเลิก',
                    showCancelButton: true,
                }).then((result)=>{
                    if (result.isConfirmed) {
                        RemoveUser(userId).then((res) => {
                            try {
                                const { message, type } = res;
                                if (message && type) {
                                    toast[type](message);
                                    getUsers();
                                    reset();
                                    router.refresh();
                                } else {
                                    toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                                }
                                getUsers();
                            } catch (e) {
                                toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                                console.log(e);
                            }
                        })
                    }
                });
            }
        });
    };

    return (
        <div>
            <Button onClick={() => showDialog()} className="mb-4">เพิ่มสมาชิก</Button>
            <UserTable users={users} profileImgSrc={profileImgSrc} onEdit={showDialog} onDelete={handleDelete} refreshUsers={refreshUsers} />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="username">ชื่อสมาชิก</Label>
                            <Input
                                id="username"
                                {...register("username", { required: "กรุณาป้อนชื่อสมาชิก" })}
                            />
                            {errors.username && <p className="text-red-600">{errors.username.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password">รหัสผ่าน</Label>
                            <Input
                                type='password'
                                id="password"
                                {...register("password", {
                                    required: !editingUser ? "กรุณาป้อนรหัสผ่าน" : false,
                                })}
                            />
                            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        </div>
                        {!editingUser && (
                            <div>
                                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                                <Input
                                    type='password'
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    {...register("confirmPassword", {
                                        required: !editingUser ? "กรุณายืนยันรหัสผ่าน" : false,
                                        validate: (val: string) => {
                                            if (watch('password') != val && val) {
                                                return "รหัสผ่านไม่ตรงกัน";
                                            }
                                        },
                                    })}
                                />
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="fullName">ชื่อ - นามสกุล</Label>
                            <Input
                                type='text'
                                id="fullName"
                                {...register("fullName", { required: "กรุณากรอกชื่อจริง" })}
                            />
                            {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="displayName">ชื่อที่แสดงผล</Label>
                            <Input
                                type='text'
                                id="displayName"
                                {...register("displayName", { required: "กรุณายืนยันรหัสผ่าน" })}
                            />
                            {errors.displayName && <p className="text-red-600">{errors.displayName.message}</p>}
                        </div>
                        <div>
                            <Label>ตำแหน่ง (อย่างน้อย 1 ตำแหน่ง)</Label>
                            {roleIdFields.map((field, index) => {
                                const selectedRoles = watch("Roles").map(role => role.role);
                                const availableRoles = getFilteredRoles(selectedRoles);
                                return (
                                    <div key={field.id}>
                                        {errors.Roles && errors.Roles[index] && errors.Roles[index].role && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.Roles[index].role.message}
                                            </p>
                                        )}
                                        <div className='flex items-center space-x-2 mt-1'>
                                            <Controller
                                                name={`Roles.${index}.role`}
                                                control={control}
                                                rules={{ required: "กรุณาเลือกตำแหน่ง" }}
                                                render={({ field }) => (
                                                    <>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="เลือกตำแหน่ง">
                                                                    {roles.find(role => (role.id).toString() == field.value)?.name || "เลือกตำแหน่ง"}
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {availableRoles.map((role) => (
                                                                    <SelectItem key={role.id} value={(role.id).toString()}>
                                                                        {role.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </>
                                                )}
                                            />
                                            {index > 0 && (
                                                <div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => removeRole(index)}
                                                        variant="destructive"
                                                        size="icon"
                                                        className="rounded-full"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {roleIdFields.length < roles.length && (
                                <Button
                                    type="button"
                                    onClick={() => appendRoleId({ role: "" })}
                                    variant="outline"
                                    className="mt-2"
                                >
                                    เพิ่มตำแหน่ง
                                </Button>
                            )}
                        </div>
                        <div>
                            <Label>สิทธิ์</Label>
                            <Controller
                                name='accessId'
                                control={control}
                                rules={{ required: "กรุณาเลือกสิทธิ์" }}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="เลือกสิทธิ์">
                                                    {accesses.find(access => (access.id).toString() == field.value)?.title || "เลือกสิทธิ์"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accesses.map((access) => (
                                                    <SelectItem key={access.id} value={(access.id).toString()}>
                                                        {access.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
                                    </>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users;
