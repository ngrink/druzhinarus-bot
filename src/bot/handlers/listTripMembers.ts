import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { formatEvent, formatMembers, formatMessage } from "@/helpers";
import { tripsMembersMenu } from "@/menu";
import { eventsService } from "@/modules/events";

export const listTripMembers: Middleware<Context> = async (ctx: Context) => {
  let trips = await eventsService.getTripEventsWithMembers()
  const hasMembers = trips.some(trip => trip.members.length)

  if (!trips) {
    await ctx.reply('Нет походов')
    return
  }

  if (!hasMembers) {
    await ctx.reply('Нет участников')
    return
  }

  ctx.session.listTripMembers.trips = trips
  ctx.session.listTripMembers.currentTrip = 0

  const n = 0
  const trip = trips[n]
  const multiple = trips.length > 1

  await ctx.reply(formatMessage`
    ${multiple ? `[${n+1}/${trips.length}]` : ""}
    ${formatEvent(trip, { links: true, members: trip.members })}

    ${formatMembers(trip.members.map(member => member.user))}
  `, {
    reply_markup: tripsMembersMenu,
    parse_mode: "HTML",
    // @ts-ignore
    disable_web_page_preview: true,
  })
}