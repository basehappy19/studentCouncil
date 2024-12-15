import React from 'react'
import * as Icons from "lucide-react"

type IconName = keyof typeof Icons;

const TagInHeader = ({ icon, color, title }: { icon: IconName, color: string, title: string }) => {
    const IconComponent = Icons[icon] as React.ElementType | undefined;

    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            {IconComponent ? (
                <IconComponent className={`w-5 h-5 ${color}`} />
            ) : (
                <span className="text-sm font-medium text-red-500">Icon not found</span>
            )}
            <span className="text-sm font-medium dark:text-gray-200 text-gray-600">
                {title}
            </span>
        </div>
    )
}

export default TagInHeader;
