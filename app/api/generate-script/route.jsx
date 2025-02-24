import { generateScript } from "../../../configs/aiModel";
import { NextResponse } from "next/server";

const Script_Prompt = `write a two different script for 10 minutes podcast on Topic{topic},
skip serial no of podcasts,
Do not add Scene description,
Do not Add Anything in Braces, just return the plain story in text
Give me response in JSON format and follow schema
{
scripts:[
{
content:' '
},
]
}`

export async function POST(req) {
    const {topic} = await req.json();
    const PROMPT = Script_Prompt.replace('{topic}',topic);
    const result = await generateScript.sendMessage(PROMPT);
    const resp = result?.response?.text();

    return NextResponse.json(JSON.parse(resp));

    
}