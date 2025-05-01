import { Middleware } from "grammy";
import { parseISO } from "date-fns";

import { User } from "@/shared/generated/prisma/client";
import { formatEvent, formatMembers, formatMessage } from "@/shared/helpers";

import { api } from "@/api";
import { Context } from "@/context";
import { tripsMembersMenu } from "@/menu";

export const listTripMembers: Middleware<Context> = async (ctx: Context) => {
  let trips = await api.events.getEventsWithMembers("TRIP", false)
    .then(res => res.data)

  const hasMembers = trips.some(trip => trip.members!.length)

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
    ${formatEvent({
      id: trip.id,
      type: trip.type,
      startDate: parseISO(trip.startDate),
      endDate: trip.endDate ? parseISO(trip.endDate) : null,
      price: trip.price,
      discountedPrice: trip.discountedPrice,
      discountEndDate: trip.discountEndDate ? parseISO(trip.discountEndDate) : null,
      title: trip.title,
      link: trip.link,
      isPublic: trip.isPublic,
    }, { links: true, members: trip.members })}

    ${formatMembers(trip.members?.map(member => member.user as User) ?? [])}
  `, {
    reply_markup: tripsMembersMenu,
    parse_mode: "HTML",
    // @ts-ignore
    disable_web_page_preview: true,
  })
}
