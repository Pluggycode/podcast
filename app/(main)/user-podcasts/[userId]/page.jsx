'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import moment from 'moment';
import { Loader2Icon } from 'lucide-react';

function UserPodcasts() {
    const [podcasts, setPodcasts] = useState([]);
    const [user, setUser] = useState(null);
    const convex = useConvex();
    const router = useRouter();
    const { userId } = router.query;

    useEffect(() => {
        if (userId) {
            fetchUserPodcasts(userId);
        }
    }, [userId]);

    const fetchUserPodcasts = async (userId) => {
        const userPodcasts = await convex.query(api.podcastData.GetUserPodcast, { uid: userId });
        setPodcasts(userPodcasts);

        const userDetails = await convex.query(api.users.GetUserById, { userId });
        setUser(userDetails);
    };

    return (
        <div>
            {user && (
                <div className='flex items-center mb-5'>
                    <Image src={user.userImageUrl} alt={'User Image'} width={50} height={50} className='rounded-full' />
                    <h2 className='text-lg ml-3'>{user.name}'s Podcasts</h2>
                </div>
            )}
            {podcasts.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed border-white rounded-xl'>
                    <Image src={'/logo.svg'} width={100} height={100} />
                    <h2 className=' text-gray-400 text-lg'>No Podcasts found for this user.</h2>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-10">
                    {podcasts.map((podcast, index) => (
                        <Link href={'/play-video/' + podcast._id} key={index}>
                            <div className="relative">
                                {podcast.status === 'completed' ? 
                                    <Image src={podcast.images[0]} alt={'title'} width={500} height={500}
                                        className='w-full object-cover rounded-xl aspect-[2/3]' />
                                    :
                                    <div className="aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center">
                                        <Loader2Icon className='animate-spin' />
                                        <h2>Generating...</h2>
                                    </div>
                                }
                                <div className="absolute bottom-3 px-5 w-full">
                                    <h2>{podcast.title}</h2>
                                    <h2 className='text-sm'>{moment(podcast._creationTime).fromNow()}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserPodcasts;
