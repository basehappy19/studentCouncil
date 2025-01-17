'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    MapPin,
    MessageCircle,
    Star,
    Building2,
    DoorOpen,
    Stars,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Location, SubLocation } from '@/app/interfaces/TraffyFondue/Location';
import { Textarea } from '@/components/ui/textarea';
import ImageUploads from './ImageUploads';
import { ReportProblem } from '@/app/functions/TraffyFondue';
import { Response } from '@/app/interfaces/Response';
import { toast } from 'react-toastify';

interface FormDta {
    selectedLocation: string | undefined,
    selectedSubLocation: string | undefined,
    selectedRoom: string | undefined,
    studentId: string | null;
    isPrivate: boolean | undefined,
    issueTitle: string,
    issueDescription: string,
    issueImages: Array<{
        file: File;
        preview: string;
    }>;
}
interface FormErrors {
    selectedLocation?: string;
    issueTitle?: string;
    issueDescription?: string;
    studentId?: string;
}

const initialFormData: FormDta = {
    selectedLocation: undefined,
    selectedSubLocation: undefined,
    selectedRoom: undefined,
    studentId: null,
    isPrivate: undefined,
    issueTitle: '',
    issueDescription: '',
    issueImages: []
};

export default function ProblemReportForm({ errors, locations, formData, onHandleInputChange, validatePass }: { errors: FormErrors, locations: Location[], formData: FormDta, onHandleInputChange: (field: string, value: any) => void, validatePass: () => boolean; }) {

    const selectedLocation = formData.selectedLocation ? formData.selectedLocation : "";
    const currentLocation: Location | undefined = locations.find(
        (loc) => loc.id === Number(selectedLocation)
    );

    const selectedSubLocation = formData.selectedSubLocation ? formData.selectedSubLocation : "";
    const currentSubLocation: SubLocation | undefined = currentLocation?.subLocations.find(
        (sub) => sub.id === Number(selectedSubLocation)
    );

    
    const selectedRoom = formData.selectedRoom ? formData.selectedRoom : "";

    const resetForm = () => {
        Object.keys(initialFormData).forEach((field) => {
            onHandleInputChange(field, initialFormData[field as keyof FormDta]);
        });
    };

    const handleSubmit = async () => {
        if (!validatePass()) {
            toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { position: 'bottom-right' });
            return;
        }
        const payload = new FormData();
        payload.append("locationId", selectedLocation);
        payload.append("subLocationId", selectedSubLocation);
        payload.append("roomId", selectedRoom);
        payload.append("studentId", formData.isPrivate ? "" : formData.studentId || "");
        payload.append("issueTitle", formData.issueTitle);
        payload.append("issueDescription", formData.issueDescription);

        formData.issueImages.forEach((image) => {
            payload.append("images", image.file);
        });

        try {
            const res: Response = await ReportProblem({ formData: payload });
            if (res.message && res.type) {
                toast[res.type](res.message, { position: `bottom-right` });
                if (res.type === 'success') {
                    resetForm();
                }
            }
        } catch (error) {
            console.error("Failed to submit report:", error);
            toast.error("ไม่สามารถส่งรายงานได้ กรุณาลองใหม่อีกครั้ง", { position: `bottom-right` });
        }
    };

    return (
        <Card id='reportForm' className="mb-6 bg-white dark:bg-slate-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-pink-400 dark:text-purple-400">
                    <MessageCircle className="h-6 w-6" />
                    มาช่วยกันแจ้งปัญหาให้โรงเรียนดีขึ้นกันเถอะ! 🌟
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="flex items-center gap-2 dark:text-white text-lg font-semibold text-gray-700">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        บอกเราหน่อยว่าปัญหาอยู่ตรงไหน?
                    </h3>
                    <div className="space-y-4 pl-7">
                        <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-white mb-2 block">
                                เลือกอาคาร
                            </label>
                            <Select
                                value={formData.selectedLocation?.toString() || ""}
                                onValueChange={(value) => onHandleInputChange('selectedLocation', parseInt(value))}
                            >
                                <SelectTrigger className="dark:text-white dark:bg-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                                    <SelectValue placeholder="🏫 เลือกอาคาร" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location.id} value={location.id.toString()}>
                                            <span className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                {location.name}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.selectedLocation && (
                                <p className="text-red-500 text-sm mt-1">{errors.selectedLocation}</p>
                            )}
                        </div>

                        {formData.selectedLocation && currentLocation && currentLocation?.subLocations.length > 0 && (
                            <div className="animate-fadeIn">
                                <label className="text-sm font-medium text-gray-600 dark:text-white mb-2 block">
                                    เลือกสถานที่ใน{formData.selectedLocation && locations.find((location) => location.id.toString() === formData.selectedLocation)?.name}
                                </label>
                                <Select
                                    value={formData.selectedSubLocation?.toString() || ""}
                                    onValueChange={(value) => onHandleInputChange('selectedSubLocation', parseInt(value))}
                                >
                                    <SelectTrigger className="dark:text-white dark:bg-blue-400 bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-l-blue-500">
                                        <SelectValue placeholder="📍 เลือกสถานที่ เช่น ห้องน้ำ โรงอาหาร" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentLocation?.subLocations.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.id.toString()}>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {sub.name}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {formData.selectedSubLocation && currentSubLocation && currentSubLocation?.rooms.length > 0 && (
                            <div className="animate-fadeIn">
                                <label className="text-sm font-medium text-gray-600 dark:text-white mb-2 block">
                                    เลือกห้องใน{currentLocation?.subLocations.find(
                                        (sub) => sub.id.toString() === formData.selectedSubLocation
                                    )?.name}
                                </label>
                                <Select
                                    value={formData.selectedRoom?.toString() || ""}
                                    onValueChange={(value) => onHandleInputChange('selectedRoom', parseInt(value))}
                                >
                                    <SelectTrigger className="dark:text-white dark:bg-blue-400 bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-l-blue-500">
                                        <SelectValue placeholder="🚪 เลือกห้องที่พบปัญหา" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentSubLocation.rooms.map((room) => (
                                            <SelectItem key={room.id} value={room.id.toString()}>
                                                <span className="flex items-center gap-2">
                                                    <DoorOpen className="h-4 w-4" />
                                                    {room.name}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <Separator className='dark:bg-white' />
                    <div className="space-y-4 pl-7">
                        <Input
                            value={formData.issueTitle}
                            onChange={(e) => onHandleInputChange("issueTitle", e.target.value)}
                            placeholder="เขียนหัวข้อปัญหาสั้นๆ เช่น 'ก๊อกน้ำรั่ว' 'หลอดไฟดับ'"
                            className="bg-orange-50 hover:bg-orange-100 transition-colors dark:text-black"
                        />
                        {errors.issueTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.issueTitle}</p>
                        )}
                        <Textarea
                            value={formData.issueDescription}
                            onChange={(e) => onHandleInputChange("issueDescription", e.target.value)}
                            placeholder="อธิบายรายละเอียดเพิ่มเติม เช่น 'ก๊อกน้ำอ่างล้างมือตัวที่ 2 มีน้ำหยดตลอดเวลา'"
                            className="bg-orange-50 hover:bg-orange-100 transition-colors dark:text-black"
                        />
                        {errors.issueDescription && (
                            <p className="text-red-500 text-sm mt-1">{errors.issueDescription}</p>
                        )}
                        <ImageUploads images={formData.issueImages}
                            onChange={(newImages) => onHandleInputChange("issueImages", newImages)} />
                    </div>

                    <Separator />
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="flex items-center gap-2 text-lg font-semibold dark:text-white text-gray-700">
                                {formData.isPrivate ? (
                                    <Star className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Stars className="h-5 w-5 text-purple-500" />
                                )}
                                {formData.isPrivate ? "ไม่รับคะแนนเพิ่ม" : "รับคะแนนฟรี 5 คะแนน"}
                            </h3>
                            <Switch
                                checked={!formData.isPrivate}
                                onCheckedChange={(checked) => onHandleInputChange('isPrivate', !checked)}
                                className="data-[state=checked]:bg-purple-500"
                            />
                        </div>

                        {!formData.isPrivate && (
                            <div className="pl-7 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="รหัสนักเรียน"
                                        value={
                                            formData.studentId !== null && formData.studentId !== undefined
                                                ? formData.studentId.toString()
                                                : ""
                                        }
                                        onChange={(e) => onHandleInputChange('studentId', e.target.value)}
                                        className="bg-purple-50 hover:bg-purple-100 transition-colors"
                                    />
                                    {errors.studentId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
                                    )}
                                    <div className="flex text-nowrap items-center gap-1 dark:text-purple-300 text-purple-600">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="text-sm font-medium">รับ 5 คะแนน!</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={handleSubmit}
                            className="w-full dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 hover:dark:bg-blue-700"
                        >
                            แจ้งปัญหา
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}