'use client'
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { userAuthContext } from '../../provider';
import moment from 'moment';
import { Loader2Icon } from 'lucide-react';

function VideoList() {
    const [videoList,setVideoList] = useState([]);
    const convex = useConvex();
    const {user} = userAuthContext();

    useEffect(()=>{
     GetUserVideoList();
    })

    const GetUserVideoList = async() => {
        // All user video
        const result = await convex.query(api.podcastData.GetAllPodcasts,{
            
        });
        setVideoList(result);
        console.log(result);
    }

  return (
    <div>
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-10">
            {videoList.map((podcast, index)=>(
                <Link href={'/play-video/'+podcast?._id}>
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
                    <div className="flex items-center justify-between">
                        <Image src={podcast?.userImage} alt={'title'} width={30} height={30} className='rounded-full '/>
                        <h2 className='text-sm'>{podcast?.userName}</h2>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default VideoList