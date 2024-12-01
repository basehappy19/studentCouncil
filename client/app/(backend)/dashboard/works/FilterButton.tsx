'use client'

import { AdditionalWork } from '@/app/interfaces/Work/Work';
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FilterButton = ({additionalData}:{additionalData:AdditionalWork}) => {
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
                variant={filter === '' ? 'default' : 'outline'}
                onClick={() => setFilter('')}
            >
                งานทั้งหมด ({additionalData.totalWorks})
            </Button>
            <Button
                variant={filter === 'owner' ? 'default' : 'outline'}
                onClick={() => setFilter('owner')}
            >
                งานที่โพสต์เอง ({additionalData.totalOwned})
            </Button>
            <Button
                variant={filter === 'participated' ? 'default' : 'outline'}
                onClick={() => setFilter('participated')}
            >
                งานที่มีส่วนร่วม ({additionalData.totalParticipated}) 
            </Button>
        </div>
    );
};

export default FilterButton;
