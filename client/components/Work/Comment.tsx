'use client'
import { ChevronDown, ChevronUp, Heart, MessageCircle, SendHorizontal, User } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Work } from '@/app/interfaces/Work/Work';
import { Response } from '@/app/interfaces/Response';
import { CommentWork, LikeComment } from '@/app/functions/Work';
import { toast } from 'react-toastify';
import { formatRelativeTime } from '@/app/functions/Date';

const Comment = ({ work }: { work: Work }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [showComments, setShowComments] = useState<boolean>(false);

    const handleAddComment = async () => {
        const res: Response = await CommentWork({ workId: work.id, message: newComment })
        if (res.message && res.type) {
            setNewComment('');
            return toast[res.type](res.message, { position: `bottom-right` });
        }
        return toast[res.type](res.message, { position: `bottom-right` });
    };


    const handleLikeComment = async (commentId: number) => {
        const likedComments = JSON.parse(localStorage.getItem('likeWorkComments') || '{}');
        if (!likedComments[commentId]) {
            await LikeComment({ commentId });
            likedComments[commentId] = true;
            localStorage.setItem('likeWorkComments', JSON.stringify(likedComments));
        }
    };

    const canLikeComment = (commentId: number) => {
        const likedComments = JSON.parse(localStorage.getItem('likeWorkComments') || '{}');
        return !likedComments[commentId];
    };


    return (
        <div className="p-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-slate-700 dark:text-blue-400">
                        ความคิดเห็น ({work.comments.length})
                    </h4>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2"
                >
                    {showComments ? (
                        <>ซ่อนความคิดเห็น <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>ดูความคิดเห็น <ChevronDown className="w-4 h-4" /></>
                    )}
                </Button>
            </div>

            {showComments && (
                <div className="space-y-4">
                    {/* Comment Input */}
                    <div className="flex items-center gap-3">
                        <Textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="เขียนความคิดเห็น..."
                            className="flex-grow"
                        />
                        <Button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                        >
                            <SendHorizontal className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Top Comments */}
                    <div className="space-y-3">
                        {work.comments.map((comment) => {
                            return (
                                <div
                                    key={comment.id}
                                    className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                                >
                                    <div className="flex items-center justify-center relative w-10 h-10 rounded-full overflow-hidden">
                                        <User />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <h5 className="font-semibold text-slate-700 dark:text-slate-200">
                                                นักเรียน
                                            </h5>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {formatRelativeTime(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                                            {comment.message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                disabled={!canLikeComment(comment.id) ? true : false}
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleLikeComment(comment.id)}
                                                className="flex items-center gap-1"
                                            >
                                                <Heart
                                                    fill={!canLikeComment(comment.id) ? 'currentColor' : 'none'}

                                                    className="w-4 h-4 text-red-400" />
                                                <span>{comment.like.toString()}</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Comment