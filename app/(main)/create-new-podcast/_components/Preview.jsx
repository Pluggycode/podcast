import React from 'react'
import { options } from './PodcastVideoStyle'
import Image from 'next/image'

function Preview({formData}) {
    const setPodcastVideoStyle=formData && options.find((item => item?.name == formData.videoStyle))
  return (
    <div className='relative'>
        <h2 className='mb-6 text-2xl'>Preview</h2>
        <Image src={setPodcastVideoStyle?.image} alt={setPodcastVideoStyle?.name} width={1000} height={300} 
        className='w-full h-[77vh] object-cover rounded-xl'/>
        <h2 className={`${formData?.captions?.style} absolute bottom-8 text-center w-full `}>{formData?.captions?.name}</h2>
    </div>
  )
}

export default Preview