import React from 'react'
import Image from 'next/image'
import { useState } from 'react';

export const options = [
    {
        name:"Realistic",
        image:'/realistic.png'
    },
    {
        name:"cinematic",
        image:'/cinematic.png'
    },
    {
        name:"Cartoon",
        image:'/Cartoon.png'
    },
    {
        name:"WaterColor",
        image:'/WaterColor.png'
    },
    {
        name:"CyberPunk",
        image:'/cyberpunk.png'
    },
    {
        name:"GTA",
        image:'/gta.png'
    },
    {
        name:"Anim",
        image:'/anim.png'
    },

]

function PodcastVideoStyle({ onHandleInputChange }) {
    const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className='mt-5 '>
        <h2 >Video Styles</h2>
        <p className='text-sm text-gray-600 mt-1'>Select Podcast Video Style</p>
        <div className="grid gird-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-3">
            {options.map((option, index)=>(
                <div className="relative" key={index}
                onClick={() => {setSelectedStyle(option.name);onHandleInputChange('videoStyle',option.name)}}>
                    <Image src={option.image || "/logo.png"} alt={option.name} width={500} height={120} 
                    className={`object-cover h-[90px] lg:h-[130px] xl:h-[180px] rounded-lg p-1 
                    hover:border  border-gray-300 ${option.name == selectedStyle &&  'border bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E]'}` }/>
                    <h2 className='absolute bottom-3 text-center w-full text-border text-white text-xl'>
                        {option.name}
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PodcastVideoStyle