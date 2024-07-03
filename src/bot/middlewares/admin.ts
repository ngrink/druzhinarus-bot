import { Middleware, NextFunction } from "grammy"

import { isAdmin } from "@/filters"
import { Context } from "@/bot/context"

export const onlyAdmin: Middleware<Context> = (ctx: Context, next: NextFunction) => {
  const userId = ctx.from?.id
  if (!userId || !isAdmin(userId)) {
    ctx.reply('Только для администраторов')
    throw Error("Only admins can")
  }

  return next()
}