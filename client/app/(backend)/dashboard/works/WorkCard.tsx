import { Work } from '@/app/interfaces/Work/Work'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Carousel from "@/components/Work/Carousel";
import DropDownOperators from './DropDownOperators';

const WorkCard = ({ work }: { work: Work }) => {
    return (
        <Card className="mb-4 hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{work.title}</span>
                    <div className="flex space-x-2">
                        {work.tags.map(tag => (
                            <div key={tag.id} className="flex items-center justify-center flex-row-reverse gap-x-2">
                                <span className="text-sm text-gray-600">
                                    {tag.tag.title}
                                </span>
                                <Image
                                    loading='lazy'
                                    width={16}
                                    height={16}
                                    src={`${process.env.NEXT_PUBLIC_WORK_ICON_PATH}${tag.tag.icon.name}`}
                                    alt={tag.tag.id.toString()}
                                />
                            </div>
                        ))}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground my-3">{work.description}</p>
                <div className="carousel-container">
                    <Carousel images={work.images} />
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                                โพสต์โดย {work.postBy.fullName} | {new Date(work.date).toLocaleString('th-TH')}
                            </span>
                        </div>
                    </div>
                    <DropDownOperators operators={work.operators} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default WorkCard