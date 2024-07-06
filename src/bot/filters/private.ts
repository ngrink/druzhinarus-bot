import { NextFunction } from "grammy";
import { Context } from "@/bot/context";

export const isPrivate = (type?: string) => {
  if (type && type === "private") {
    return true
  }

  return false
}

export const privateMiddleware = (ctx: Context, next: NextFunction) => {
  if (isPrivate(ctx.chat?.type)) {
    return next()
  }

  return
}

export const createPrivateMiddleware = (message: string) => {
  return (ctx: Context, next: NextFunction) => {
    if (isPrivate(ctx.chat?.type)) {
      return next()
    }
  
    ctx.reply(`${message} @druzhinarus_bot`)
    return
  }
}