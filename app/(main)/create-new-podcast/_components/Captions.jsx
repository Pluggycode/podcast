import React, { useState } from 'react'

const options = [
    {
        name:"Youtuber",
        style:" text-yellow-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg",
        size:"text-yellow-400 text-8xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg"

    },
    {
        name:"Supreme",
        style:"text-white text-3xl font-bold italic drop-shadow-lg px-3 py-1 rounded-lg",
        size:"text-white text-8xl font-bold italic drop-shadow-lg px-3 py-1 rounded-lg"

    },
    {
        name:"Neon",
        style:"text-neon text-3xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg",
        size:"text-neon text-8xl font-extrabold uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg"
    },
    {
        name:"Glitch",
        style:" text-pink-400 text-3xl font-extrabold uppercase tracking-wide drop-shadow-[4=x_4px_0_rgba(0,0,0,0.2)] px-3 py-1 rounded-lg",
        size:"text-pink-400 text-8xl font-extrabold uppercase tracking-wide drop-shadow-[4=x_4px_0_rgba(0,0,0,0.2)] px-3 py-1 rounded-lg"
    },
    {
        name:"Fire",
        style:" text-red-500 text-3xl font-extrabold uppercase px-3 py-1 rounded-lg",
        size:"ext-red-500 text-8xl font-extrabold uppercase px-3 py-1 rounded-lg"

    }
]

function Captions({onHandleInputChange}) {
    const [selectedCaptionStyle, setselectedCaptionStyle] = useState();
  return (
    <div className='mt-5'>
        <h2>Caption styles</h2>
        <p className='text-sm text-gray-400'>Select captions styles</p>
        <div className="flex flex-wrap gap-4">
            {options.map((option,index)=>(
                <div className={`p-2 hover:border border-gray-300 cursor-pointer bg-slate-900 rounded-lg
                    ${selectedCaptionStyle==option.name && 'border bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] bg-[length:200%_200%] text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl'}
                    `} key={index}
                onClick={() => {setselectedCaptionStyle(option.name);onHandleInputChange('captions',option)}}
                >
                    <h2 className={option.style}>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Captions