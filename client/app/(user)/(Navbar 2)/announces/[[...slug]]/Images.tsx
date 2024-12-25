'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Download, X, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageInterface, Images } from '@/app/interfaces/Announcement/Announcement';

const ImageGallery = ({ images }: { images: Images[] | [] }) => {
    const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null);

    const handleDownload = async (image: ImageInterface) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ANNOUNCES_PATH}${image.path}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = image.path;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2">
                {images.map((image) => (
                    <Card key={image.id} className="group overflow-hidden dark:bg-slate-900">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{image.image.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {image.image.description}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDownload(image.image)}
                                >
                                    <span className="sr-only">ดาวน์โหลดรูปภาพ</span>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 relative aspect-square cursor-pointer group">
                            <div
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center"
                                onClick={() => setSelectedImage(image.image)}
                            >
                                <Maximize2 className="h-6 w-6 text-blue-600 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_ANNOUNCES_PATH}${image.image.path}`}
                                alt={image.image.title}
                                fill
                                className="object-cover"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-screen-lg mx-auto h-auto max-h-[85vh] md:h-[90vh] p-0 rounded-lg shadow-lg">
                    <DialogTitle className="sr-only">
                        {selectedImage ? selectedImage.title : 'รูปภาพ'}
                    </DialogTitle>
                    <div className="relative w-full h-full flex items-center justify-center">
                        

                        {selectedImage && (
                            <>
                                <div className="relative w-full h-[50vh] md:h-[80vh]">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_ANNOUNCES_PATH}${selectedImage.path}`}
                                        alt={selectedImage.title}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute bottom-2 right-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                    onClick={() => selectedImage && handleDownload(selectedImage)}
                                >
                                    <span className="sr-only">ดาวน์โหลด</span>
                                    <Download className="h-4 w-4" />
                                </Button>
                                <div className="hidden md:block absolute bottom-2 left-2 text-black dark:text-white">
                                    <h3 className="font-medium">{selectedImage.title}</h3>
                                    <p className="text-sm text-black/70 dark:text-white/70">
                                        {selectedImage.description}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};


export default ImageGallery;