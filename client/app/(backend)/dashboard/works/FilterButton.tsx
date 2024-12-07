'use client'

import { AdditionalWork } from '@/app/interfaces/Work/Work';
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FilterButton = ({ additionalData }: { additionalData: AdditionalWork }) => {
    const [filter, setFilter] = useState<string>('');
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();


    useEffect(() => {
        const currentFilter = searchParams.get('filter') || '';
        setFilter(currentFilter);
    }, [searchParams]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (filter && filter.trim() !== '') {
                params.set('filter', filter);
            } else {
                params.delete('filter');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [filter, router, pathname, searchParams]);

    return (
        <div className="space-x-2">
            <Button
                className={`transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${filter === '' ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-400' : 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-400'}`}
                variant={filter === '' ? 'default' : 'outline'}
                onClick={() => setFilter('')}
            >
                งานทั้งหมด ({additionalData.totalWorks})
            </Button>
            <Button
                className={`transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${filter === 'owner' ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-400' : 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-400'}`}
                variant={filter === 'owner' ? 'default' : 'outline'}
                onClick={() => setFilter('owner')}
            >
                งานที่โพสต์เอง ({additionalData.totalOwned})
            </Button>
            <Button
                className={`transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${filter === 'participated' ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-400' : 'bg-blue-400 hover:bg-blue-500 focus:ring-blue-400'}`}
                variant={filter === 'participated' ? 'default' : 'outline'}
                onClick={() => setFilter('participated')}
            >
                งานที่มีส่วนร่วม ({additionalData.totalParticipated})
            </Button>
        </div>
    );
};

export default FilterButton;
