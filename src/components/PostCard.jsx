import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config.js'
import authservice from '../appwrite/auth.js'
import userService from '../appwrite/user.js'
import { Link, useNavigate } from 'react-router-dom'
import InstagramUserPanel from '../user-pannel/UserPannel.jsx'
import DisplayPic from './DisplayPic.jsx'


function PostCard({$id, title, featuredImage, userId}) {
  const [userdetails, setuserdetails] = useState()
  authservice.getUserInfo({userId:"68b129aa0024454ceb67"}).then((user)=>{
  })

  const navigate = useNavigate()

  useEffect(() => {
    const userDetails = async () => {
      const details = await userService.getUserAccnt(userId)
      setuserdetails(details)
    }
    userDetails()
  }, [userId])


  const userNameHandler = () => {
    console.log(userdetails)
    navigate(`/user/${userdetails.documents[0]?.$id}`)
  }

  return (
    <div className="bg-black border-b border-gray-800 text-white pb-6 overflow-hidden max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <DisplayPic className={'w-8 h-8 '} userdetails={userdetails ? userdetails.documents[0] : null}/>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-white">
               <button onClick={userNameHandler}>
                 {userdetails? userdetails.documents?.[0]?.username : "Loading..."}
               </button>
            </span>
            <span className="text-xs text-gray-400">2h</span>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="12" cy="5" r="1.5"></circle>
            <circle cx="12" cy="19" r="1.5"></circle>
          </svg>
        </button>
      </div>

      {/* Image */}
      <Link to={`/post/${$id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={appwriteService.getFilePreiview(featuredImage)} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="hover:text-gray-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="hover:text-gray-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <button className="hover:text-gray-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="text-sm font-semibold text-white">
            142 likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <Link to={`/post/${$id}`}>
            <span className="font-semibold text-sm text-white mr-2">
              {userdetails?.documents?.[0]?.username || "user"}
            </span>
            <span className="text-sm text-white">
              {title.length > 100 ? `${title.substring(0, 100)}...` : title}
            </span>
          </Link>
        </div>

        {/* View Comments */}
        <Link to={`/post/${$id}`} className="text-sm text-gray-400 hover:text-gray-300 transition-colors block mb-2">
          View all 23 comments
        </Link>

        {/* Add Comment */}
        <div className="flex items-center space-x-3 mt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent text-white placeholder-gray-400 border-none outline-none"
          />
          <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard