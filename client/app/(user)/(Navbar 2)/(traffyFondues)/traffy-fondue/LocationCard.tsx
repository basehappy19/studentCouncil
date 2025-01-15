import { Location } from '@/app/interfaces/TraffyFondue/Location'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Building2, CheckCircle, MessagesSquare } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const LocationCard = ({ location }: { location: Location }) => {
    return (
        <Card key={location.id} className="relative overflow-hidden bg-white dark:bg-slate-800">
            <Image
                loading='lazy'
                quality={100}
                width={1092}
                height={192}
                src={`${process.env.NEXT_PUBLIC_LOCATION_PATH}${location.image}`}
                alt={location.name}
                className="w-full h-32 object-cover"
            />
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {location.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MessagesSquare className="h-5 w-5" />
                        <span>ปัญหาทั้งหมด: {location.totalProblems.toString()}</span>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {location.stats.RESOLVED.toString()}
                        </Badge>
                        <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {location.stats.PENDING.toString()}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LocationCard