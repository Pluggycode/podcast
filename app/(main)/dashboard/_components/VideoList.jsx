'use client'
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { userAuthContext } from '../../../provider';
import moment from 'moment';
import { Loader2Icon } from 'lucide-react';

function VideoList() {
    const [videoList,setVideoList] = useState([]);
    const convex = useConvex();
    const {user} = userAuthContext();

    useEffect(()=>{
        user && GetUserVideoList();
    },[user])

    const GetUserVideoList = async() => {
        // All user video
        const result = await convex.query(api.podcastData.GetUserPodcast,{
            uid:user?._id
        });
        setVideoList(result);
        console.log(result);

        const isPendiGPodcast = result.find((item)=> item.status=='pending');

        isPendiGPodcast && GetPodcastStatus(isPendiGPodcast);
    }

    const GetPodcastStatus = (pendingPodcast) => {

        const intervalId = setInterval(async () => {
            //get Video Data by Id

            const result = await convex.query(api.podcastData.GetPodcastByid,{
                PodcastId:pendingPodcast?._id
            })
            if ( result?.status == 'completed')
            {
                clearInterval(intervalId);
                console.log("podcast process completed")
            }

            console.log("still pending")

        },5000)

    }
  return (
    <div>
        {videoList?.length == 0 ?
        
        <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed border-white rounded-xl'>
            <Image src={'/logo.svg'} width={100} height={100}/>
            <h2 className=' text-gray-400 text-lg'>You dont have any Podcast created create new Podcast</h2>
            <Link href={'/create-new-podcast'}>
            <Button> Create New Podcast </Button></Link>
            
        </div>
        :
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-10">
            {videoList.map((podcast, index)=>(
                <Link href={'/play-vide/'+podcast?._id}>
                <div className="relative" key={index}>
                   {podcast?.status == 'completed' ? <Image src={podcast?.images[0]} alt={'title'} width={500} height={500}
                    className='w-full object-cover rounded-xl aspect-[2/3]'/>
                    :
                    <div className="aspect-[2/3] p-5 w-full rounded-xl
                    bg-slate-900 flex items-center justify-center"> 
                    <Loader2Icon className='animate-spin' />
                    <h2 >Generating...</h2>
                    </div> }
                    <div className="absolute bottom-3 px-5 w-full">
                        <h2>{podcast?.title}</h2>
                        <h2 className='text-sm'>{moment (podcast._creationTime).fromNow()}</h2>
                    </div>
                </div>
                </Link>
            ))}
        </div>
        }
    </div>
  )
}

export default VideoList