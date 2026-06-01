import { Priority } from "@/app/interfaces/Announcement/Announcement";

/**
 * Get human-readable title for announcement priority
 */
export const getPriorityTitle = (priority: Priority) => {
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

/**
 * Get CSS styles for announcement priority alerts
 */
export const getAlertStyles = (priority: Priority) => {
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
