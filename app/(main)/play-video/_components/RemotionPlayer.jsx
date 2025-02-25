'use client'
import React, { useState } from 'react'
import { Player } from '@remotion/player'
import RemotionComposition from '../../../../app/_components/RemotionComposition'

function RemotionPlayer({ videoData }) {
    const [durationInFrame, setDurationInFrame] = useState(100);
    return (
        <div className="w-full max-w-screen-md mx-auto">
            <Player
                component={RemotionComposition}
                durationInFrames={Number(durationInFrame.toFixed(0)) + 100}
                compositionWidth={720}
                compositionHeight={1200}
                fps={30}
                controls
                style={{
                    width: '42vh',
                    height: '56vh',
                }}
                inputProps={{
                    videoData: videoData,
                    setDurtionInFrame: (frameValue) => setDurationInFrame(frameValue)
                }}
            />
        </div>
    )
}

export default RemotionPlayer
