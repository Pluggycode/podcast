'use client'
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoDetails from '../_components/VideoDetails'
import { useConvex } from 'convex/react'
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';

function Platvideo() {

    const {videoId} = useParams();
    const convex = useConvex();
    const [videoData,setVideoData] = useState();

    useEffect(()=>{
        videoId && GetPodcastById();
    },[videoId])
    const GetPodcastById= async () => {
        const result = await convex.query(api.podcastData.GetPodcastByid,{
            PodcastId:videoId
        })
        console.log(result);
        setVideoData(result);
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
        <div className="" >

        {/* RemotionPlayer */}
        <RemotionPlayer videoData = {videoData}/>

        </div>
        <div className="">

            {/* VideoInformation */}
            <VideoDetails videoData = {videoData} />

        </div>
    </div>
  )
}

export default Platvideo