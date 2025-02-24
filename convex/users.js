import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    userImageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const user = await ctx.db.query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (!user[0]?.email) {
      const userdata = {
        name: args.name,
        email: args.email,
        userImageUrl: args.userImageUrl,
        credits: 25,
      };
      const result = await ctx.db.insert('users', userdata);

      return userdata;
    }
    return user[0];
  },
});

export const updateUserCredits = mutation({
    args:{
        uid:v.id('users'),
        credits:v.number()
    }
    ,handler:async(ctx,args) => {
       const result =  await ctx.db.patch(args.uid,{
            credits:args.credits
        })
        return result;
    }
})

