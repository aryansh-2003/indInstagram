import React from 'react'
import { useForm } from 'react-hook-form'
import  { Input,Button } from '../components'
import interservice, { interService } from '../appwrite/interaction'
import { useEffect } from 'react'
import { useState } from 'react'

function Comment({post,userData}) {
 

  const[allcomment,setallcomment] = useState("")

const allComments = async () =>{
  const commentList = await interservice.getTotalComments({postId:post.$id})
  if(commentList) {
    setallcomment(commentList)
  }
}

allComments()

// allcomment?.documents.map((comment)=>{console.log(comment)})
  
  const { register, handleSubmit} = useForm()

  const comment = async (data) =>{
    if (!data) return 
    console.log(data.comment)
    const response  = await interservice.createComment(userData.$id,{postId:post.$id,comment:data.comment})
    console.log(response)
  }

  return (
    <>
          <form onSubmit={handleSubmit(comment)} method="POST" className="space-y-6">
                <Input
                label = "Comment"
                placeholder = "Enter your comment"
                type = "text"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("comment",{
                  required: true,
                })}
                >
                </Input>
                <Button
                    type='submit'
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >Sign In
                </Button>
          </form>
                {allcomment ? allcomment?.documents.map((comment)=>{return(
                <>
                <div className='w-full bg-gray-500'>
                <p className='bg-red-400 mb-2'>{comment.comment}</p>
                </div>
                </>)
              }): null}
     </>
  )
}

export default Comment