'use client'
import React, { useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface ImageFile {
    file: File;
    preview: string;
}

interface ImageUploadsProps {
    images: ImageFile[];
    onChange: (newImages: ImageFile[]) => void;
}

const ImageUploads: React.FC<ImageUploadsProps> = ({ images, onChange }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const filesArray = Array.from(files);
        const validFiles = filesArray.filter(file =>
            file.type.startsWith('image/')
        );

        if (validFiles.length > 0) {
            // Create preview URLs for the images
            const newImages: ImageFile[] = validFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            onChange([...images, ...newImages]);
        }

        // Reset input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteImage = (index: number): void => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Camera className="h-4 w-4" />
                    เพิ่มรูปภาพ
                </Button>
                <span className="text-sm text-gray-500">
                    (ถ้ามี)
                </span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
            />

            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploads;