'use client'
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoDetails from '../_components/VideoDetails'
import { useConvex } from 'convex/react'
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';

function Platvideo() {
    const { videoId } = useParams();
    const convex = useConvex();
    const [videoData, setVideoData] = useState();

    useEffect(() => {
        videoId && GetPodcastById();
    }, [videoId]);

    const GetPodcastById = async () => {
        const result = await convex.query(api.podcastData.GetPodcastByid, {
            PodcastId: videoId
        });
        console.log(result);
        setVideoData(result);
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:p-6 lg:p-8'>
            <div className="w-full">
                {/* RemotionPlayer */}
                <RemotionPlayer videoData={videoData} className="md:"/>
            </div>
            <div className="w-full">
                {/* VideoInformation */}
                <VideoDetails videoData={videoData} />
            </div>
        </div>
    );
}

export default Platvideo;