import React, { useEffect, useState } from 'react'
import { MoreHorizontal, Grid3X3, Bookmark, Tag, User, Plus, Heart, MessageCircle, Settings, Edit3 } from 'lucide-react';
import userService from '../appwrite/user'
import { useSelector } from 'react-redux';
import { stringify } from 'postcss';


function FollowBtn({followedId}) {
      const [isFollowing, setIsFollowing]  = useState(false);
      const followerId = useSelector(state => state ? state.auth.userData.$id : null) 
      const isAuthor = followedId && followerId ? followerId === followedId.userId : false;    
      


      useEffect(()=>{
        if(!followedId || !followerId ) return
        const follow = async () =>{
            const followUser = await userService.getSubscription(followerId , followedId.userId)
            
            if(followUser.total === 0){
                setIsFollowing(false)
            }else{
                setIsFollowing(true)
            }
        }
        follow()
      },[followerId])

      const followHandler = async () =>{
        const follow  = await userService.createUserSubscription(followerId,followedId.userId)
      }
    
      if(isAuthor) return null


  return(
          <div className="flex justify-center lg:justify-start space-x-3 mb-6">
              <button
                onClick={() => {
                    setIsFollowing(!isFollowing)
                    followHandler()
                }}
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
            </div> 
  ) 
}

export default FollowBtn