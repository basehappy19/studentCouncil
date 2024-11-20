'use client'
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const SearchBar = () => {
    const pathname = usePathname()
    const router = useRouter();
    const [text, setText] = useState('');

    useEffect(() => {
        if (!text || text.trim() === '') {
            router.push(pathname, { scroll: false });
        } else {
            const debounceTimer = setTimeout(() => {
                router.push(`${pathname}?search=${text}`, { scroll: false });
            }, 300);
            return () => clearTimeout(debounceTimer);
        }
    }, [text, router, pathname]);
    
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

export default SearchBar