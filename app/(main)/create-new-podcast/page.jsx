"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import PodcastVideoStyle from './_components/PodcastVideoStyle';
import Voice from './_components/Voice';
import Captions from './_components/Captions';
import { Button } from '../../../components/ui/button';
import Preview from './_components/Preview';
import { userAuthContext } from '../../../app/provider';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Loader2Icon, RefreshCcw, WandSparkles } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
function CreateNewPodcast() {
    const [formData, setFormData] = useState();
    const { user } = userAuthContext();
    const CreateInitialPodcastRecord = useMutation(api.podcastData.createPodcastData);
    const [loading,setLoading] = useState(false);
    const onHandleInputChange = (filedName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [filedName]: fieldValue
        }))

        console.log(formData);

    }

    const generatePodcast = async () => {

        if(user?.credits<=0)
        {
            toast('Please add more credits')
            return ;
        }
        if (!formData?.topic || !formData?.script || !formData?.captions || !formData?.videoStyle || !formData?.voice) {
            console.log("Error", "Enter all the fields")
            return;
        }

        //Save video data first 
        setLoading(true);

        const resp = await CreateInitialPodcastRecord({
            title: formData.title,
            topic: formData.topic,
            script:formData.script,
            videoStyle: formData.videoStyle,
            caption: formData.captions,
            voice: formData.voice,
            uid: user?._id,
            createdBy: user?.email,
            credits:user?.credits,
            userImageUrl:user.userImageUrl,
            userName:user?.name
        })
        console.log(resp);

       const result = await axios.post('/api/generate-podcast-data', {
            ...formData,
            recordId:resp,
            
         })
        console.log(result);
        setLoading(false);
    }

    return (
        <div className=''>
            <h2 className='text-2xl'>Create new podcast</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="col-span-2 p-10 border rounded-xl h-[72vh] overflow-auto mt-16">
                    {/* topic & script */}
                    <Topic onHandleInputChange={onHandleInputChange} />

                    {/* video image style */}

                    <PodcastVideoStyle onHandleInputChange={onHandleInputChange} />

                    {/* voice */}
                    <Voice onHandleInputChange={onHandleInputChange} />

                    {/* captions */}
                    <Captions onHandleInputChange={onHandleInputChange} />

                  <Link href={'/dashboard'} ><Button disabled={loading} className="w-full mt-5 " onClick={generatePodcast}>{loading?<RefreshCcw  className='animate-spin'/>:<WandSparkles />}Generate Podcast</Button> </Link>
                </div>
                <Preview formData={formData} />
            </div>

        </div>
    )
}

export default CreateNewPodcast