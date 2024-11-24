'use client'
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

const DateFilter = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
