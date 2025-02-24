'use client'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import React from 'react'
import Authentication from './Authentication'
import { userAuthContext } from '../provider'
import Link from 'next/link'

function Header() {
    const {user} = userAuthContext();
  return (
    <div className="p-4  flex items-center justify-between">
    <div className='flex items-center gap-3'>
        <Image src={'/logo.svg'} width={30} height={30} alt='logo' />
        <h2 className='text-2xl font-bold'>Podcast Gen</h2>
    </div>
       {!user? <Authentication>
        <Button>Get Started</Button>
        </Authentication>
       :<Link href={'/dashboard'}><div className='flex gap-3 items-center'> 
       <div className="">
        <Button>Dashboard</Button>
        </div>
        <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-full w-10 h-10 items-center flex ">
        <Image src={user.userImageUrl} alt='userimage' width={32} height={32} className='rounded-full ml-1'/>
        </div>
       </div>
       </Link>
    }
    </div>
  )
}

export default Header