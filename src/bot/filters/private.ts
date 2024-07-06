import { NextFunction } from "grammy";
import { Context } from "@/bot/context";

export const isPrivate = (type?: string) => {
  if (type && type === "private") {
    return true
  }

  return false
}

export const isPrivateMiddleware = (ctx: Context, next: NextFunction) => {
  if (isPrivate(ctx.chat?.type)) {
    return next()
  }

  return
}

export const isPrivateMessageMiddleware = (ctx: Context, next: NextFunction) => {
  if (isPrivate(ctx.chat?.type)) {
    return next()
  }

  ctx.reply('Доступно в личных сообщениях @druzhinarus_bot')
  return
}