import { Middleware } from "grammy";
import { Context } from "@/context";

export const addCategoryHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("addCategory")
}
