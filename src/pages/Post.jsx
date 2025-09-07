import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import {Container, Button, Likes, Input} from '../components'
import parse from "html-react-parser";
import { Link } from 'react-router-dom'
import interservice from '../appwrite/interaction'
import Comment from '../components/Comment'


function Post() {
    const [post,setpost] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=>state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(()=>{
        if(slug) {
            
            appwriteService.getPost(slug).then((post)=>{
                const like  = interservice.getLikes(userData.$id)
                console.log(like)
                if (post) setpost(post)
            })
        }else{
            navigate('/')
        }
       
    },[slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status)=>{
            if (status) appwriteService.deleteFile(post.featuredImage);
            navigate('/')
        })
    }


  return post ? (
            <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                   
                    <img
                        await src={appwriteService.getFilePreiview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
                    <Likes post={post} userData={userData}/>
                    <Comment post={post} userData={userData}/>
           
            </Container>
        </div>
  ) : null
}

export default Post