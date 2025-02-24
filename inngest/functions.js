import { inngest } from "./client";
import axios from "axios";
import { GenerateImageScript } from "../configs/aiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const ImagePrompt = `Generate Image prompt of {style} with all details for each scene for 2 minutes video : {script}
-just Give specifing image propmt depends on the story line

-do not give camera angle image prompt

-follow the following schema and return JSON data (MAX 9-10 Images)
-give  only  json data skip your comments
-[
{
imagePromt:' ',
sceneContents: ' <Script Content>'
}
]`


const { createClient } = require("@deepgram/sdk");
export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const GeneratePodcastData = inngest.createFunction(

    { id: "generate-podcast-data" },
    { event: "generate-podcast-data" },
    async ({ event, step }) => {
        // generate audio

        const { script, topic, title, caption, videoStyle, voice , recordId,} = event?.data;
        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)
        const BASE_URL = 'https://aigurulab.tech';
        const GenerateAudioFile = await step.run(
            "GenerateAudioFile",
            async () => {

                const result = await axios.post(BASE_URL + '/api/text-to-speech',
                    {
                        input: script,
                        voice: voice
                    },
                    {
                        headers: {
                            'x-api-key': process.env.NEXT_PUBLIC_AI_GURU_LAB_API_KEY, // Your API Key
                            'Content-Type': 'application/json', // Content Type
                        },
                    })
                console.log(result.data.audio) //Output Result: Audio Mp3 Url
                return result.data.audio;
            }
        )

       // generate captions
        const  GenerateCaptions  = await step.run(
            "generateCaptions",
            async () => {
               const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
               const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
                {
                  url:GenerateAudioFile,
                },
                // STEP 3: Configure Deepgram options for audio analysis
                {
                  model: "nova-3",
                }
              );
              return result.results?.channels[0]?.alternatives[0]?.words;
            }
        )

        const GenerateImagePrompt = await step.run(
            "generateImagePrompt",
            async () => {
                const FINAL_PROMT = ImagePrompt.replace('{style}', videoStyle).replace('{script}', script);
                const result = await GenerateImageScript.sendMessage(FINAL_PROMT);
                const resp = JSON.parse(result.response.text());

                return resp;
            }
        )

        const GenerateImage = await step.run(
            "generateImages",
            async () => {
                let images = [];
                images = await Promise.all(
                    GenerateImagePrompt.map(async (element) => {
                        const result = await axios.post(BASE_URL + '/api/generate-image',
                            {
                                width: 1024,
                                height: 1024,
                                input: element.imagePromt,
                                model: 'sdxl',//'flux'
                                aspectRatio: "1:1"//Applicable to Flux model only
                            },
                            {
                                headers: {
                                    'x-api-key': process.env.NEXT_PUBLIC_AI_GURU_LAB_API_KEY, // Your API Key
                                    'Content-Type': 'application/json', // Content Type
                                },
                            })
                        console.log(result.data.image) //Output Result: Base 64 Image
                        return result.data.image;
                    })
                )
                return images;
            }
        )
        //generate image prompt 

        //image prompt scrpit 

        // save all data to data base

        const UpdateData = await step.run(
            "UpdateData",
            async () => {
                const result = await convex.mutation(api.podcastData.updatePodcastData,{
                    recordId:recordId,
                    audioUrl:GenerateAudioFile,
                    captionJson:GenerateCaptions,
                    images:GenerateImage
                })
                return result;
            }
        )

        return "Excecuited Sucessfully ";
    },
);
