import React from 'react'
import { useForm } from 'react-hook-form'
import interservice from '../appwrite/interaction'
import authservice from '../appwrite/auth'
import userService from '../appwrite/user'
import { useEffect, useState } from 'react'
import { DisplayPic } from './index'

function Comment({post, userData}) {
    const [allComments, setAllComments] = useState([])
    const [commentsWithAuthors, setCommentsWithAuthors] = useState([])
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const fetchComments = async () => {
        if (!post) return
        
        try {
            const commentList = await interservice.getTotalComments({postId: post.$id})
            if (commentList && commentList.documents) {
                setAllComments(commentList.documents)
                
                // Fetch author details for each comment
                const commentsWithAuthors = await Promise.all(
                    commentList.documents.map(async (comment) => {
                        try {
                            const author = await userService.getUserAccnt(comment.ownerId)
                            return {
                                ...comment,
                                author: author || { documents: [{ username: 'Unknown User' }] }
                            }
                        } catch (error) {
                            return {
                                ...comment,
                                author: { documents: [{ username: 'Unknown User' }] }
                            }
                        }
                    })
                )
                setCommentsWithAuthors(commentsWithAuthors)
            }
        } catch (error) {
            console.log('Error fetching comments:', error)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [post])

    const addComment = async (data) => {
        if (!data.comment.trim() || !userData || loading) return
        
        setLoading(true)
        try {
            const response = await interservice.createComment(userData.$id, {
                postId: post.$id,
                comment: data.comment
            })
            
            if (response) {
                reset() // Clear the input
                fetchComments() // Refresh comments
            }
        } catch (error) {
            console.log('Error adding comment:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatTimeAgo = (timestamp) => {
        // Simple time formatting - you can enhance this
        return '2h'
    }

    return (
        <div className="space-y-4">
            {/* Comments List */}
            <div className="space-y-4">
                {commentsWithAuthors.length > 0 ? (
                    commentsWithAuthors.map((comment) => (
                        <div key={comment.$id} className="flex space-x-3">
                            <div className="flex-shrink-0">
                                <DisplayPic 
                                    className="w-8 h-8" 
                                    userdetails={comment.author?.documents?.[0]} 
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-1">
                                            <span className="font-semibold text-sm text-white mr-2">
                                                {comment.author?.documents?.[0]?.username || 'Unknown User'}
                                            </span>
                                            <span className="text-sm text-white break-words">
                                                {comment.comment}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <span className="text-xs text-gray-400">
                                                {formatTimeAgo(comment.$createdAt)}
                                            </span>
                                            <button className="text-xs text-gray-400 hover:text-gray-300 font-semibold transition-colors">
                                                Reply
                                            </button>
                                            <button className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-gray-500 text-sm">No comments yet</p>
                        <p className="text-gray-600 text-xs mt-1">Start the conversation</p>
                    </div>
                )}
            </div>

            {/* Add Comment Form - Fixed at bottom */}
            <div className="border-t border-gray-800 pt-4 mt-4 sticky bottom-0 bg-black">
                <form onSubmit={handleSubmit(addComment)}>
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <DisplayPic 
                                className="w-8 h-8" 
                                userdetails={userData} 
                            />
                        </div>
                        <div className="flex-1 flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="flex-1 text-sm bg-transparent text-white placeholder-gray-400 border-none outline-none py-2"
                                {...register("comment", {
                                    required: true,
                                })}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                disabled={loading || !userData}
                                className={`text-blue-400 text-sm font-semibold transition-colors px-2 py-1 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-300'
                                }`}
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Comment