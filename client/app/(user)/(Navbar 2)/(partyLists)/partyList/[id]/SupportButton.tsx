'use client'
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PartyList } from '@/app/interfaces/PartyList/partylist';

const SupportButton = ({ partyList }: { partyList: PartyList }) => {
    const [isSupported, setIsSupported] = useState(false);
    const [supportCount, setSupportCount] = useState(0);

    const handleSupport = async () => {
        if (!isSupported) {
            try {
                // Simulate server request
                const supportData = {
                    partyListId: partyList.id,
                    nickName: partyList.nickName,
                    supportedAt: new Date().toISOString()
                };

                // Log to console as a server simulation
                console.log('Support Logged:', supportData);

                // Update local state
                setIsSupported(true);
                setSupportCount(prev => prev + 1);

                // Optional: You could add a toast or notification here
            } catch (error) {
                console.error('Support logging failed', error);
            }
        }
    };

    return (
        <section className="relative my-10">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <div className="bg-white dark:bg-slate-700 rounded-xl shadow-xl p-8 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            ให้กำลังใจ {partyList.nickName}
                        </h2>

                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-row gap-x-3 items-center text-red-600 dark:text-red-300">
                                <div className='text-5xl font-bold'>{supportCount}</div> <Heart fill='currentColor' className='w-12 h-12' />
                            </div>
                            <Button
                                onClick={handleSupport}
                                disabled={isSupported}
                                className={`
                  relative group
                  ${isSupported
                                        ? 'bg-pink-600 cursor-not-allowed'
                                        : 'bg-pink-600 hover:bg-pink-700'}
                  text-white py-6 px-8 rounded-full text-xl
                  transition-all duration-300
                  flex items-center justify-center
                  space-x-3
                `}
                            >
                                <Heart
                                    className={`
                    w-10 h-10 
                    ${isSupported
                                            ? 'text-red-500 dark:text-red-400'
                                            : 'text-white group-hover:scale-110 transition-transform'}
                    ${isSupported ? '' : 'animate-pulse'}
                  `}
                                    fill={isSupported ? 'currentColor' : 'none'}
                                />
                                <span>
                                    {isSupported
                                        ? 'ให้กำลังใจแล้ว'
                                        : 'ให้กำลังใจ'}
                                </span>
                            </Button>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportButton;