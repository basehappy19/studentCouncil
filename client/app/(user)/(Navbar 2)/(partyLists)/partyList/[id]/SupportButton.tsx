'use client'
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PartyList } from '@/app/interfaces/PartyList/partylist';
import { SupportPartyList } from '@/app/functions/PartyList';

const SupportButton = ({ partyList }: { partyList: PartyList }) => {
    const [supportedParties, setSupportedParties] = useState<string[]>([]);
    const [canSupport, setCanSupport] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedParties = JSON.parse(localStorage.getItem('supportedParties') || '[]');
            setSupportedParties(storedParties);
            setCanSupport(!storedParties.includes(partyList.id));
        }
    }, [partyList.id]);

    const handleSupport = async () => {
        if (canSupport) {
            try {
                await SupportPartyList({ partyListId: partyList.id });

                const updatedParties = [...supportedParties, partyList.id.toString()];
                localStorage.setItem('supportedParties', JSON.stringify(updatedParties));
                setSupportedParties(updatedParties);
                setCanSupport(false);
            } catch (error) {
                console.error('Failed To Support PartyList', error);
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
                                <div className='text-5xl font-bold'>{partyList.support.toString()}</div> <Heart fill='currentColor' className='w-12 h-12' />
                            </div>
                            <Button
                                onClick={handleSupport}
                                disabled={!canSupport}
                                className={`
                                    relative group
                                    ${!canSupport
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
                                        ${!canSupport
                                        ? 'text-red-500 dark:text-red-400'
                                        : 'text-white group-hover:scale-110 transition-transform'}
                                        ${!canSupport ? '' : 'animate-pulse'}
                                    `}
                                    fill={!canSupport ? 'currentColor' : 'none'}
                                />
                                <span>
                                    {!canSupport
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
