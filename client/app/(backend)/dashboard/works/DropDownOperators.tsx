'use client'
import { useState } from 'react'
import Image from 'next/image'
import { WorkOperators } from '@/app/interfaces/Work/Work'
import { ChevronDown, ChevronUp } from 'lucide-react'

const DropDownOperators = ({ operators }: { operators: WorkOperators[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full">
            <div 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
            >
                สมาชิกที่เกี่ยวข้องทั้งหมด {operators.length} คน 
                {isExpanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
            </div>

            {isExpanded && (
                <div className="mt-2 border rounded-md p-4 max-h-64 overflow-y-auto">
                    <div className="px-2 py-2 font-semibold text-sm mb-2">
                        สมาชิกทั้งหมด ({operators.length})
                    </div>
                    {operators.map((operator) => (
                        <div 
                            key={operator.id} 
                            className="flex items-center space-x-2 py-2 border-b last:border-b-0"
                        >
                            <Image
                                width={32}
                                height={32}
                                src={`${process.env.NEXT_PUBLIC_USER_PROFILE_IMG_128X128_PATH}${operator.user.profile_image_128x128}`}
                                alt={operator.user.fullName}
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{operator.user.fullName}</span>
                                <span className="text-xs text-muted-foreground">{operator.user.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropDownOperators