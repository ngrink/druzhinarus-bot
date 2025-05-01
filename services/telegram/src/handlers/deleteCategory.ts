import { Middleware } from "grammy";
import { Context } from "@/context";

export const deleteCategoryHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("deleteCategory")
}
