import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

function Home() {
    const [posts,setpots] = useState([])
    const value = useSelector((state)=> state.auth.status)

    useEffect(()=>{
        if(value){
            appwriteService.getPosts().then((posts)=>{
                if (posts) setpots(posts.documents)
            })
        }
        
    })

    
    if (posts.length == 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

  return (
    <>

    <h1>hi</h1>
    <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col items-center scroll-auto overflow-y-scroll'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2'>
                           <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        </>
  )
}

export default Home