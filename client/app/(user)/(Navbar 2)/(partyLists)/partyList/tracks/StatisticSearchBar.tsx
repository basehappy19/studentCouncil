'use client'
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const StatisticSearchBar = () => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (text && text.trim() !== '') {
                params.set('search_statistic', text); 
            } else {
                params.delete('search_statistic');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [text, router, pathname, searchParams]);
    
    return (
        <div className="relative mb-3">
            <Input
                type="text"
                placeholder="ค้นหาสมาชิก..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full"
            ></Input>
        </div>
    )
}

export default StatisticSearchBar