import React from 'react';
import { ArrowLeft, CalendarDays, Calendar as CalendarIcon, Clock, ExternalLink, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Announcement } from '@/app/interfaces/Announcement/Announcement';
import { GetAnnouncement } from '@/app/functions/Announcement';
import ImageGallery from '../../announces/Images';
import ShareButton from './ShareButton';

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const id = params.id
    const announcement: Announcement = await GetAnnouncement({ id });

    return {
        title: `${announcement.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            `ประกาศ ${announcement.title} ${announcement.content} เมื่อ : ${announcement.timestamp}`,
        openGraph: {
            title: `${announcement.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
            description:
                `ประกาศ ${announcement.title} ${announcement.content} เมื่อ : ${announcement.timestamp}`,
        },
    };
}

const AnnouncementDetail = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params
    const id = params.id
    const announcement: Announcement = await GetAnnouncement({ id });

    return (
        <div className={`min-h-screen
            dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
            bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50`}>
            <div className="container mx-auto px-4 py-6 space-y-6">
                {/* Header Section */}
                <div className="space-y-4">
                    <Link href={`/announces`}>
                        <Button
                            variant="ghost"
                            className="inline-flex items-center gap-2 hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            กลับไปหน้าประกาศ
                        </Button>
                    </Link>

                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {announcement.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                ประกาศเมื่อ: {announcement.timestamp}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {announcement.newAnnouncement && (
                                <Badge variant="secondary" className="bg-red-500 text-white hover:bg-red-500 dark:bg-red-600">
                                    ประกาศใหม่
                                </Badge>
                            )}
                            <ShareButton announcement={announcement} />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <Card className="dark:bg-slate-800">
                    <CardContent className="pt-6 space-y-8">
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">{announcement.content}</p>
                        </div>

                        {/* Schedule Section */}
                        {announcement.schedules && announcement.schedules.length > 0 && (
                            <Card className="dark:bg-slate-900">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-5 w-5 text-blue-500" />
                                        <CardTitle>กำหนดการ</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ScrollArea className="pr-4">
                                        <div className="space-y-4">
                                            {announcement.schedules.map((schedule, index) => (
                                                <div key={index} className="relative">
                                                    {index !== 0 && (
                                                        <Separator className="absolute left-[27px] -top-4 h-4 w-[2px]" />
                                                    )}
                                                    <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20">
                                                            <CalendarIcon className="h-4 w-4 text-blue-500" />
                                                        </div>
                                                        <div className="space-y-2 flex-1">
                                                            <div className="flex flex-wrap gap-2 items-center">
                                                                <p className="text-sm font-medium">
                                                                    {schedule.schedule.date}
                                                                </p>
                                                                <div className="flex items-center text-sm text-muted-foreground">
                                                                    <Clock className="mr-1 h-3 w-3" />
                                                                    {schedule.schedule.time}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm">{schedule.schedule.activity}</p>
                                                            {schedule.schedule.location && (
                                                                <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                                                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                                                    <span>{schedule.schedule.location}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        )}

                        {/* Images Section */}
                        {announcement.images.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">รูปภาพประกอบ</h2>
                                <ImageGallery images={announcement.images} />
                            </div>
                        )}

                        {/* Iframes Section */}
                        {announcement.iframes && announcement.iframes.map((iframe) => (
                            <Card key={iframe.id} className="overflow-hidden dark:bg-slate-900">
                                <CardHeader>
                                    <CardTitle className="text-lg">{iframe.iframe.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <iframe
                                        src={iframe.iframe.url}
                                        className="w-full h-[400px] md:h-[600px] border-0"
                                        title={iframe.iframe.title}
                                    />
                                </CardContent>
                            </Card>
                        ))}

                        {/* Links Section */}
                        {announcement.links && announcement.links.length > 0 && (
                            <div className="flex flex-wrap gap-4">
                                {announcement.links.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                                    >
                                        {link.link.title}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AnnouncementDetail;