"use client"
import React, { useEffect, useState } from 'react';
import { Cloud, Send, Sparkles, Eye, MessageCircle, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AddFakbokMessage, LikeFakbokMessage } from '@/app/functions/Fakbok';
import { Fakbok } from './page';

export default function MessageCloudPage({ messages }: { messages: Fakbok[] }) {
    const [message, setMessage] = useState('');
    const [viewMode, setViewMode] = useState('write');
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [localLikes, setLocalLikes] = useState<Record<number, number>>({});
    const router = useRouter();
    useEffect(() => {
        const stored = localStorage.getItem("fakbok_likes");
        if (stored) {
            setLikedIds(JSON.parse(stored));
        }
    }, []);
    const handleSubmit = async () => {
        if (!message.trim()) return;

        try {
            await AddFakbokMessage(message.trim());
            setMessage('');

            setViewMode("view");
        } catch (error) {
            console.error('Error saving message:', error);
            alert('ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง');
        }
    };
    const handleLike = async (publicId: string) => {
        if (likedIds.includes(publicId)) return;

        try {
            const res = await LikeFakbokMessage(publicId);

            setLocalLikes((prev) => ({
                ...prev,
                [publicId]: res.likes,
            }));

            const updated = [...likedIds, publicId];
            setLikedIds(updated);
            localStorage.setItem("fakbok_likes", JSON.stringify(updated));
        } catch {
            alert("กดไลค์ไม่สำเร็จ");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 overflow-hidden">
            {/* Animated Background Clouds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute top-32 right-20 w-48 h-48 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative container mx-auto px-4 py-12">
                <div className="absolute left-4 top-6 z-20">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">ย้อนกลับ</span>
                    </button>
                </div>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h1 className="text-5xl font-bold text-white drop-shadow-lg">ฝากบอก</h1>
                    </div>
                    <p className="text-xl text-white/90 drop-shadow">ให้พรรค คนในโรงเรียน และสภารุ่นต่อไป</p>
                </div>

                {/* Toggle View Mode */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setViewMode('write')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'write'
                            ? 'bg-white text-blue-600 shadow-lg scale-105'
                            : 'bg-white/50 text-white hover:bg-white/70'
                            }`}
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span>เขียนข้อความ</span>
                    </button>
                    <button
                        onClick={() => setViewMode('view')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${viewMode === 'view'
                            ? 'bg-white text-blue-600 shadow-lg scale-105'
                            : 'bg-white/50 text-white hover:bg-white/70'
                            }`}
                    >
                        <Eye className="w-5 h-5" />
                        <span>ดูข้อความทั้งหมด ({messages.length})</span>
                    </button>
                </div>

                {/* Write Mode */}
                {viewMode === 'write' && (
                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white">
                            <div className="flex items-center gap-2 mb-6">
                                <Cloud className="w-8 h-8 text-blue-500" />
                                <h2 className="text-2xl font-bold text-gray-800">เขียนข้อความของคุณ</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        ข้อความของคุณ *
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="เขียนข้อความที่อยากฝากไว้..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                                        rows={5}
                                        maxLength={200}
                                    />
                                    <p className="text-sm text-gray-500 mt-2 text-right">
                                        {message.length}/200 ตัวอักษร
                                    </p>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!message.trim()}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transform"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>ส่งข้อความขึ้นสู่ท้องฟ้า</span>
                                    <Sparkles className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                <p className="text-sm text-gray-600 text-center">
                                    ข้อความของเราจะปลิ้วขึ้นไปบนท้องฟ้าและทุกคนสามารถอ่านได้
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* View Mode - Messages Grid */}
                {viewMode === 'view' && (
                    <div className="relative min-h-screen">
                        {messages.length === 0 ? (
                            <div className="text-center py-20">
                                <Cloud className="w-24 h-24 text-white/50 mx-auto mb-4" />
                                <p className="text-2xl text-white/80 font-semibold">ยังไม่มีข้อความ</p>
                                <p className="text-white/60 mt-2">เป็นคนแรกที่ส่งข้อความไปบนเมฆสิ!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                                {messages.map((msg) => {
                                    const liked = likedIds.includes(msg.publicId);
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`relative bg-gradient-to-br ${msg.color} rounded-3xl p-6 shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-bounce-slow`}
                                        >
                                            {/* Cloud Decoration */}
                                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full opacity-80"></div>
                                            <div className="absolute -top-1 left-4 w-10 h-10 bg-white rounded-full opacity-80"></div>
                                            <div className="absolute -top-2 left-12 w-8 h-8 bg-white rounded-full opacity-80"></div>

                                            <span className="text-lg opacity-100 font-bold">
                                                {msg.content}
                                            </span>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-80">
                                                    {new Date(msg.createdAt).toLocaleString("th-TH")}
                                                </span>

                                                <button
                                                    onClick={() => handleLike(msg.publicId)}
                                                    disabled={liked}
                                                    className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm transition ${liked
                                                        ? "bg-white/30 cursor-not-allowed"
                                                        : "bg-white/20 hover:bg-white/40"
                                                        }`}
                                                >
                                                    <Heart
                                                        size={16}
                                                        className={liked ? "fill-white" : ""}
                                                    />
                                                    {localLikes[msg.id] ?? msg.likes}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                
            </div>

            <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}