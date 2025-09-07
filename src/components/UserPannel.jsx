import React from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwrite/auth'
import { useState } from 'react'

function UserPannel() {
  const id  = useParams()
  const [data,setdata] = useState()


  useState(()=>{
    const userData = async () => {
      const user = await service.getCurrentUser()
      setdata(user)
    }

    userData()
  })

  if(!data) return (<h1>Loading.....</h1>)
  

  return (
  <div className='w-full'>
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <label>Avatar:</label>
      <img></img>
      <h1 className='font-serif'>Name: {data.name} </h1>
      <h1 className='font-serif'>Email: {data.email} </h1>
      <h1 className='font-serif'>Email Verified: {data.emailVerification ? "Done" : "Not Available"} </h1>
      <h1 className='font-serif'>Phone No. : {data.phone} </h1>
      <h1 className='font-serif'>Phone Verification: {data.phoneVerification ? "Done" : "Not Available"} </h1>
    </div>
    hello
  </div>
) 


}

export default UserPannel