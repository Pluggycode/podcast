'use client'
import React from 'react'
import { userAuthContext } from '../../provider'
import { Button } from '../../../components/ui/button';
import { BadgeDollarSign, DollarSignIcon } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const credits = [
    {
        Credits: 10,
        cost: 1
    },
    {
        Credits: 50,
        cost: 5
    },
    {
        Credits: 100,
        cost: 9
    },
    {
        Credits: 200,
        cost: 15
    },
    {
        Credits: 300,
        cost: 25
    },

]

function page() {
    const { user,setUser } = userAuthContext();
    const updateUserCredits = useMutation(api.users.UpdateUserCredits);
    const onPaymentSuccess = async () => {
        // update user credits
        const result = await updateUserCredits({
            uid: user._id,
            credits:Number(user?.credits)+Number(credits)
        });
        console.log(result)
        setUser(prev => ({
            ...prev,
            credits:Number(user?.credits)+Number(credits)
        }));
        toast('Credits Added Successfully');
    }
    return (
        <div className=''>
            <h2 className='font-bold text-3xl'>Credits</h2>
            <div className=" grid grid-cols-2">
            <div className="mt-5 rounded-lg justify-between p-5 w-full">
                <div className=" border border-gray-600 rounded-lg p-3 flex justify-between">
                    <div className="">
                    <h2 className='text-2xl font-bold'>Total Credits Left</h2>
                    <h2 className='text-gray-400'>1 Credits + 1 video</h2>
                    </div>
                    <div className="text-center">
                    <h2 className='text-2xl mt-2 font-bold'>{user?.credits} Credits</h2>
                    </div>
                </div>
                <div className=" mt-3">
                <h2 className='text-sm text-gray-400'>When your credits reaches to $0. Your Video generation will stop working Add Credits Balance Stoped up..</h2>
                </div>
                <h2 className='text-2xl font-bold mt-2'>By More Credits</h2>
                <div className="">
                    {credits.map((credit, index) => (
                        <div className=" border border-gray-600 rounded-lg p-5 flex justify-between mt-2" key={index}>
                            <div className="text-center mt-2 flex gap-2">
                            <BadgeDollarSign />
                                <h2 className=''>{credit.Credits} Credits</h2>
                            </div>
                            <div className="text-center flex gap-2 ">
                                <h2 className=' font-bold mt-2'> $ {credit.cost}</h2>
                                <PayPalButtons style={{ layout: "horizontal" }} className='mt-2 rounded-lg' 
                                onApprove={() => onPaymentSuccess()}
                                onCancel={() => console.log('cancel')}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: credit.cost,
                                                    currency_code:"USD"                                                },
                                            },
                                        ],
                                    });
                                }
                                }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default page