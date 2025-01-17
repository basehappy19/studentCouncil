'use client'
import { Location, Problem } from '@/app/interfaces/TraffyFondue/Location'
import React, { useState } from 'react'
import LocationCard from './LocationCard'
import ProblemReportForm from './ReportForm'
import RecentProblemCard from './RecentProblemCard'
import SearchBar from './SearchBar'

interface FormErrors {
    selectedLocation?: string;
    issueTitle?: string;
    issueDescription?: string;
    studentId?: string;
}

const Client = ({ locations, problems }: { locations: Location[], problems: Problem[] }) => {

    const [formData, setFormData] = useState({
        selectedLocation: undefined,
        selectedSubLocation: undefined,
        selectedRoom: undefined,
        studentId: "",
        isPrivate: false,
        issueTitle: "",
        issueDescription: "",
        issueImages: [],
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.selectedLocation) {
            newErrors.selectedLocation = 'กรุณาเลือกสถานที่';
        }

        if (!formData.issueTitle || formData.issueTitle.trim() === '') {
            newErrors.issueTitle = 'กรุณากรอกหัวข้อปัญหา';
        }

        if (!formData.issueDescription || formData.issueDescription.trim() === '') {
            newErrors.issueDescription = 'กรุณากรอกรายละเอียดปัญหา';
        }

        if (!formData.isPrivate && (!formData.studentId || formData.studentId.trim() === '')) {
            newErrors.studentId = 'กรุณากรอกรหัสนักเรียน';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleInputChange = (field: string, value: any) => {
        setErrors(prev => ({ ...prev, [field]: undefined }));
        setFormData((prev) => ({ ...prev, [field]: value }));
    };



    const handleLocationSelect = (locationId: number) => {
        handleInputChange('selectedLocation', locationId);
    };


    return (
        <>
            <div className="mb-6">
                <SearchBar placeholder='ค้นหาสถานที่...' searchKey='location' />
            </div>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {locations.map((location) => (
                    <LocationCard key={location.id} location={location} onSelect={handleLocationSelect} />
                ))}
            </div>

            {/* Report Form */}
            <ProblemReportForm errors={errors} validatePass={validateForm} locations={locations} formData={formData} onHandleInputChange={handleInputChange} />

            {/* Recent Problems */}
            <div className="mb-6">
                <SearchBar placeholder='ค้นหาปัญหา...' searchKey='report' />
            </div>
            <RecentProblemCard problems={problems} />
        </>
    )
}

export default Client