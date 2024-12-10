'use client'
import React, { useEffect, useRef } from 'react'

const PartyListLength = ({ count }: { count: number }) => {
    const partyListLengthRef = useRef<number>(0);

    // ใช้ useEffect เพื่อเก็บค่า count 
    useEffect(() => {
        if (partyListLengthRef.current === 0) {
            partyListLengthRef.current = count; 
        }
    }, [count]); 

    return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur-sm">
                <p className="text-xl md:text-2xl font-medium dark:text-gray-300">
                    จำนวนผู้สมัครทั้งหมด{' '}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                        {partyListLengthRef.current}
                    </span>{' '}
                    คน
                </p>
            </div>
        </div>
    )
}

export default PartyListLength
