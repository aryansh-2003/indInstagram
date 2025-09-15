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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb- max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center  space-x-3">
                 <DisplayPic className={'w-8 h-8 '} userdetails={userdetails ? userdetails.documents[0] : null}/>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900">
               <button onClick={userNameHandler}>{userdetails? userdetails.documents?.[0]?.username : "Loading..."}</button>
            </span>
            <span className="text-xs text-gray-500">2h</span>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Image */}
      <Link to={`/post/${$id}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img 
            src={appwriteService.getFilePreiview(featuredImage)} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
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

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm"></span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <Link to={`/post/${$id}`}>
            <span className="font-semibold text-sm text-gray-900 mr-2">
              {userdetails?.name}
            </span>
            <span className="text-sm text-gray-900">
              {title.length > 50 ? `${title.substring(0, 50)}...` : title}
            </span>
          </Link>
        </div>

        {/* View Comments */}
        <Link to={`/post/${$id}`} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
          View all 23 comments
        </Link>

        {/* Add Comment */}
        <div className="mt-3 flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="Add a comment..."
            className="flex-1 text-sm placeholder-gray-400 border-none outline-none"
          />
          <button className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard