'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkStatistics, Work } from '@/app/interfaces/Work/Work';
import Image from "next/image";


export const WorkPostsPage = ({ work } : { work : WorkStatistics }) => {
    const [filter, setFilter] = useState<'all' | 'posted' | 'participated'>('all');

    const getFilteredWorks = () => {
        switch (filter) {
            case 'posted':
                return work.workPosts;
            case 'participated':
                return work.workParticipated;
            default:
                return [...work.workPosts, ...work.workParticipated];
        }
    };

    const displayWorks = filter === 'all'
        ? Array.from(new Set([...work.workPosts, ...work.workParticipated]))
        : getFilteredWorks();

    const renderWorkCard = (work: Work) => (
        <Card key={work.id} className="mb-4 hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{work.title}</span>
                    <div className="flex space-x-2">
                        {work.tags.map(tagItem => (
                            <Badge
                                key={tagItem.id}
                                className='text-white'
                            >
                                {tagItem.tag.title}
                            </Badge>
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{work.description}</p>
                {work.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {work.images.slice(0, 3).map(image => (
                            <Image
                                fill
                                key={image.id}
                                src={image.path}
                                alt="Work Image"
                                className="w-full h-24 object-cover rounded"
                            />
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                        Posted by {work.postBy.fullName} on {new Date(work.date).toLocaleString('th-TH')}
                    </span>
                    {work.operators.length > 0 && (
                        <div className="flex -space-x-2">
                            {work.operators.slice(0, 3).map(op => (
                                <Image
                                    key={op.id}
                                    src={op.user.profile_image_128x128}
                                    alt={op.user.fullName}
                                    className="w-6 h-6 rounded-full border-2 border-white"
                                />
                            ))}
                            {work.operators.length > 3 && (
                                <span className="ml-2 text-xs text-muted-foreground">
                                    +{work.operators.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Work Posts</h1>
                <div className="space-x-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                    >
                        All Works ({work.totalWorks})
                    </Button>
                    <Button
                        variant={filter === 'posted' ? 'default' : 'outline'}
                        onClick={() => setFilter('posted')}
                    >
                        My Posts ({work.workPostsCount})
                    </Button>
                    <Button
                        variant={filter === 'participated' ? 'default' : 'outline'}
                        onClick={() => setFilter('participated')}
                    >
                        Participated ({work.workParticipatedCount})
                    </Button>
                </div>
            </div>

            {displayWorks.length === 0 ? (
                <div className="text-center text-muted-foreground py-10">
                    No works found
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {displayWorks.map(renderWorkCard)}
                </div>
            )}
        </div>
    );
};

