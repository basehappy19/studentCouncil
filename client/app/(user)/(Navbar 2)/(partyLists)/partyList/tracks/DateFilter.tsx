'use client'
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

const formatDate = (date : Date): string => {
    return date.toISOString().split('T')[0];
};

const DateFilter = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const [startDate, setStartDate] = useState(formatDate(lastWeek)); 
    const [endDate, setEndDate] = useState(formatDate(today)); 

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (startDate) {
                params.set('startDate', startDate);
            } else {
                params.delete('startDate');
            }

            if (endDate) {
                params.set('endDate', endDate);
            } else {
                params.delete('endDate');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [startDate, endDate, router, pathname, searchParams]);

    return (
        <div className="flex gap-3 mb-3">
            <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
            />
            <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
            />
        </div>
    );
};

export default DateFilter;
