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

export const onlyAdminOnDevelopment: Middleware<Context> = (ctx: Context, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    const userId = ctx.from?.id
    if (!userId || !isAdmin(userId)) {
      ctx.reply(`Приветствую! Это тестовый чат-бот клуба и используется только разработчиками. Напиши основному боту @druzhinarus_bot`)
      return
    }
  }

  return next()
}