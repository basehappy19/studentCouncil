import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { Metadata } from 'next';
import { AllAnnouncements } from '@/app/functions/Announcement';
import { Announce, Priority } from '@/app/interfaces/Announcement/Announcement';
import SearchBar from './SearchBar';
import Pagination from '@/components/Pagination';
import Calendar from './Calendar';
import { Event } from '@/app/interfaces/Event/Event';
import { AllEvents } from '@/app/functions/Event';
import { Bell } from 'lucide-react';
import AnnouncementCard from './AnnouncementCard';

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
                        <AnnouncementCard key={announcement.id} announcement={announcement} />
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