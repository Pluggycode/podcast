import { ScrollArea } from '../../../../components/ui/scroll-area';
import React, { useState } from 'react'

const voiceOptions = [
    {
        "value":"af_sarah",
        "name": "🇺🇸 Sarah (Female)"
    },
    {
        "value":"af_sky",
        "name": "🇺🇸 Sky (Female)"
    },
    {
        "value":"am_adam",
        "name": "🇺🇸 Adam (Male)"
    },
    {
        "value":"hf_alpha",
        "name": "🇮🇳 Alpha (Female)"
    },
    {
        "value":"hf_beta",
        "name": "🇮🇳 Beta (Female)"
    },
    {
        "value":"hm_omega",
        "name": "🇮🇳 Omega (Male)"
    },
    {
        "value":"hm_psi",
        "name": "🇮🇳 Psi (Male)"
    },
    {
        "value":"am_echo",
        "name": "🇺🇸 Echo (Male)"
    },

]

function Voice({ onHandleInputChange }) {
    const [selectedVoice,setSelectedVoice] = useState();
  return (
    <div className='mt-5'>
        <h2>Podcast Voice</h2>
        <p>Select voice for your podcast</p>
        <ScrollArea className="h-[150px] w-full border border-gray-800 mt-2 rounded-lg">
        <div className="grid grid-cols-2 gap-3 mt-2 p-1" >
            {voiceOptions.map((voice,index)=>(
                    <h2 key={index} className={`cursor-pointer p-3 dark:bg-slate-900  border-spacing-4 dark:border-white
                    rounded-lg hover:border ${voice.name == selectedVoice&& "bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] bg-[length:200%_200%] text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl"}`} onClick={()=>{setSelectedVoice(voice.name);onHandleInputChange('voice',voice.value)}} >{voice.name}</h2>
            ))}
        </div>
        </ScrollArea>
    </div>
  )
}

export default Voice