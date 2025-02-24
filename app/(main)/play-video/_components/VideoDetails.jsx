import { ArrowLeft, DownloadIcon, SkullIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'

function VideoDetails({videoData}) {
  return (
    <div className='p-5 border rounded-xl'>
        <Link href={'/dashboard'}>
        <h2 className='flex gap-2 items-center'>
            <ArrowLeft />
            Back to dashBoard
        </h2>
        </Link>
        <div className=" flex flex-col gap-3">
        <h2 className='mt-5'>Projet Name: {videoData?.title}</h2>
        <p className='text-gray-500 text-sm'>Script: {videoData?.script }</p>
        <h2>VideoStyle: {videoData?.videoStyle}</h2>
        <Button><SkullIcon /> Delete </Button>
        </div>
    </div>
  )
}

export default VideoDetails