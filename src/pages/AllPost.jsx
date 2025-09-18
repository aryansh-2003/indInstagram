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
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-8">
                        {/* Profile Picture */}
                        <div className="flex justify-center md:justify-start relative">
                            <div className="w-32 h-32 bg-gradient-to-r   from-purple-400 to-pink-400 rounded-full p-1">
                                <div className="w-full h-full  bg-white  rounded-full flex items-center justify-center">
                                    {/* {avatar ? <img className='rounded-full absolute' src={avatar} alt="empty" /> :
                                    userDataGet?.name?.charAt(0)?.toUpperCase() || 'U'} */}
                                     <DisplayPic className='w-30 h-30' userdetails={avatar ? avatar.documents?.[0] : null}></DisplayPic>
                                    {/* <input type="file" className="text-[3px] absolute z-50" onChange={handleavatarupload} id="myFile" name="filename"/>  */}
                                </div>
                            </div>
                        </div>
                             
                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                                <h1 className="text-2xl font-light text-gray-900 mb-2 md:mb-0">
                                    {userDataGet?.name || 'User'}
                                </h1>
                                <div className="flex justify-center md:justify-start space-x-2">
                                    <Link 
                                        to="/add-post"
                                        className="px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        New Post
                                    </Link>
                                    <label>New Dp</label>
                                    <input type="file" className="px-4 py-1 w-20 border  border-gray-300 text-gray-900 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors"
                                     onChange={handleavatarupload} id="myFile" name="filename"/>                     
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-center md:justify-start space-x-8 mb-4">
                                <div className="text-center">
                                    <span className="text-lg font-semibold text-gray-900 block">
                                        {posts.length}
                                    </span>
                                    <span className="text-sm text-gray-600">posts</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-lg font-semibold text-gray-900 block">0</span>
                                    <span className="text-sm text-gray-600">followers</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-lg font-semibold text-gray-900 block">0</span>
                                    <span className="text-sm text-gray-600">following</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="text-sm text-gray-900">
                                <p className="font-semibold mb-1">{userDataGet?.name}</p>
                                <p className="text-gray-600">Welcome to my Instagram profile!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 border-2 border-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-light text-gray-900 mb-2">Share Photos</h2>
                        <p className="text-gray-600 mb-6">When you share photos, they will appear on your profile.</p>
                        <Link 
                            to="/add-post"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Share your first photo
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Posts Header */}
                        <div className="border-t border-gray-200 mb-6">
                            <div className="flex justify-center">
                                <button className="flex items-center space-x-1 py-4 px-6 border-t-2 border-gray-900 text-gray-900 text-xs font-semibold tracking-widest uppercase">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M3 3h18v18H3V3zm16 16V5H5v14h14zM8 8h8v8H8V8zm2 2v4h4v-4h-4z" clipRule="evenodd" />
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