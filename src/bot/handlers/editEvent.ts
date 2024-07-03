import { Middleware } from "grammy";
import { Context } from "@/bot/context";


export const editEventHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("editEvent")
}

