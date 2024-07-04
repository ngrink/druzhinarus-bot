import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { signupTripsMenu } from "@/menu";
import { eventsService } from "@/modules/events";

export const signupTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const trips = await eventsService.getUpcomingTripsEvents()
  if (!trips.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите поход', {
    reply_markup: signupTripsMenu
  })
}

export const signupTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("signupTrip")
}