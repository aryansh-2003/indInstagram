import React, { useEffect, useState } from 'react'
import interservice from '../appwrite/interaction'


function Likes({userData,post}) {
    const [val, setval] = useState(false)
    const [totallike,settotalLike] = useState("0")

    useEffect(()=>{
        const getlike = async () =>{
            const like = await interservice.getLikes(userData.$id,{postId:post.$id})
            if (like.total !== 0 || like.documents.length !== 0) setval(true)
        }

        getlike()
         
    },[])

    const getTotalLikes = async () =>{
        const totalLikes = await interservice.getTotalLikes({postId:post.$id})
        settotalLike(totalLikes.total)
    }
    getTotalLikes()

    const likeHandler = async () => {
        console.log(userData.$id,post.$id)
        const val = await interservice.createDocument(userData.$id,{postId:post.$id})
        if(val)
        { setval(true)}
        else{
            setval(false)
        }
    }
  return (
     <div>
        <button className="rounded full w-20 " onClick={likeHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 642 640">
        <path  fill={`${val ? '#ff0000' : "#000000" }`} d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
            <h2>{totallike}</h2>
        </button>
     </div>
  )
}

export default Likes