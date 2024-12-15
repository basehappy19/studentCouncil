'use client'
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Policy } from '@/app/interfaces/Policy/Policy';
import { LikePolicy } from '@/app/functions/Policy';

const LinkPolicy = ({ policy }: { policy: Policy }) => {
    const LikePolicies = JSON.parse(localStorage.getItem('LikePolicies') || '[]');
    const canLike = LikePolicies.includes(policy.id) ? false : true
    const handleSupport = async () => {
        if (canLike) {
            try {
                await LikePolicy({ policyId: policy.id });

                const LikePolicies = JSON.parse(localStorage.getItem('LikePolicies') || '[]');
                LikePolicies.push(policy.id);
                localStorage.setItem('LikePolicies', JSON.stringify(LikePolicies));
            } catch (error) {
                console.error('Failed To Support Policy', error);
            }
        }
    };

    return (
        <Button 
            variant="outline" 
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                ${!canLike 
                    ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'}
                dark:bg-slate-800 dark:border-slate-700
            `}
            onClick={handleSupport}
            disabled={!canLike}
        >
            <Heart 
                className={`
                    w-5 h-5 transition-all duration-300
                    ${!canLike 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-500 hover:text-red-500'}
                `}
                strokeWidth={!canLike ? 0 : 1.5}
            />
            <span className={`
                font-medium text-sm
                ${!canLike  
                    ? 'text-red-600' 
                    : 'text-gray-700 dark:text-slate-300'}
            `}>
                {policy.like.toString()}
            </span>
        </Button>
    );
};

export default LinkPolicy;