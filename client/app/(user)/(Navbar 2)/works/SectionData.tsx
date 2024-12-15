'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import GridViewToggle from './ViewToggle'
import { Tag, Work } from '@/app/interfaces/Work/Work'
import WorkCard from '@/components/Work/WorkCard'
import { Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const SectionData = ({ works, tags, searchTag }: { works: Work[], tags: Tag[], searchTag: string | undefined }) => {
    const [columnCount, setColumnCount] = useState(2);

    const handleViewChange = (columns: number) => {
        setColumnCount(columns);
    };

    const pathname = usePathname()
    const router = useRouter();
    const [tag, setTag] = useState('');

    useEffect(() => {
        if (!tag || tag.trim() === '') {
            router.push(pathname, { scroll: false });
        } else {
            const debounceTimer = setTimeout(() => {
                router.push(`${pathname}?tag=${tag}`, { scroll: false });
            }, 300);
            return () => clearTimeout(debounceTimer);
        }
    }, [tag, router, pathname]);

    return (
        <section className="relative py-10 overflow-hidden">
            <div className="relative container mx-auto px-4 space-y-8">
                <div className="flex justify-between gap-x-3 items-center">
                    <SearchBar />
                    <GridViewToggle onViewChange={handleViewChange} />
                </div>
                <div>
                    <div className="flex items-center gap-4 mb-5">
                        <Hash className={`w-6 h-6 dark:text-pink-400 text-pink-600`} />
                        <h2 className={`text-2xl font-semibold dark:text-gray-200 text-gray-800`}>
                            แท๊กที่คุณอาจสนใจ
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-1 bg-pink-400 dark:bg-white pointer-events-none" />

                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex items-center flex-row px-4 gap-4">
                                <Button
                                    onClick={() => setTag('')}
                                    className={`
                                            ${searchTag === undefined ? `bg-pink-500 dark:bg-pink-500 dark:text-gray-200` : `dark:hover:bg-pink-500 bg-white text-gray-800 hover:text-white`}
                    group flex items-center gap-2 hover:bg-pink-500
                    whitespace-nowrap px-6 py-4 rounded-full
                    transition-all duration-300 
                    
                    
                  `}
                                >
                                    
                                    <span>ทั้งหมด</span>
                                </Button>
                                {tags.map((tag) => (
                                    <Button
                                        key={tag.id}
                                        onClick={() => setTag(tag.id.toString())}
                                        className={`
                                            ${searchTag === tag.id.toString() ? `bg-pink-500 dark:bg-pink-500 dark:text-gray-200` : `dark:hover:bg-pink-500 bg-white text-gray-800 hover:text-white`}
                    group flex items-center gap-2 hover:bg-pink-500
                    whitespace-nowrap px-6 py-4 rounded-full
                    transition-all duration-300 
                    
                    
                  `}
                                    >
                                        <Image
                                            width={16}
                                            height={16}
                                            src={`${process.env.NEXT_PUBLIC_WORK_ICON_PATH}${tag.icon.name}`}
                                            alt={tag.icon.name}
                                            className="w-4 h-4 opacity-100 transition-opacity" />
                                        <span>#{tag.title} ({tag.works.length.toString()})</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`grid grid-cols-1 md:grid-cols-${columnCount} gap-6`}
                >
                    {works.map((work) => (
                        <WorkCard key={work.id}
                            work={work}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SectionData