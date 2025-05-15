'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { userAuthContext } from '../../provider';
import { Loader2Icon, SearchIcon } from 'lucide-react';

function VideoList() {
    const [videoList, setVideoList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Search state
    const convex = useConvex();
    const { user } = userAuthContext();

    useEffect(() => {
        GetUserVideoList();
    }, []);

    const GetUserVideoList = async () => {
        const result = await convex.query(api.podcastData.GetAllPodcasts, {});
        setVideoList(result);
        console.log(result);
    }

    const filteredVideoList = videoList.filter((podcast) =>
        podcast?.topic?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="my-5 flex border border-white rounded-md bg-slate-900">
                <input 
                    type="text" 
                    placeholder={" Search podcasts by topic..."}
                    className="w-full p-2 rounded-md text-white bg-slate-900" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
        
                />
                <div className="mt-2 px-3"><SearchIcon /></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-10">
                {filteredVideoList.map((podcast, index) => (
                    <Link href={'/play-explore-video/' + podcast?._id} key={index}>
                        <div className="relative">
                            {podcast?.status == 'completed' ? (
                                <Image 
                                    src={podcast?.images[0]} 
                                    alt={'topic'} 
                                    width={500} 
                                    height={500}
                                    className='w-full object-cover rounded-xl aspect-[2/3]'
                                />
                            ) : (
                                <div className="aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center"> 
                                    <Loader2Icon className='animate-spin' />
                                    <h2>Generating...</h2>
                                </div> 
                            )}
                            <div className="absolute bottom-3 px-5 w-full">
                                <div className="items-center justify-between">
                                    <Image 
                                        src={podcast?.userImage} 
                                        alt={'title'} 
                                        width={30} 
                                        height={30} 
                                        className='rounded-full '
                                    />
                                    <h2 className='text-sm'>{podcast?.userName}</h2>
                                    <h2 className=''>{podcast?.topic}</h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default VideoList;
