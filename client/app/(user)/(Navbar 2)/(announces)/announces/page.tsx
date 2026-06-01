import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { Metadata } from 'next';
import { AllAnnouncements } from '@/app/functions/Announcement';
import { Announce } from '@/app/interfaces/Announcement/Announcement';
import SearchBar from './SearchBar';
import Pagination from '@/components/Pagination';
import Calendar from './Calendar';
import { Event } from '@/app/interfaces/Event/Event';
import { AllEvents } from '@/app/functions/Event';
import { Bell } from 'lucide-react';
import AnnouncementCard from './AnnouncementCard';
import { getPriorityTitle, getAlertStyles } from '@/lib/announcement-utils';

export const metadata: Metadata = {
    title: `ประกาศ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "ประกาศพรรคภายใน",
    openGraph: {
        title: `ประกาศ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description: "ประกาศพรรคภายใน",
    },
};

const AnnouncementPage = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParams = await props.searchParams;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : undefined;
    
    // Fetch data in parallel
    const [announce, events]: [Announce, Event[]] = await Promise.all([
        AllAnnouncements({ search, page }),
        AllEvents()
    ]);

    const styles = getAlertStyles(announce.highlight.priority);

    return (
        <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
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
                <Calendar events={events} />

                {/* Search bar and pagination */}
                <SearchBar />
                <Pagination totalPages={announce.pagination.totalPages} currentPage={announce.pagination.currentPage} />

                {/* Announcements list */}
                <div className="grid gap-6">
                    {announce.announcements.length > 0 ? (
                        announce.announcements.map((announcement) => (
                            <AnnouncementCard key={announcement.id} announcement={announcement} />
                        ))
                    ) : (
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
