'use client'
import React from 'react';
import { Location } from '@/app/interfaces/TraffyFondue/Location';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Building2, CheckCircle, MessagesSquare, ChevronDown, ChevronUp, Plus, ListFilter, TimerIcon } from 'lucide-react';
import Image from 'next/image';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const LocationCard = ({ location, onSelect }: { location: Location, onSelect: (locationId: number) => void; }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleReportClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        onSelect(location.id);
        // Scroll to report form
        document.getElementById('reportForm')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const handleViewSublocations = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <Card
            key={location.id}
            className="relative overflow-hidden bg-white dark:bg-slate-700 cursor-pointer hover:shadow-lg transition-shadow"
        >
            <Image
                quality={80}
                width={1092}
                height={192}
                src={`${process.env.NEXT_PUBLIC_LOCATION_PATH}${location.image}`}
                alt={location.name}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {location.name}
                    </div>
                    {location.subLocations.length > 0 && (
                        isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MessagesSquare className="h-5 w-5" />
                        <span>ปัญหาทั้งหมด: {location.totalProblems.toString()}</span>
                    </div>
                    <div className="flex gap-2">

                        <Badge variant="secondary" className="font-medium bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-500 flex items-center gap-1 text-xs">
                            <CheckCircle className="h-3 w-3" />
                            {location.stats.RESOLVED.toString()}
                        </Badge>
                        <Badge variant="secondary" className="font-medium bg-orange-300 hover:bg-orange-300 dark:bg-orange-500 dark:hover:bg-orange-500 flex items-center gap-1 text-xs">
                            <AlertCircle className="h-3 w-3" />
                            {location.stats.IN_PROGRESS.toString()}
                        </Badge>
                        <Badge variant="secondary" className="font-medium bg-red-300 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-500 flex items-center gap-1 text-xs">
                            <TimerIcon className="h-3 w-3" />
                            {location.stats.PENDING.toString()}
                        </Badge>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">

                    <Button
                        variant="default"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={handleReportClick}
                    >
                        <Plus className="h-4 w-4" />
                        แจ้งปัญหา
                    </Button>
                    {location.subLocations.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={handleViewSublocations}
                        >
                            <ListFilter className="h-4 w-4" />
                            ดูสถานที่ย่อย
                        </Button>
                    )}
                </div>

                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <CollapsibleContent className="mt-4 space-y-2">
                        {location.subLocations.map((subLocation) => (
                            <div
                                key={subLocation.id}
                                className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700"
                            >
                                <div className="flex gap-4">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <Image
                                            loading="lazy"
                                            quality={100}
                                            fill
                                            sizes="(max-width: 96px) 100vw, 96px"
                                            src={`${process.env.NEXT_PUBLIC_LOCATION_PATH}${subLocation.image}`}
                                            alt={subLocation.name}
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">{subLocation.name}</span>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="font-medium bg-green-400 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-500 flex items-center gap-1 text-xs">
                                                    <CheckCircle className="h-3 w-3" />
                                                    {subLocation.stats.RESOLVED.toString()}
                                                </Badge>
                                                <Badge variant="secondary" className="font-medium bg-orange-300 hover:bg-orange-300 dark:bg-orange-500 dark:hover:bg-orange-500 flex items-center gap-1 text-xs">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {subLocation.stats.IN_PROGRESS.toString()}
                                                </Badge>
                                                <Badge variant="secondary" className="font-medium bg-red-300 hover:bg-red-300 dark:bg-red-500 dark:hover:bg-red-500 flex items-center gap-1 text-xs">
                                                    <TimerIcon className="h-3 w-3" />
                                                    {subLocation.stats.PENDING.toString()}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            ปัญหาทั้งหมด: {subLocation.totalProblems.toString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
};

export default LocationCard;