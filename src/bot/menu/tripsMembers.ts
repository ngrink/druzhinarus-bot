import { Menu, MenuRange } from "@grammyjs/menu"

import { Context } from "@/bot/context"
import { formatEvent, formatMembers, formatMessage } from "@/helpers"

export const tripsMembersMenu = new Menu<Context>("trips-members-menu")
  .text("<", async (ctx) => {
    if (!currentTripPrev(ctx)) {
      return
    }

    const trip = ctx.session.listTripMembers.trips[ctx.session.listTripMembers.currentTrip]
    await ctx.editMessageText(formatMessage`
      ${formatEvent(trip, { links: true, members: trip.members })}

      ${formatMembers(trip.members.map(member => member.user))}
    `, {
      reply_markup: tripsMembersMenu,
      parse_mode: "HTML"
    })
  })
  .text(">", async (ctx) => {
    if (!currentTripNext(ctx)) {
      return
    }

    const trip = ctx.session.listTripMembers.trips[ctx.session.listTripMembers.currentTrip]
    await ctx.editMessageText(formatMessage`
      ${formatEvent(trip, { links: true, members: trip.members })}

      ${formatMembers(trip.members.map(member => member.user))}
    `, {
      reply_markup: tripsMembersMenu,
      parse_mode: "HTML"
    })
  })


const currentTripPrev = (ctx: Context) => {
  if (ctx.session.listTripMembers.currentTrip == 0) {
    return false
  }

  ctx.session.listTripMembers.currentTrip -= 1
  return true
}

const currentTripNext = (ctx: Context) => {
  if (ctx.session.listTripMembers.currentTrip == ctx.session.listTripMembers.trips.length) {
    return false
  }

  ctx.session.listTripMembers.currentTrip += 1
  return true
}