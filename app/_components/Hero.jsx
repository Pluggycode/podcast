import { Button } from '../../components/ui/button'
import React from 'react'
import Authentication from './Authentication'

function Hero() {
  return (
    <div className='p-18 flex flex-col items-center justify-center mt-24 md:px-20 lg:px-36 xl:px-48'>
        <h2 className='font-bold text-5xl text-center'>Ai Podcast Generator</h2>
        <p className='mt-4 text-2xl text-center text-gray-500'>Transform your ideas into engaging podcasts with the power of AI. Let PodcastGenie take care of the technical details while you focus on sharing your story with the world</p>
        <div className=" mt-7 flex gap-8">
            <Button size="lg" variant="secondary">Explore</Button>
            <Authentication><Button size="lg" >Get Started</Button></Authentication>

        </div>
    </div>
  )
}

export default Hero