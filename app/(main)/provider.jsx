"use client"
import { SidebarProvider } from '../../components/ui/sidebar'
import React, { useEffect } from 'react'
import AppSideBar from './_components/AppSideBar'
import AppHeader from './_components/AppHeader'
import Image from 'next/image'
import { userAuthContext } from '../provider'
import { useRouter } from 'next/navigation'

function DashboardProvider({children}) {
    const {user} = userAuthContext();
    const router = useRouter();

    useEffect(() => {
        user && CheckUserAuthenticated();
    },[]);

    const CheckUserAuthenticated = () => {
        if(!user)
        {
            router.replace('/')
        }
    }
  return (
    <SidebarProvider>
        <AppSideBar />
    <div className='w-full'>
        <AppHeader />
        <div className="p-10">
        {children}
        </div>
    </div>
    </SidebarProvider>
  )
}

export default DashboardProvider