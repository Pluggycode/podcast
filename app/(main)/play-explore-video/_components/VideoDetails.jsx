import { ArrowLeft, DownloadIcon, SkullIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { LucideShare, SkipBack } from 'lucide-react'
import ShareButtons from './ShareButtons'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'


function VideoDetails({ videoData }) {

  const deleteVideo = useMutation(api.podcastData.deleteVideo)  // Your delete function
  const router = useRouter()

  const handleDelete = async () => {
    if (!videoData?._id) return
    const confirmed = confirm("Are you sure you want to delete this video?")
    if (!confirmed) return

    try {
      await deleteVideo({ id: videoData._id })  // Pass the document ID
      alert("Video deleted successfully")
      router.push('/dashboard')  // Redirect after deletion
    } catch (error) {
      console.error("Failed to delete video:", error)
      alert("Error deleting video")
    }
  }


  const [share, setshare] = useState();
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';
  const onshare = () => {
    setshare(true)
  }
  const offshare = () => {
    setshare(false)
  }
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
        <p className='text-gray-500 text-sm'>Script: {videoData?.script}</p>
        <h2>VideoStyle: {videoData?.videoStyle}</h2>
        {share ? <ShareButtons title={videoData?.title} url={currentURL}
          className='mt-5' /> : <Button onClick={onshare} className=" mt-5"><LucideShare /> Share</Button>}
        {share ? <Button onClick={offshare} className='mt-5 mr-50'><ArrowLeft /> Back </Button> : ''}

      </div>
    </div>
  )
}

export default VideoDetails
