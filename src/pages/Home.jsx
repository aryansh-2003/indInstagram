import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setposts] = useState([])
    const value = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (value) {
            appwriteService.getPosts().then((posts) => {
                if (posts) setposts(posts.documents)
                    console.log(posts)
            })
        }
    }, [value])

    if (!value) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="max-w-md mx-auto text-center p-8">
                    <div className="mb-8">
                        <svg className="mx-auto h-20 w-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 mb-4">Welcome to Instagram</h1>
                    <p className="text-gray-600 mb-8">Sign up to see photos and videos from your friends.</p>
                    <div className="space-y-4">
                        <a href="/login" className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                            Log In
                        </a>
                        <a href="/signup" className="block w-full border border-gray-300 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="text-center py-20">
                    <div className="mb-8">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-light text-gray-900 mb-2">No Posts Yet</h2>
                    <p className="text-gray-600 mb-6">When people you follow share photos, you'll see them here.</p>
                    <a href="/add-post" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Share your first photo
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Stories Section */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                        {/* Add Your Story */}
                        <div className="flex-shrink-0 text-center">
                            <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-xs mt-1 text-gray-600">Your story</p>
                        </div>
                        
                        {/* Sample Stories */}
                        {[1,2,3,4,5].map((i) => (
                            <div key={i} className="flex-shrink-0 text-center">
                                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5">
                                    <div className="w-full h-full bg-gray-300 rounded-full"></div>
                                </div>
                                <p className="text-xs mt-1 text-gray-600 truncate w-14">user{i}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Feed */}
            <div className="max-w mx-auto px-4 py-4">
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Sidebar - Hidden on mobile */}
            {/* <div className="hidden xl:block fixed right-8 top-20 w-80">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Suggestions for you</h3>
                    <div className="space-y-3">
                        {[1,2,3].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-semibold">suggested_user_{i}</p>
                                        <p className="text-xs text-gray-600">Follows you</p>
                                    </div>
                                </div>
                                <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Home