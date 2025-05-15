import { mutation, query } from "./_generated/server";
import {asObjectValidator, v} from "convex/values"

export const createPodcastData = mutation({
    args: {
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        caption: v.any(),
        voice: v.string(),
        uid: v.id('users'),
        createdBy: v.string(),
        credits:v.number(),
        userImageUrl:v.string(),
        userName:v.string()
    }
    , handler: async (ctx, args) => {
        const result = await ctx.db.insert("podcastData", {
            title:args.title,
            topic:args.topic,
            script: args.script,
            videoStyle: args.videoStyle,
            caption: args.caption,
            voice: args.voice,
            uid: args.uid,
            createdBy: args.createdBy,
            status:'pending',
            userImage:args.userImageUrl,
            userName:args.userName

        })

        await ctx.db.patch(args.uid,{
            credits:(args?.credits)-1,
        })
        return result;
    }
})


export const updatePodcastData = mutation({
    args:{
        recordId:v.id("podcastData"),
        images:v.any(),
        audioUrl:v.string(),
        captionJson:v.any(),
    }, 
    handler:async (ctx, args) => {
        const result = await ctx.db.patch(args.recordId,{
            audioUrl:args.audioUrl,
            captionJson: args.captionJson,
            images: args.images,
            status:"completed",
        })

        return result;
    }
})

export const GetUserPodcast = query({
    args:{
        uid:v.id('users'),
    },
    handler:
    async (ctx,args) => {
        const result = await ctx.db.query('podcastData')
        .filter(q=>q.eq(q.field('uid'),args.uid))
        .order('desc')
        .collect();

        return result;
    }
})

export const GetPodcastByid = query({
    args:{
        PodcastId:v.id('podcastData')
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.get(args.PodcastId);

        return result;
    }
}
);


export const GetAllPodcasts = query({
    args: {},
    handler: async (ctx) => {
      const result = await ctx.db.query("podcastData").order("desc").collect();
      return result;
    },
  });

export const deleteVideo = mutation(async ({ db }, { id }) => {
  await db.delete(id)
})
