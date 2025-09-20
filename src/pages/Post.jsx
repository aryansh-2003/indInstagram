import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import userService from '../appwrite/user'
import { DisplayPic, Likes, Comment } from '../components'

function Post() {
    const [post, setPost] = useState(null)
    const [userdetails, setuserdetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                try {
                    const postData = await appwriteService.getPost(slug)
                    if (postData) {
                        setPost(postData)
                        const userDetails = await userService.getUserAccnt(postData.userId)
                        setuserdetails(userDetails)
                    }
                } catch (error) {
                    console.log('Error fetching post:', error)
                    navigate('/')
                } finally {
                    setLoading(false)
                }
            }
            fetchPost()
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const userNameHandler = () => {
        if (userdetails?.documents?.[0]?.$id) {
            navigate(`/user/${userdetails.documents[0].$id}`)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-light mb-4">Post not found</h2>
                    <Link to="/" className="text-blue-400 hover:text-blue-300">
                        Go back to home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-semibold text-white">Posts</h1>
                        <div className="w-6"></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                    <div className="lg:flex">
                        {/* Image Section */}
                        <div className="lg:flex-1 lg:max-w-2xl">
                            <div className="aspect-square bg-black">
                                <img
                                    src={appwriteService.getFilePreiview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-80 lg:flex lg:flex-col">
                            {/* Post Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                                <div className="flex items-center space-x-3">
                                    <DisplayPic 
                                        className="w-8 h-8" 
                                        userdetails={userdetails?.documents?.[0]} 
                                    />
                                    <div>
                                        <button 
                                            onClick={userNameHandler}
                                            className="font-semibold text-sm text-white hover:text-gray-300 transition-colors"
                                        >
                                            {userdetails?.documents?.[0]?.username || 'Loading...'}
                                        </button>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="1.5"></circle>
                                        <circle cx="12" cy="5" r="1.5"></circle>
                                        <circle cx="12" cy="19" r="1.5"></circle>
                                    </svg>
                                </button>
                            </div>

                            {/* Comments Section - Scrollable */}
                            <div className="flex-1 lg:h-64 lg:max-h-96">
                                {/* Caption */}
                                <div className="p-4 border-b border-gray-800">
                                    <div className="flex space-x-3">
                                        <DisplayPic 
                                            className="w-8 h-8 flex-shrink-0" 
                                            userdetails={userdetails?.documents?.[0]} 
                                        />
                                        <div className="flex-1">
                                            <div className="mb-1">
                                                <span className="font-semibold text-sm text-white mr-2">
                                                    {userdetails?.documents?.[0]?.username || 'user'}
                                                </span>
                                                <span className="text-sm text-white">
                                                    {post.title}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments with Custom Scrollbar */}
                                <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: '300px' }}>
                                    <div className="p-4">
                                        <Comment post={post} userData={userData} />
                                    </div>
                                </div>
                            </div>

                            {/* Actions Section - Fixed at bottom */}
                            <div className="border-t border-gray-800">
                                {/* Action Buttons */}
                                <div className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Likes post={post} userData={userData} />
                                            <button className="hover:text-gray-400 transition-colors">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </button>
                                            <button className="hover:text-gray-400 transition-colors">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button className="hover:text-gray-400 transition-colors">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {/* Timestamp */}
                                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                                        2 hours ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937;
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4b5563;
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6b7280;
                }

                /* Firefox scrollbar */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #4b5563 #1f2937;
                }
            `}</style>
        </div>
    )
}

export default Post