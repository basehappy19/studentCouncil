import React from 'react';
import { Bell, ExternalLink, CalendarDays, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import ImageGallery from './Images';
import { AllAnnouncements } from '@/app/functions/Announcement';
import { Announce, Priority } from '@/app/interfaces/Announcement/Announcement';
import SearchBar from './SearchBar';
import Pagination from '@/components/Pagination';
import Calendar from './Calendar';
import { Event } from '@/app/interfaces/Event/Event';
import { AllEvents } from '@/app/functions/Event';

export const metadata: Metadata = {
    title: `ประกาศ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "ประกาศพรรคภายใน",
    openGraph: {
        title: `ประกาศ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "ประกาศพรรคภายใน",
    },
};

const AnnouncementPage = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParams = await props.searchParams
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
    const page =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page)
      : undefined;
    const announce: Announce = await AllAnnouncements({ search: search, page: page });
    const events: Event[] = await AllEvents();

    const getPriorityTitle = (priority: Priority) => {
        switch (priority) {
            case 'NORMAL':
                return 'ประกาศ';
            case 'IMPORTANT':
                return 'ประกาศสำคัญ';
            case 'URGENT':
                return 'ด่วน';
            case 'VERY_URGENT':
                return 'ด่วนที่สุด';
            default:
                return 'ประกาศ';
        }
    };

    const getAlertStyles = (priority: Priority) => {
        switch (priority) {
            case 'NORMAL':
                return {
                    container: 'bg-blue-500/10 dark:bg-blue-950/50 border-blue-500',
                    icon: 'text-blue-500',
                    title: 'text-blue-500',
                    description: 'text-blue-600 dark:text-blue-400'
                };
            case 'IMPORTANT':
                return {
                    container: 'bg-yellow-500/10 dark:bg-yellow-950/50 border-yellow-500',
                    icon: 'text-yellow-500',
                    title: 'text-yellow-500',
                    description: 'text-yellow-600 dark:text-yellow-400'
                };
            case 'URGENT':
                return {
                    container: 'bg-orange-500/10 dark:bg-orange-950/50 border-orange-500',
                    icon: 'text-orange-500',
                    title: 'text-orange-500',
                    description: 'text-orange-600 dark:text-orange-400'
                };
            case 'VERY_URGENT':
                return {
                    container: 'bg-red-500/10 dark:bg-red-950/50 border-red-500',
                    icon: 'text-red-500',
                    title: 'text-red-500',
                    description: 'text-red-600 dark:text-red-400'
                };
            default:
                return getAlertStyles('NORMAL');
        }
    };
    const styles = getAlertStyles(announce.highlight.priority);

    return (
        <div className={`min-h-screen
            dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
            bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50`}>
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-8 space-y-6">
                {/* Important announcement alert */}
                <Alert className={styles.container}>
                    <Bell className={`h-5 w-5 ${styles.icon}`} />
                    <AlertTitle className={styles.title}>
                        {getPriorityTitle(announce.highlight.priority)}
                    </AlertTitle>
                    <AlertDescription className={styles.description}>
                        {announce.highlight.content}
                    </AlertDescription>
                </Alert>

                {/* Calendar */}
                <Calendar events={events}/>

                {/* Search bar and pagination */}
                <SearchBar />
                <Pagination totalPages={announce.pagination.totalPages} currentPage={announce.pagination.currentPage} />

                {/* Announcements list */}
                <div className="grid gap-6">
                    {announce.announcements.length > 0 ? ( 
                        announce.announcements.map((announcement) => (
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
                                    {announcement.newAnnouncement && (
                                        <Badge variant="secondary" className="shrink-0 bg-red-500 text-white dark:bg-red-600">
                                            ประกาศใหม่
                                        </Badge>
                                    )}
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
                                {announcement.links && (
                                    <div className="flex flex-wrap gap-4">
                                        {announcement.links.map((button) => (
                                            <Button
                                                key={button.id}
                                                variant="default"
                                                asChild
                                                className="inline-flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 text-white dark:text-white"
                                            >
                                                <a href={button.link.url} target="_blank" rel="noopener noreferrer">
                                                    {button.link.title}
                                                    <ExternalLink className="ml-2 h-4 w-4" />
                                                </a>
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))) : (
                        <div className="text-center text-muted-foreground py-10">
                            ไม่พบประกาศ
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPage;