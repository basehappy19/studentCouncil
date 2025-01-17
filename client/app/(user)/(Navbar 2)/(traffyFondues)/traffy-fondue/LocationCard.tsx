'use client'
import React from 'react';
import { Location } from '@/app/interfaces/TraffyFondue/Location';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Building2, CheckCircle, MessagesSquare, ChevronDown, ChevronUp, Plus, ListFilter } from 'lucide-react';
import Image from 'next/image';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const LocationCard = ({ location, onSelect }: { location: Location, onSelect: (locationId: number) => void; }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLocationClick = (e: React.MouseEvent) => {
        // Prevent triggering when clicking buttons
        if ((e.target as HTMLElement).closest('button')) return;
        onSelect(location.id);
        setIsOpen(!isOpen);
    };

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
        e.stopPropagation(); // Prevent card click
        setIsOpen(!isOpen);
    };

    return (
        <Card
            key={location.id}
            className="relative overflow-hidden bg-white dark:bg-slate-800 cursor-pointer hover:shadow-lg transition-shadow"
        >
            <Image
                loading="lazy"
                quality={100}
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

                <div className="flex gap-2 mt-4">
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
                    <Button
                        variant="default"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={handleReportClick}
                    >
                        <Plus className="h-4 w-4" />
                        แจ้งปัญหา
                    </Button>
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
                                                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                                    <CheckCircle className="h-3 w-3" />
                                                    {subLocation.stats.RESOLVED}
                                                </Badge>
                                                <Badge variant="destructive" className="flex items-center gap-1 text-xs">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {subLocation.stats.PENDING}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            ปัญหาทั้งหมด: {subLocation.totalProblems}
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