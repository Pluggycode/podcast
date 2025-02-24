"use client"
import { Input } from '../../../../components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Button } from '../../../../components/ui/button'
import { Textarea } from "../../../../components/ui/textarea"
import { LoaderIcon, SparkleIcon } from 'lucide-react'
import axios from 'axios'
import { userAuthContext } from '../../../provider'
import { toast } from 'react-toastify'

const suggestions = [
    "Historical Story",
    "Kids Story",
    "Movie Stories",
    "Ai Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological tales",
    "Tech Breakthroughs",
    "True crime Stories",
    "Fantacy Adventures",
    "Science Experiments",
    "Motivations Stories"
]

function Topic({ onHandleInputChange }) {
    const [selectedTopic, setselectedTopic] = useState();
    const [scripts, setScripts] = useState();
    const [selectedScriptIndex, setselectedScriptIndex] = useState();
    const [loading, setLoading] = useState(false);
    const {user} = userAuthContext();

    const generateScript = async () => {

        if(user?.credits<=0)
            {
                toast('Please add more credits')
                return ;
            }
        try {
            setLoading(true);
            setselectedScriptIndex(null);
            const result = await axios.post('/api/generate-script', {
                timeout: 10000,
                topic: selectedTopic
                topic: selectedTopic
            });
            console.log(result.data);
            setScripts(result.data?.scripts);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    return (
        <div className=''>
            <h2 className='mb-1'>Podcast Title</h2>
            <Input placeholder="enter podcast title" onChange={(event) => onHandleInputChange('title', event.target.value)} />
            <div className="mt-5">
                <h2>Podcast Topic</h2>
                <p className='text-sm text-gray-600'>Select topic for your podcast</p>

                <Tabs defaultValue="account" className="mt-2 w-full">
                    <TabsList>
                        <TabsTrigger value="Suggetions">Suggetions</TabsTrigger>
                        <TabsTrigger value="your_topic">Your Topic </TabsTrigger>
                    </TabsList>
                    <TabsContent value="Suggetions" className="" >
                        <div className="">
                            {suggestions.map((suggestions, index) => (
                                <Button variant="outline" key={index} className={`mr-1 mt-1 ${suggestions == selectedTopic && 'bg-secondary'}`}
                                    onClick={() => {
                                        setselectedTopic(suggestions)
                                        onHandleInputChange('topic', suggestions)
                                    }}>{suggestions}</Button>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="your_topic">
                        <div className="">
                            <h2>Enter your own topic</h2>
                            <Textarea placeholder="enter your topic"
                                onChange={(event) => onHandleInputChange('topic', event.target.value)} />
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length > 0 &&
                    <div className="mt-3">
                        <h2>Select the Script</h2>
                        <div className='grid grid-cols-2 gap-5 mt-1'>
                            {scripts?.map((item, index) => (
                                <div className={`p-3 border rounded-lg mt-3 cursor-pointer
                            ${selectedScriptIndex == index && 'border-white bg-secondary'}`} key={index}
                                    onClick={() => {setselectedScriptIndex(index); onHandleInputChange("script",item.content)}}>
                                    <h2 className='line-clamp-4 text-sm text-gray-300'>{item.content}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {!scripts && <Button disabled={loading} className="mt-3" size="sm" onClick={generateScript}>
                    {loading ? <LoaderIcon className='animate-spin' /> : <SparkleIcon />}Generate Script </Button>
                }

            </div>
        </div>
