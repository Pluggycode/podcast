"use client"
import { userAuthContext } from '../../provider';
import React from 'react'
import Image from 'next/image';
import { SidebarTrigger } from '../../../components/ui/sidebar';

function AppHeader() {
    const {user} = userAuthContext();
  return (
    <div className='p-3 flex items-center justify-between'>
        <SidebarTrigger />
        <div className=" bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full w-10 h-10 items-center flex ">
            <Image src={user?.userImageUrl || "/logo.png"} alt='userimage' width={32} height={32} className='rounded-full ml-1'/>
        </div>
    </div>
  )
}

export default AppHeader