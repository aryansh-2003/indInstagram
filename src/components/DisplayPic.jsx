import React from 'react'
import { MoreHorizontal, Grid3X3, Bookmark, Tag, User, Plus, Heart, MessageCircle, Settings, Edit3 } from 'lucide-react';
import userService from '../appwrite/user.js'



function DisplayPic({userdetails,
  className = "",
}) {
  return (
    <div className="flex justify-center lg:justify-start">
         <div className="relative">
             <div className={` overflow-hidden  rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center  justify-center ${className}`}>
                 <img className='rounded-full overflow-hidden ' src={userdetails ? userService.getFilePreiview(userdetails.avatar) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            </div>
        </div>
    </div>
  )
}

export default DisplayPic