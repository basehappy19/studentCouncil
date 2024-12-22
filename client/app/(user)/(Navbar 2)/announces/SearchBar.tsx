'use client'
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const SearchBar = () => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (text && text.trim() !== '') {
                params.set('search', text); 
            } else {
                params.delete('search');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [text, router, pathname, searchParams]);
    
    return (
        <div className="relative mb-3">
            <Input
                type="text"
                placeholder="ค้นหาประกาศ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full dark:bg-slate-800"
            ></Input>
        </div>
    )
}

export default SearchBar