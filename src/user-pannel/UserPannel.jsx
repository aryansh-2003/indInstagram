import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Grid3X3, Bookmark, Tag, User, Plus, Heart, MessageCircle, Settings, Edit3 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../appwrite/user.js'
import appwriteService from '../appwrite/config.js'
import {FollowBtn} from '../components/index.js'
import {DisplayPic} from '../components/index.js'




function InstagramUserPanel () {
    
  const [activeTab, setActiveTab] = useState('posts');
  const [userdetails,setuserdetails] = useState()
  const [isFollowing, setIsFollowing]  = useState(false);
  const [posts, setPosts] = useState()
  const userId = useParams()
  const navigate = useNavigate()
//   console.log(userId)

    useEffect(()=>{
        const user = async() =>{
        const details = await userService.getPost(userId.userId)
        //  console.log(details)
        setuserdetails(details)
        fetchPosts(details) 
    }

        const fetchPosts = async (details) => {
            if(!details) return;
            try {
                const id = details.$id
                const postsResponse = await appwriteService.getALLUserPosts(id)
                
                if (postsResponse && postsResponse.documents) {
                    setPosts(postsResponse.documents)
                }
            } catch (error) {
                console.log("fetching error", error)
            } finally {
               
               
            }
        }
        
       
      user()
    })

    const navigationHandler = (id) =>{
      navigate(`/post/${id}`)
    }


  const userStats = {
    posts: 1245,
    followers: '10K',
    following: 325
  };

  const stories = [
    { id: 1, title: 'New', color: 'bg-gradient-to-br from-blue-500 to-blue-600', icon: Plus },
    { id: 2, title: 'Story 1', color: 'bg-gradient-to-br from-pink-500 to-orange-400', image: '/api/placeholder/80/80' },
    { id: 3, title: 'Story 2', color: 'bg-gradient-to-br from-gray-600 to-gray-700', image: '/api/placeholder/80/80' },
    { id: 4, title: 'Story 3', color: 'bg-gradient-to-br from-gray-600 to-gray-700', image: '/api/placeholder/80/80' },
    { id: 5, title: 'Story 4', color: 'bg-gradient-to-br from-gray-600 to-gray-700', image: '/api/placeholder/80/80' }
  ];


  const tabItems = [
    { key: 'posts', icon: Grid3X3, label: 'Posts' },
    { key: 'reels', icon: User, label: 'Reels' },
    { key: 'saved', icon: Bookmark, label: 'Saved' },
    { key: 'tagged', icon: Tag, label: 'Tagged' }
  ];


  return (
    <div className="max-w-4xl mx-auto bg-black text-white min-h-screen">
      {/* Profile Header */}
      <div className="px-6 py-8 border-b border-gray-800">
        {/* Top Section with Username and Actions */}
        <div className="flex items-center justify-between mb-8">
          {/* <h1 className="text-2xl font-light">j_doe</h1> */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12 space-y-6 lg:space-y-0">
          {/* Profile Picture */}
          {/* <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-32 h-32 overflow-hidden lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center  justify-center">
                <img className='rounded-full overflow-hidden ' src={userdetails ? userService.getFilePreiview(userdetails.avatar) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
              </div>
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div> */}
          <DisplayPic className={`w-32 h-32`}userdetails ={userdetails}/>



          {/* Profile Details */}
          <div className="flex-1 text-center lg:text-left">
            {/* Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 mb-6">
              <div className="text-center">
                <div className="text-xl font-semibold">{userStats.posts}</div>
                <div className="text-sm text-gray-400">publications</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">{userStats.followers}</div>
                <div className="text-sm text-gray-400">
                  <button onClick={() => navigate(`/followers/${userId.userId}`)}>
                  followers
                  </button>
                  </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">{userStats.following}</div>
                <div className="text-sm text-gray-400">following</div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex justify-center lg:justify-start space-x-3 mb-6">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-8 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <MessageCircle size={16} />
              </button>

            </div> */}
            <FollowBtn followedId={userId}/>

            {/* Bio */}
            <div className="space-y-2">
              <h2 className="font-semibold">{userdetails ? userdetails.username : "...Loading"}</h2>
              <p className="text-sm text-gray-300">Personal blog</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Excepteur sint occaecat cupidatat non proident sunt<br/>
                in culpa qui officia deserunt mollit anim id<br/>
                est laborum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories/Highlights Section */}
      {/* <div className="px-6 py-6 border-b border-gray-800">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className={`w-20 h-20 rounded-full ${story.color} flex items-center justify-center overflow-hidden`}>
                {story.icon ? (
                  <story.icon size={24} className="text-white" />
                ) : (
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                )}
              </div>
              <span className="text-xs text-gray-300">{story.title}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex justify-center">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-4 border-t-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-6 py-6">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
            {posts ? posts.map((post) => (
              
              <div key={post.$id} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden group cursor-pointer">
                <button onClick={() => navigationHandler(post.$id)}>
                <img 
                  src={userService.getFilePreiview(post?.featuredImage)} 
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2 text-white">
                    <Heart size={20} fill="white" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <MessageCircle size={20} fill="white" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
                </button>
              </div>
            )) : null}
          </div>
        )}

        {activeTab !== 'posts' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
              {tabItems.find(tab => tab.key === activeTab)?.icon && 
                React.createElement(tabItems.find(tab => tab.key === activeTab).icon, { size: 24, className: "text-gray-600" })
              }
            </div>
            <h3 className="text-xl font-light text-gray-400">
              {activeTab === 'reels' && 'No Reels Yet'}
              {activeTab === 'saved' && 'No Saved Posts'}
              {activeTab === 'tagged' && 'No Tagged Posts'}
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              {activeTab === 'reels' && 'Share photos and videos to get started'}
              {activeTab === 'saved' && 'Save posts to see them here'}
              {activeTab === 'tagged' && 'When people tag you, it will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-20 right-4 lg:hidden">
        <button className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
          <Plus size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default InstagramUserPanel;