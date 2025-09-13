import React from 'react'
import { useForm } from 'react-hook-form'
import interservice from '../appwrite/interaction'
import authservice from '../appwrite/auth'
import userService from '../appwrite/user'
import { useEffect, useState } from 'react'

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
                            console.log(comment.ownerId)
                            console.log(author)
                            return {
                                ...comment,
                                author: author || { name: 'Unknown User' }
                            }
                        } catch (error) {
                            return {
                                ...comment,
                                author: { name: 'Unknown User' }
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

    return (
        <div className="space-y-4">
            {/* Comments List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {commentsWithAuthors.length > 0 ? (
                    commentsWithAuthors.map((comment) => (
                        console.log(comment.author.documents?.[0]?.username),
                        <div key={comment.$id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5 flex-shrink-0">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                    <span className="text-xs font-semibold text-gray-700">
                                        {comment.author.documents?.[0]?.username.charAt(0)?.toUpperCase() || '?'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <span className="font-semibold text-sm mr-2">
                                    {comment.author.documents?.[0]?.username || 'Unknown User'}
                                </span>
                                <span className="text-sm text-gray-900">
                                    {comment.comment}
                                </span>
                                <div className="flex items-center space-x-4 mt-1">
                                    <span className="text-xs text-gray-500">2h</span>
                                    <button className="text-xs text-gray-500 hover:text-gray-700 font-semibold">
                                        Reply
                                    </button>
                                    <button className="text-xs text-gray-500 hover:text-red-500">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit(addComment)} className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5 flex-shrink-0">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-gray-700">
                                {userData?.name?.charAt(0)?.toUpperCase() || 'Y'}
                            </span>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 text-sm placeholder-gray-400 border-none outline-none bg-transparent"
                        {...register("comment", {
                            required: true,
                        })}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`text-blue-500 text-sm font-semibold transition-colors ${
                            loading ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-700'
                        }`}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Comment