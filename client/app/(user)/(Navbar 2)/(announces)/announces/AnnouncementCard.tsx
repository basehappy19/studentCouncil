import React from 'react'
import { Separator } from '@/components/ui/separator';
import ImageGallery from './Images';
import { ExternalLink, CalendarDays, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Announcement } from '@/app/interfaces/Announcement/Announcement';
import Link from 'next/link';
import ShareButton from './ShareButton';

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
    return (
        <Card key={announcement.id} className="dark:bg-slate-800">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {announcement.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            ประกาศเมื่อ: {announcement.timestamp}
                        </p>
                    </div>
                    <div className={`flex gap-3`}>
                        {announcement.newAnnouncement && (
                            <Badge variant="secondary" className="shrink-0 bg-red-500 text-white dark:bg-red-600">
                                ประกาศใหม่
                            </Badge>
                        )}
                        <ShareButton announcement={announcement} />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-lg text-foreground">{announcement.content}</p>

                {/* Schedule table */}
                {announcement.schedules && announcement.schedules.length > 0 && (
                    <Card className="dark:bg-slate-900">
                        <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2">
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
                                                <Separator className="absolute left-[27px] -top-4 h-4 w-[2px] bg-black dark:bg-white" />
                                            )}
                                            <div className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20">
                                                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                                                </div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex flex-wrap gap-2 items-center">
                                                        <p className="text-sm font-medium">{schedule.schedule.date}</p>
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

                {/* Images grid */}
                {announcement.images && <ImageGallery images={announcement.images} />}

                {/* Iframes */}
                {announcement.iframes && announcement.iframes.map((iframe) => (
                    <Card key={iframe.id} className="overflow-hidden dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle className="text-lg">{iframe.iframe.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <iframe
                                src={iframe.iframe.url}
                                className="w-full h-[400px] border-0"
                                title={iframe.iframe.title}
                            />
                        </CardContent>
                    </Card>
                ))}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                    <Button
                        variant="default"
                        asChild
                        className="inline-flex items-center bg-pink-500 dark:bg-pink-600 hover:bg-pink-600 text-white dark:text-white"
                    >
                        <Link href={`/announce/${announcement.id}`} rel="noopener noreferrer">
                            ดูรายละเอียดเพิ่มเติม
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    {announcement.links && (
                        announcement.links.map((button) => (
                            <Button
                                key={button.id}
                                variant="default"
                                asChild
                                className="inline-flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 text-white dark:text-white"
                            >
                                <Link href={button.link.url} target="_blank" rel="noopener noreferrer">
                                    {button.link.title}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default AnnouncementCard