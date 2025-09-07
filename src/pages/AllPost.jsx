import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function AllPosts() {
    

    const [posts, setPosts] = useState([])
    const userDataGet = useSelector((state) => state.auth.userData)

    useEffect(()=>{
        if(!userDataGet) return;

        const fetchPosts = async () =>{
            const id = await userDataGet.$id
            
        try {
            appwriteService.getALLUserPosts(id).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    console.log(posts.documents)
                }else{
                   
                }
            })
            
        } catch (error) {
            console.log("fetching error",error)
        }
       
        }
        fetchPosts()
    },[userDataGet])



  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-col'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts