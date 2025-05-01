import { Middleware } from "grammy";

import { Context } from "@/context";
import { signupTripsMenu } from "@/menu";
import { api } from "@/api";

export const signupTripMenuHandler: Middleware<Context> = async (ctx: Context) => {
  const trips = await api.events.getEvents("TRIP", true)
    .then(res => res.data)

  if (!trips.length) {
    await ctx.reply('Нет доступных походов')
    return
  }

  await ctx.reply('Выберите поход для записи', {
    reply_markup: signupTripsMenu
  })
}

export const signupTripHandler: Middleware<Context> = async (ctx: Context) => {
  await ctx.conversation.enter("signupTrip")
}
