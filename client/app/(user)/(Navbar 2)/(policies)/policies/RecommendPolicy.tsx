'use client'
import { Policy } from '@/app/interfaces/Policy/Policy';
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

const RecommendPolicy = ({policy}:{policy: Policy}) => {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push(`/policy/detail/${policy.id}`)}
            className={`
                    group flex items-center gap-2
                    whitespace-nowrap px-6 py-4 rounded-full
                    transition-all duration-300 
                    dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-gray-200
                    bg-white hover:bg-pink-500 text-gray-800 hover:text-white
                  `}
        >
            <span>{policy.title}</span>
            <ArrowRight className="w-4 h-4 opacity-100 transition-opacity" />
        </Button>
    )
}

export default RecommendPolicy