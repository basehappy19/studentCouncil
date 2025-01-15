import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BellRing, CheckCircle, ChevronRight, Clock, MapPin, MessageSquare } from 'lucide-react'
import React from 'react'

const RecentProblemCard = ({mockProblems}) => {
    return (
        <Card className="bg-white dark:bg-slate-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <span>ปัญหาที่แจ้งล่าสุด</span>
                    <Badge variant="outline" className="ml-2 dark:text-white">
                        {mockProblems.length} รายการ
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockProblems.map((problem) => (
                        <Card
                            key={problem.id}
                            className={`bg-white dark:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 ${problem.status === "resolved"
                                    ? "border-l-green-500"
                                    : "border-l-orange-500"
                                }`}
                        >
                            <CardContent className="p-4">
                                <div className="flex flex-col gap-3">
                                    {/* Header with Title and Status */}
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                                {problem.status === "resolved" ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <Clock className="h-5 w-5 text-orange-500" />
                                                )}
                                                {problem.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {problem.description}
                                            </p>
                                        </div>
                                        <Badge
                                            className={`
                                        ${problem.status === "resolved"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                                                    : "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100"
                                                }
                                        px-3 py-1 rounded-full font-medium flex items-center gap-1
                                    `}
                                        >
                                            {problem.status === "resolved" ? (
                                                <>
                                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                    แก้ไขแล้ว
                                                </>
                                            ) : (
                                                <>
                                                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                                    รอดำเนินการ
                                                </>
                                            )}
                                        </Badge>
                                    </div>

                                    {/* Location and Time Info */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <MapPin className="h-4 w-4" />
                                            <span className="flex items-center gap-1">
                                                {problem.location}
                                                <ChevronRight className="h-4 w-4" />
                                                {problem.subLocation}
                                                <ChevronRight className="h-4 w-4" />
                                                {problem.room}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                            <Clock className="h-4 w-4" />
                                            <time dateTime={problem.createdAt}>
                                                {new Date(problem.createdAt).toLocaleString("th-TH", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentProblemCard