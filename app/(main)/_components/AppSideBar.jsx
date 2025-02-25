import React from 'react';
import { useState } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../../components/ui/sidebar";
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { Gem, HomeIcon, LucideFileVideo, SearchIcon, WalletCards } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userAuthContext } from '../../../app/provider';

function AppSideBar() {
    const path = usePathname();
    const { user } = userAuthContext();

    const menuItems = [
        { title: 'Home', url: '/dashboard' },
        { title: 'Explore', url: '/explore' },
        { title: 'Billing', url: '/billing' },
    ];

    return (
        <div>
            <Sidebar>
                <SidebarHeader>
                    <div className="">
                        <div className='flex items-center gap-3 w-full justify-center mt-3'>
                            <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                            <h2 className='font-bold text-2xl'>Magna Podcast</h2>
                        </div>
                        <h2 className='text-lg text-gray-400 text-center mt-2'>AI Podcast Generator</h2>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <div className="mx-6 mt-8">
                                <Link href={'/create-new-podcast'}>
                                    <Button className="w-full mt-3">Create New Podcast</Button>
                                </Link>
                            </div>
                            <SidebarMenu>
                                {menuItems.map((item, index) => (
                                    <Link href={item.url} key={index}>
                                        <Button
                                            className={`w-full mt-3 ${path === item.url ? 'bg-slate-800 text-gray-200 border border-white':'bg-gray-800 text-gray-200'} hover:bg-slate-800  hover:text-gray-200 `}
                                        >
                                            {item.title}
                                        </Button>
                                    </Link>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter>
                    <div className="p-5 border rounded-lg mb-6 bg-gray-800">
                        <div className="flex items-center justify-between">
                            <Gem className='text-gray-400' />
                            <h2 className='text-gray-400'>{user?.credits} Credits Left</h2>
                        </div>
                        <Link href={'/billing'} ><Button className="w-full mt-3">Buy More Credits</Button></Link>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}

export default AppSideBar;
