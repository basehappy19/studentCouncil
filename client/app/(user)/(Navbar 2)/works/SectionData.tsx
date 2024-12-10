'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import GridViewToggle from './ViewToggle'
import { Work } from '@/app/interfaces/Work/Work'
import WorkCard from '@/components/Work/WorkCard'

const SectionData = ({ works }: { works: Work[] }) => {
    const [columnCount, setColumnCount] = useState(2);

    const handleViewChange = (columns: number) => {
        setColumnCount(columns);
    };

    return (
        <section className="relative py-10 overflow-hidden">
            <div className="relative container mx-auto px-4">
                <div className="flex justify-between gap-x-3 items-center mb-6">
                    <SearchBar />
                    <GridViewToggle onViewChange={handleViewChange} />
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