import { Menu, MenuRange } from "@grammyjs/menu"
import { parseISO } from "date-fns"

import { formatEvent, formatMembers, formatMessage } from "@/shared/helpers"
import { Context } from "@/context"

export const tripsMembersMenu = new Menu<Context>("trips-members-menu")
  .dynamic((ctx) => {
    const multiple = ctx.session.listTripMembers.trips.length > 1
    if (!multiple) {
      return
    }

    const range = new MenuRange<Context>()

    range
      .text("<", async (ctx) => {
        if (!currentTripPrev(ctx)) {
          return
        }

        const n = ctx.session.listTripMembers.currentTrip
        const trips = ctx.session.listTripMembers.trips
        const trip = trips[n]

        await ctx.editMessageText(formatMessage`
          ${multiple ? `[${n+1}/${trips.length}]` : ""}
          ${formatEvent({
            id: trip.id,
            type: trip.type,
            startDate: parseISO(trip.startDate),
            endDate: trip.endDate ? parseISO(trip.endDate) : null,
            title: trip.title,
            link: trip.link,
            isPublic: trip.isPublic,
            price: trip.price,
            discountedPrice: trip.discountedPrice,
            discountEndDate: trip.discountEndDate? parseISO(trip.discountEndDate) : null,
          }, { links: true, members: trip.members })}
          ${formatMembers(trip.members.map(member => ({
            id: member.user.id,
            email: member.user.email,
            phone: member.user.phone,
            fullname: member.user.fullname,
            birthday: member.user.birthday ? parseISO(member.user.birthday) : null,
            vk: member.user.vk,
            role: member.user.role,
          })))}
        `, {
          reply_markup: tripsMembersMenu,
          parse_mode: "HTML",
          // @ts-ignore
          disable_web_page_preview: true,
        })
      })

    range
      .text(">", async (ctx) => {
        if (!currentTripNext(ctx)) {
          return
        }

        const n = ctx.session.listTripMembers.currentTrip
        const trips = ctx.session.listTripMembers.trips
        const trip = trips[n]

        await ctx.editMessageText(formatMessage`
          ${multiple ? `[${n+1}/${trips.length}]` : ""}
          ${formatEvent({
            id: trip.id,
            type: trip.type,
            startDate: parseISO(trip.startDate),
            endDate: trip.endDate? parseISO(trip.endDate) : null,
            title: trip.title,
            link: trip.link,
            isPublic: trip.isPublic,
            price: trip.price,
            discountedPrice: trip.discountedPrice,
            discountEndDate: trip.discountEndDate? parseISO(trip.discountEndDate) : null,
          }, { links: true, members: trip.members })}

          ${formatMembers(trip.members.map(member => ({
            id: member.user.id,
            email: member.user.email,
            phone: member.user.phone,
            fullname: member.user.fullname,
            birthday: member.user.birthday? parseISO(member.user.birthday) : null,
            vk: member.user.vk,
            role: member.user.role,
          })))}
        `, {
          reply_markup: tripsMembersMenu,
          parse_mode: "HTML",
          // @ts-ignore
          disable_web_page_preview: true,
        })
      })

    return range
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
