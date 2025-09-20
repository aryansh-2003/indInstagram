import React, { useEffect, useState } from 'react'
import interservice from '../appwrite/interaction'

function Likes({userData, post}) {
    const [isLiked, setIsLiked] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkLikeStatus = async () => {
            if (!userData || !post) return
            
            try {
                const like = await interservice.getLikes(userData.$id, {postId: post.$id})
                setIsLiked(like.total !== 0 || like.documents.length !== 0)
            } catch (error) {
                console.log('Error checking like status:', error)
            }
        }

        const getTotalLikes = async () => {
            if (!post) return
            
            try {
                const totalLikes = await interservice.getTotalLikes({postId: post.$id})
                setTotalLikes(totalLikes?.total || 0)
            } catch (error) {
                console.log('Error getting total likes:', error)
            }
        }

        checkLikeStatus()
        getTotalLikes()
    }, [userData, post])

    const likeHandler = async () => {
        if (!userData || !post || loading) return
        
        setLoading(true)
        try {
            const result = await interservice.createDocument(userData.$id, {postId: post.$id})
            setIsLiked(result)
            
            // Update total likes count
            const totalLikes = await interservice.getTotalLikes({postId: post.$id})
            setTotalLikes(totalLikes?.total || 0)
        } catch (error) {
            console.log('Error handling like:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col">
            <button 
                className={`transition-all duration-200 ${loading ? 'opacity-50' : 'hover:scale-110'}`}
                onClick={likeHandler}
                disabled={loading}
            >
                <svg 
                    className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-900 hover:text-gray-600'}`}
                    fill={isLiked ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={isLiked ? 0 : 2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                </svg>
            </button>
            {totalLikes > 0 && (
                <span className="text-sm font-semibold text-white mt-2">
                    {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
                </span>
            )}
        </div>
    )
}

export default Likes