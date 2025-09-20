import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config";
import userService from "../appwrite/user";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DisplayPic } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [avatar,setavatar] =useState()
    const [loading, setLoading] = useState(true)
    const userDataGet = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if(!userDataGet) return;

        const fetchPosts = async () => {
            try {
                const id = userDataGet.$id
                const postsResponse = await appwriteService.getALLUserPosts(id)
                const data = await userService.getUserAccnt(id)
                console.log(data)
                setavatar(data)
                if (postsResponse && postsResponse.documents) {
                    setPosts(postsResponse.documents)
                    setLoading(false)
                }
            } catch (error) {
                console.log("fetching error", error)
            } finally {
               
               setLoading(false)
            }
        }
        
        fetchPosts()
    }, [userDataGet])

    const getAvatar = async () =>{
        const avatarid = await userService.getPost(userDataGet.$id)
        console.log(avatarid.avatar)
        const avatar = await userService.getFilePreiview(avatarid.avatar)
        console.log(avatar)
        setavatar(avatar)
    }
    
    const handleavatarupload = async (e) =>{
            const file = await e.target.files[0]
            const fileupload = e.target.files[0] ? await userService.uploadFile(file) : null

            if(fileupload){
                try {
                   const result = await userService.updatePost(userDataGet.$id,{avatar:fileupload.$id})
                   if(result) getAvatar()
                } catch (error) {
                    console.log(error)
                }
            }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Profile Header */}
            <div className="bg-black border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
                        {/* Profile Picture */}
                        <div className="flex justify-center lg:justify-start relative">
                            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-1">
                                <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                                    <DisplayPic className='w-full h-full' userdetails={avatar ? avatar.documents?.[0] : null}></DisplayPic>
                                </div>
                            </div>
                        </div>
                             
                        {/* Profile Info */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 mb-6">
                                <h1 className="text-2xl font-light text-white mb-4 lg:mb-0">
                                    {avatar?.documents?.[0]?.username || userDataGet?.name || 'User'}
                                </h1>
                                <div className="flex justify-center lg:justify-start space-x-3">
                                    <Link 
                                        to="/add-post"
                                        className="px-6 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        Edit profile
                                    </Link>
                                    <button className="px-6 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors">
                                        Share profile
                                    </button>
                                    <label className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                                        📸
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={handleavatarupload} 
                                            accept="image/*"
                                        />                     
                                    </label>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-center lg:justify-start space-x-10 mb-6">
                                <div className="text-center lg:text-left">
                                    <span className="text-lg font-semibold text-white block">
                                        {posts.length}
                                    </span>
                                    <span className="text-sm text-gray-400">posts</span>
                                </div>
                                <div className="text-center lg:text-left">
                                    <span className="text-lg font-semibold text-white block">854</span>
                                    <span className="text-sm text-gray-400">followers</span>
                                </div>
                                <div className="text-center lg:text-left">
                                    <span className="text-lg font-semibold text-white block">162</span>
                                    <span className="text-sm text-gray-400">following</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="text-sm text-white">
                                <p className="font-semibold mb-1">{userDataGet?.name}</p>
                                <p className="text-gray-400">📸 Life moments captured</p>
                                <p className="text-gray-400">🌟 Living the dream</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 border-2 border-white rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-light text-white mb-4">Share Photos</h2>
                        <p className="text-gray-400 mb-8">When you share photos, they will appear on your profile.</p>
                        <Link 
                            to="/add-post"
                            className="inline-flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                        >
                            Share your first photo
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Posts Header */}
                        <div className="border-t border-gray-800 mb-8">
                            <div className="flex justify-center">
                                <button className="flex items-center space-x-2 py-4 px-8 border-t border-white text-white text-xs font-semibold tracking-widest uppercase">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                        <rect x="7" y="7" width="10" height="10" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <span>Posts</span>
                                </button>
                            </div>
                        </div>
                          
                        {/* Grid */}
                    <div className="grid grid-cols-3 gap-1 md:gap-6">
                            {posts.map((post) => (
                                <Link 
                                    key={post.$id} 
                                    to={`/post/${post.$id}`}
                                    className="group relative aspect-square bg-gray-100 overflow-"
                                >
                                    <img
                                        src={appwriteService.getFilePreiview(post?.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-10  bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-6">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                </svg>
                                                <span className="font-semibold">0</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M21 6h-2l-1.27-1.27A2 2 0 0 0 16.32 4h-8.64a2 2 0 0 0-1.41.59L5 6H3a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1zM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/>
                                                </svg>
                                                <span className="font-semibold">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AllPosts