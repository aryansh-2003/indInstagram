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
    <div className="bg-black border-b-1 border-gray-500  text-white  pb-4 overflow-hidden mb- max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center  space-x-3">
                 <DisplayPic className={'w-8 h-8 '} userdetails={userdetails ? userdetails.documents[0] : null}/>
          <div className="flex flex-col">
            <span className="font-semibold text-sm ">
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
        <div className="aspect-square overflow-hidden">
          <img 
            src={appwriteService.getFilePreiview(featuredImage)} 
            alt={title}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform border-1 border-gray-500 duration-300"
          />
        </div>
      </Link>


      <div className="p-4">
        

      

        {/* Caption */}
        <div className="mb-2">
          <Link to={`/post/${$id}`}>
            <span className="font-semibold text-sm  mr-2">
              {userdetails?.name}
            </span>
            <span className="text-sm ">
              {title.length > 50 ? `${title.substring(0, 50)}...` : title}
            </span>
          </Link>
        </div>

        {/* View Comments */}
        <Link to={`/post/${$id}`} className=" text-sm hover:text-gray-700 transition-colors">
          View all 23 comments
        </Link>

      </div>
    </div>
  )
}

export default PostCard