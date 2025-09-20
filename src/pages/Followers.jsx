import React, { useState } from 'react';
import { ArrowLeft, Search, MoreHorizontal } from 'lucide-react';
import userService from '../appwrite/user'
import { useParams } from 'react-router-dom';

const FollowersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followeruser, setfolloweruser] = useState();
  const [activeTab, setActiveTab] = useState('followers');
  const userId = useParams()


  
  // Mock followers data

  const follower = async () =>{
    const service = await userService.getSubscription("",userId.userId)
    // setfolloweruser(service)
    console.log(service)
    // const data = service.documents.map((doc) => doc.follower)
    const id = service.documents.splice
    console.log(id)
    
    // if(data){
    //   const follow = await userService.getUserAccnt(data.map((doc,index) => doc?.[index]))
    //   console.log(data.forEach((doc)=>{return doc}))
    // }

  }
  follower()
  
  const followers = [
    { id: 1, username: 'alex_photo', name: 'Alex Photography', avatar: '/api/placeholder/40/40', isFollowing: false, isFollower: true },
    { id: 2, username: 'sarah_travels', name: 'Sarah Wilson', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: true },
    { id: 3, username: 'mike_fitness', name: 'Mike Johnson', avatar: '/api/placeholder/40/40', isFollowing: false, isFollower: true },
    { id: 4, username: 'emma_art', name: 'Emma Rodriguez', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: true },
    { id: 5, username: 'john_music', name: 'John Smith', avatar: '/api/placeholder/40/40', isFollowing: false, isFollower: true },
    { id: 6, username: 'lisa_food', name: 'Lisa Chen', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: true },
    { id: 7, username: 'david_tech', name: 'David Brown', avatar: '/api/placeholder/40/40', isFollowing: false, isFollower: true },
    { id: 8, username: 'anna_design', name: 'Anna Taylor', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: true },
  ];

  const following = [
    { id: 1, username: 'natgeo', name: 'National Geographic', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: false },
    { id: 2, username: 'nike', name: 'Nike', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: false },
    { id: 3, username: 'spotify', name: 'Spotify', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: false },
    { id: 4, username: 'netflix', name: 'Netflix', avatar: '/api/placeholder/40/40', isFollowing: true, isFollower: false },
  ];

  const [followStates, setFollowStates] = useState({});

  const toggleFollow = (userId) => {
    setFollowStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const currentList = activeTab === 'followers' ? followers : following;
  
  const filteredUsers = currentList.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen w-full max-w-none sm:max-w-md sm:mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-black">
        <ArrowLeft className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
        <h1 className="text-lg font-semibold text-white">suitspeacock</h1>
        <MoreHorizontal className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 bg-black">
        <button
          onClick={() => setActiveTab('followers')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'followers'
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          1,403 followers
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'following'
              ? 'text-white border-b-2 border-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          1.4M following
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-black">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-colors border-0"
          />
        </div>
      </div>

      {/* Users List */}
      {/* <div className="px-4 pb-4 bg-black">
        {followeruser ? followeruser.documents.map((user) => {   
          console.log(followeruser.documents)       
          return (
            <div key={user.id} className="flex items-center justify-between py-3 hover:bg-gray-900 hover:bg-opacity-50 rounded-lg px-2 transition-colors">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-black rounded-full p-0.5">
                    <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {user.username[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm sm:text-base text-white truncate">
                    {user.username}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 truncate">
                    {user.name}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                {activeTab === 'followers' ? (
                  <>
                  </>
                ) : (
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    Following
                  </button>
                )}
              </div>
            </div>
          );
        }) : null}
      </div> */}

      {/* Empty state */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-black">
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default FollowersPage;