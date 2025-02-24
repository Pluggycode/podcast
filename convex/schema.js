import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values'
import { use } from "react";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        userImageUrl:v.string(),
        credits:v.number()
    }),
    podcastData:defineTable({
        title:v.string(),
        topic:v.string(),
        script:v.string(),
        videoStyle:v.string(),
        caption: v.any(),
        voice:v.string(),
        images:v.optional(v.any()),
        audioUrl:v.optional(v.string()),
        captionJson:v.optional(v.any()),
        uid:v.id('users'),
        createdBy: v.string(),
        status:v.optional(v.string()),
        userImage:v.optional(v.string()),
        userName:v.optional(v.string())
    })
})