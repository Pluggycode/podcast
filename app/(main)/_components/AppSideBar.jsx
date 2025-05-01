'use client';
import { signOut } from 'firebase/auth';
import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from "../../../components/ui/sidebar";
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { Gem } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userAuthContext } from '../../../app/provider';
import classNames from 'classnames';
import { auth } from '../../../configs/firebaseConfig';
import { useRouter } from 'next/navigation';

function AppSideBar() {
    const path = usePathname();
    const { user } = userAuthContext();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
            setTimeout(() => {
                router.push('/');
            }, 100);
            window.location.href = '/';
            router.push('/'); // Redirect to home after logout
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const menuItems = [
        { title: 'Home', url: '/dashboard' },
        { title: 'Create-New-Podcast', url: '/create-new-podcast' },
        { title: 'Explore', url: '/explore' },
        { title: 'About us', url: '/logout' }
    ];

    return (
        <Sidebar className="bg-black text-white w-64 min-h-screen p-4">
            <SidebarHeader>
                <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-3">
                        <Image src="/logo.svg" alt="logo" width={40} height={40} />
                        <h2 className="font-bold text-xl text-white">SSIT Podcast</h2>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">AI Podcast Generator</p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-4">
                            {menuItems.map((item, index) => (
                                <Link href={item.url} key={index}>
                                    <Button
                                        className={classNames(
                                            "w-full text-white font-medium py-2 rounded-lg shadow-md transition-all mt-3",
                                            {
                                                "bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] bg-[length:200%_200%] text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl":
                                                    path === item.url,
                                                "bg-white text-black hover:bg-gray-200 hover:text-black":
                                                    path !== item.url,
                                            }
                                        )}
                                    >
                                        {item.title}
                                    </Button>
                                </Link>
                            ))}
                            <Button
                                onClick={handleLogout}
                                className="w-full text-white px-4 py-2 rounded-md mt-3 transition-all duration-300 bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] hover:bg-white hover:text-black hover:from-white hover:via-white hover:to-white"
                            >
                                Logout
                            </Button>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto p-4 bg-gray-900 rounded-lg shadow-md">
                <div className="p-4 border border-purple-500 rounded-lg text-center bg-gray-800">
                    <div className="flex items-center justify-between text-gray-300">
                        <Gem className="text-purple-400" />
                        <h2>{user?.credits ?? 0} Credits Left</h2>
                    </div>
                    <Link href="/billing">
                        <Button className="w-full mt-3 bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] bg-[length:200%_200%] text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl font-medium">
                            Buy More Credits
                        </Button>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSideBar;
