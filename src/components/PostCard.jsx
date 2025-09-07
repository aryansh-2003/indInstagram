import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config.js'
import authservice from '../appwrite/auth.js'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage,userId}) {


  const [userdetails,setuserdetails] = useState()
  useEffect(()=>{
      // console.log(authservice.getUserInfo(userId))
  const userDetails = async () =>{
    const details = await authservice.getUserInfo(userId)
    // console.log(details)
    setuserdetails(details)
  }
  userDetails()
  })

  return (
    <Link to = {`/post/${$id}`}>
         <div className=' h-[80%] rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <h1>{userdetails ? userdetails.name : "...Loading"}</h1>
                <img src={appwriteService.getFilePreiview(featuredImage)} alt={title}
                className='rounded-xl w-[80%]' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard