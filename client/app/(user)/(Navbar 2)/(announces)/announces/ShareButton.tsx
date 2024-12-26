'use client'
import { Announcement } from '@/app/interfaces/Announcement/Announcement'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import React from 'react'

const ShareButton = ({ announcement } : { announcement : Announcement }) => {
    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => navigator.share({ title: announcement.title, url: `/announcement/${announcement.id}` })}
            className="shrink-0"
        >
            <Share2 className="h-4 w-4" />
        </Button>
    )
}

export default ShareButton