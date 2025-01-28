import { getMessages } from '@/app/functions/PartyList'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail } from "lucide-react"
import { Message } from '@/app/interfaces/PartyList/partylist'

const InboxMessages = async () => {
    const messages: Message[] = await getMessages();


    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">กล่องข้อความ</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    ข้อความทั้งหมด ({messages.length})
                </p>
            </div>
            {messages.length > 0 ? (

                <ScrollArea className="h-[70vh]">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <Card key={message.id} className="transition-all duration-200 hover:shadow-md">
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="mt-1 text-md text-gray-900 dark:text-gray-100">
                                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                                    {message.message}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">

                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(message.createdAt).toLocaleDateString('th-TH', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            ) : (

                <div className="h-[80vh] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <Mail className="w-16 h-16 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">ไม่มีข้อความ</h3>
                    <p className="text-sm">ยังไม่มีข้อความใหม่ในขณะนี้</p>
                </div>
            )}

        </div>
    )
}

export default InboxMessages