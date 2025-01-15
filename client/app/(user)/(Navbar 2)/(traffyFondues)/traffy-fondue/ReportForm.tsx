'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    MapPin,
    MessageCircle,
    Lock,
    Unlock,
    Star,
    Camera,
    AlertCircle,
    Building2,
    DoorOpen
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Location, SubLocation } from '@/app/interfaces/TraffyFondue/Location';

export default function ProblemReportForm({ locations }: { locations: Location[] }) {
    const [formData, setFormData] = useState({
        selectedLocation: "",
        selectedSubLocation: "",
        selectedRoom: "",
        studentId: "",
        isPrivate: false,
    });

    const currentLocation: Location | undefined = locations.find(
        (loc) => loc.name === formData.selectedLocation
    );
    const currentSubLocation: SubLocation | undefined = currentLocation?.subLocations.find(
        (sub) => sub.name === formData.selectedSubLocation
    );

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            selectedLocation: formData.selectedLocation,
            selectedSubLocation: formData.selectedSubLocation,
            selectedRoom: formData.selectedRoom,
            studentId: formData.isPrivate ? null : formData.studentId,
            isPrivate: formData.isPrivate,
        };

        console.log("Submitting form data:", payload);

        // Replace this with your API call
        // Example:
        // fetch('/api/report', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload),
        // })
        //     .then(response => response.json())
        //     .then(data => console.log("Form submitted successfully:", data))
        //     .catch(error => console.error("Error submitting form:", error));
    };

    return (
        <Card className="mb-6 bg-white dark:bg-slate-700">
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
                            <Select onValueChange={(value) => handleInputChange('selectedLocation', value)}>
                                <SelectTrigger className="dark:text-white dark:bg-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                                    <SelectValue placeholder="🏫 เลือกอาคาร" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location.id} value={location.name}>
                                            <span className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                {location.name}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.selectedLocation && currentLocation && currentLocation?.subLocations.length > 0 && (
                            <div className="animate-fadeIn">
                                <label className="text-sm font-medium text-gray-600 dark:text-white mb-2 block">
                                    เลือกสถานที่ใน{formData.selectedLocation}
                                </label>
                                <Select onValueChange={(value) => handleInputChange('selectedSubLocation', value)}>
                                    <SelectTrigger className="dark:text-white dark:bg-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-l-blue-500">
                                        <SelectValue placeholder="📍 เลือกสถานที่ เช่น ห้องน้ำ โรงอาหาร" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentLocation?.subLocations.map((sub) => (
                                            <SelectItem key={sub.id} value={sub.name}>
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
                                    เลือกห้องใน{formData.selectedSubLocation}
                                </label>
                                <Select onValueChange={(value) => handleInputChange('selectedRoom', value)}>
                                    <SelectTrigger className="dark:text-white dark:bg-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border-l-4 border-l-blue-500">
                                        <SelectValue placeholder="🚪 เลือกห้องที่พบปัญหา" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentSubLocation?.rooms.map((room) => (
                                            <SelectItem key={room.id} value={room.name}>
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
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="flex items-center gap-2 text-lg font-semibold dark:text-white text-gray-700">
                                {formData.isPrivate ? (
                                    <Lock className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Unlock className="h-5 w-5 text-purple-500" />
                                )}
                                {formData.isPrivate ? "แจ้งแบบไม่เปิดเผยตัวตน" : "แจ้งแบบเปิดเผยตัวตน"}
                            </h3>
                            <Switch
                                checked={!formData.isPrivate}
                                onCheckedChange={(checked) => handleInputChange('isPrivate', !checked)}
                                className="data-[state=checked]:bg-purple-500"
                            />
                        </div>

                        {!formData.isPrivate && (
                            <div className="pl-7 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="รหัสนักเรียน"
                                        value={formData.studentId}
                                        onChange={(e) => handleInputChange('studentId', e.target.value)}
                                        className="bg-purple-50 hover:bg-purple-100 transition-colors"
                                    />
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
                            className="w-full md:w-auto dark:text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 hover:dark:bg-blue-700"
                        >
                            แจ้งปัญหา
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
