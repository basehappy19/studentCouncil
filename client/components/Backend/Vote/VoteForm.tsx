"use client";
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import VoteDistributionForm from './VoteDistributionForm';

const VoteForm = ({ onSubmit }) => {
    const [filePreviews, setFilePreviews] = useState([]);
    const [fileTitle, setFileTitle] = useState("");
    const [voteDistribution, setVoteDistribution] = useState({
        agree: [],
        disagree: [],
        abstain: [],
        noVote: []
    });

    const defaultFormValues = {
        title: "",
        description: "",
        refer: "",
        date: "",
        documents: [{ title: "", fileName: "", size: "" }],
        agree: [{ id: "" }],
        disagree: [{ id: "" }],
        abstain: [{ id: "" }],
        abstention: [{ id: "" }],
        maxAttendees: "",
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
        defaultValues: defaultFormValues,
    });

    const resetForm = useCallback(() => {
        reset(defaultFormValues);
        setFilePreviews([]);
        setFileTitle("");
    }, [reset]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);        
        const previews = files.map(file => {
            let size = file.size;
            let sizeLabel = '';

            if (size > 1024 * 1024) {
                sizeLabel = (size / (1024 * 1024)).toFixed(2) + ' MB';
            } else {
                sizeLabel = (size / 1024).toFixed(2) + ' KB';
            }

            return {
                title: fileTitle,
                fileName: file.name,
                size: sizeLabel,
                sizeBytes: size,
                file: file
            };
        });

        setFilePreviews(prevPreviews => [...prevPreviews, ...previews]);
        setFileTitle("");
    };

    const handleRemoveFile = (index) => {
        setFilePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    };

    const handleFileNameChange = (index, newTitle) => {
        const updatedPreviews = [...filePreviews];
        updatedPreviews[index].title = newTitle;
        setFilePreviews(updatedPreviews);
    };

    const handleVoteDistributionChange = useCallback((distribution) => {
        setVoteDistribution(distribution);
    }, []);
    
    
    const handleFormSubmit = (values) => {        
        const formData = new FormData();
        formData.append('voteTitle', values.title)
        values.documents = filePreviews.map(file => ({
            title: file.title,
            fileName: file.fileName,
            size: file.sizeBytes,
        }));
        values.documentsFile = filePreviews.map(filePreview => filePreview.file);
        values.agree = voteDistribution.agree.map(item => Number(item.id));
        values.disagree = voteDistribution.disagree.map(item => Number(item.id));
        values.abstain = voteDistribution.abstain.map(item => Number(item.id));
        values.abstention = voteDistribution.noVote.map(item => Number(item.id));
        values.maxAttendees = values.agree.length + values.disagree.length + values.abstain.length + values.abstention.length;
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="title">หัวข้อ *</Label>
                <Input
                    id="title"
                    {...register("title", { required: "กรุณาป้อนหัวข้อการโหวต" })}
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}
            </div>
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="description">รายละเอียด *</Label>
                <Input
                    id="description"
                    {...register("description", { required: "กรุณาระบุรายละเอียดหรือคำอธิบายเพิ่มเติมของการโหวต" })}
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            </div>
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="content">เนื้อหา *</Label>
                <Input
                    id="content"
                    {...register("content", { required: "เนื้อหาหรือประเด็นหลัก" })}
                />
                {errors.content && <p className="text-red-600">{errors.content.message}</p>}
            </div>
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="refer">อ้างอิง</Label>
                <Input
                    id="refer"
                    {...register("refer")}
                />
                {errors.refer && <p className="text-red-600">{errors.refer.message}</p>}
            </div>
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="date">เลือกวันที่</Label>
                <Input
                    id="date"
                    type="date"
                    {...register("date")}
                />
                {errors.date && <p className="text-red-600">{errors.date.message}</p>}
            </div>
            <div>
                <Label className='text-lg text-gray-700 font-semibold' htmlFor="vote">คะแนนการลงมติ</Label>
                <VoteDistributionForm onChange={handleVoteDistributionChange} />
            </div>
            <div>
                <h3 className="text-xl mb-5 font-semibold text-gray-900">เอกสารการประชุม</h3>
                <div className="border rounded-lg">
                    <div className="flex flex-col">
                        <div className="border-b flex gap-2 md:gap-0 justify-normal md:justify-between items-center px-4 py-5">
                            <div className="transition-all ease-in-out duration-300 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-flex icon icon-tabler icons-tabler-outline icon-tabler-upload">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                    <path d="M7 9l5 -5l5 5" />
                                    <path d="M12 4l0 12" />
                                </svg>
                            </div>
                            <div className="transition-all ease-in-out duration-300 font-bold">
                                ชื่อไฟล์
                            </div>
                        </div>
                        <div className="p-4 w-full border-b">
                            <div className="mb-5">
                                <label htmlFor="fileTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อไฟล์</label>
                                <input
                                    type="text"
                                    name="fileTitle"
                                    id="fileTitle"
                                    value={fileTitle}
                                    onChange={(e) => setFileTitle(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    placeholder="เอกสารการประชุม"
                                />
                            </div>
                            {fileTitle && (
                                <div className="flex items-center justify-center mb-5">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></svg>
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">คลิกเพื่ออัปโหลด</span> หรือ ลาก วาง</p>
                                            <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLW, PPTX, ZIP, RAR</p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            name="file"
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}
                            {filePreviews.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">ตัวอย่างไฟล์:</h3>
                                    <div className="flex flex-col gap-2">
                                        {filePreviews.map((file, index) => (
                                            <div key={index} className="w-full bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={file.title}
                                                        onChange={(e) => handleFileNameChange(index, e.target.value)}
                                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2 mb-2"
                                                    />
                                                    <div className="text-sm text-gray-600">{file.size}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(index)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "กำลังบันทึก..." : "ยืนยัน"}
            </Button>
        </form>
    );
};

export default VoteForm;
