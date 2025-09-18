import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import authservice from '../appwrite/auth'
import { useSelector } from 'react-redux'
import {Likes} from '../components'
import parse from "html-react-parser";
import { Link } from 'react-router-dom'
import Comment from '../components/Comment'

function Post() {
    const [post, setpost] = useState()
    const [postAuthor, setPostAuthor] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setpost(post)
                    // Get author details
                    authservice.getUserInfo(post.userId).then((author) => {
                        setPostAuthor(author)
                    })
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    const deletePost = () => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) appwriteService.deleteFile(post.featuredImage);
                navigate('/')
            })
        }
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="lg:w-3/5 bg-black flex items-center justify-center">
                            <img
                                src={appwriteService.getFilePreiview(post.featuredImage)}
                                alt={post.title}
                                className="max-w-full max-h-screen object-contain"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-2/5 flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5">
                                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-gray-700">
                                                {postAuthor?.name?.charAt(0)?.toUpperCase() || '?'}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm text-gray-900">
                                            {postAuthor?.name || "Loading..."}
                                        </span>
                                    </div>
                                </div>
                                
                                {isAuthor && (
                                    <div className="flex items-center space-x-2">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={deletePost}
                                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Comments Section */}
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
                                {/* Caption */}
                                <div className="flex space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-0.5 flex-shrink-0">
                                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                            <span className="text-xs font-semibold text-gray-700">
                                                {postAuthor?.name?.charAt(0)?.toUpperCase() || '?'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-semibold text-sm mr-2">{postAuthor?.name}</span>
                                        <span className="text-sm">{post.title}</span>
                                        {post.content && (
                                            <div className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none">
                                                {parse(post.content)}
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-500 mt-1">2h</div>
                                    </div>
                                </div>

                                {/* Comments */}
                                <Comment post={post} userData={userData}/>
                            </div>

                            {/* Actions */}
                            <div className="border-t border-gray-200">
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center space-x-4">
                                        <Likes post={post} userData={userData}/>
                                        <button className="hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>
                                        <button className="hover:text-gray-600 transition-colors">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="hover:text-gray-600 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post