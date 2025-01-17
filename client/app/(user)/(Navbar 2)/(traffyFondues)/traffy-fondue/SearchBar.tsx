'use client'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const SearchBar = ({placeholder, searchKey}:{placeholder: string, searchKey: string}) => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (text && text.trim() !== '') {
                params.set(searchKey, text);
            } else {
                params.delete(searchKey);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [text, router, pathname, searchParams]);

    return (
        <div className="w-full relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={24} />
            </div>
            <Input
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-16 pl-12 border-2 border-gray-300 focus:border-blue-500 transition-colors duration-300 rounded-lg shadow-sm"
            />
        </div>
    )
}

export default SearchBar