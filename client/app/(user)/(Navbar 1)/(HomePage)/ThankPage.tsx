'use client'
import { ArrowRight, Heart, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ThankPage = () => {
    const [count, setCount] = useState(0);
    const targetCount = 782;

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = targetCount / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetCount) {
                setCount(targetCount);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="text-white space-y-6">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-blue-400">ขอขอบคุณ {count.toLocaleString()} เสียงไว้วางใจ</span>
                <span className="text-yellow-400"> Student Own School</span>
            </h1>


            <p className="text-xl leading-relaxed">
                <span className="text-yellow-400">พวกเรา</span>
                <br />
                <span className="text-blue-400 font-semibold">Student Own School</span>
                {" "}ขอส่งต่อกำลังใจ และ แนวทางดี ๆ ให้กับสภานักเรียนรุ่นต่อไป....
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="w-full">
                    <a
                        href="/fakbok"
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-pink-500/50 hover:scale-105 transform"
                    >
                        <Heart className="w-5 h-5 fill-white animate-pulse" />
                        <span>ฝากบอกพรรค / คนในโรงเรียน / สภารุ่นต่อไป</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <div className='flex flex-wrap gap-4 w-full justify-center'>
                    <a
                        href="/partyLists"
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group"
                    >
                        <span>ดูรายชื่ออดีตผู้สมัคร</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="/policies"
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium transition-all duration-300"
                    >
                        ดูนโยบายทั้งหมด
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ThankPage