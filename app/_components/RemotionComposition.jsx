'use client'
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig,Audio } from 'remotion';

function RemotionComposition({ videoData, setDurtionInFrame }) {

    const captions = videoData?.captionJson;
    const {fps} = useVideoConfig();
    const imageList = videoData?.images;
    const caption = videoData?.caption?.size;
    const frame = useCurrentFrame();

    useEffect(()=>{
        videoData && getDurationFrame();
    },[videoData])

    const getDurationFrame = () => {
        const totalDuration = captions[captions?.length - 1]?.end*fps;
        setDurtionInFrame(totalDuration);
        return totalDuration;
    }
    const getCurrentCaption = () => {
        const currentTime = frame/30;
        const currenCaption = captions?.find((item)=>currentTime>=item?.start && currentTime<=item?.end);
        return currenCaption?currenCaption?.word:'';
    }

    return (
        <div>
            <AbsoluteFill>
            {imageList?.map((item,index)=>{
                const startTime = (index*getDurationFrame())/imageList?.length;
                const duration = getDurationFrame();

                const scale=(index)=>interpolate(
                    frame,
                    [startTime,startTime+duration/2,startTime+duration],
                    index/2==0?[1,1.8,1]:[1.8,1,1.8],
                      {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
                )

                return (
                    <>
                    <Sequence key={index} from={startTime} durationInFrames={duration}>
                        <AbsoluteFill>
                            <Img src={item} 
                            style={{
                                width:'100%',
                                height:'100%',
                                objectFit:'cover',
                                transform:`scale(${scale(index)})`
                            }}
                            />
                        </AbsoluteFill>
                    </Sequence>
                    </>
                )
            })}
            </AbsoluteFill>
            <AbsoluteFill style={{
                color:caption?.color,
                justifyContent:'center',
                bottom:50,
                height:150,
                top:undefined,
                textAlign:'center',
                fontSize:'100',
                fontFamily:{caption}
            }}>
                <h2 className={caption}>{getCurrentCaption()}</h2>
            </AbsoluteFill>
            {videoData?.audioUrl  && <Audio src={videoData?.audioUrl} />}

        </div>
    )
}

export default RemotionComposition