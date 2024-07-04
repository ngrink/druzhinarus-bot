import { Conversation } from "@grammyjs/conversations";

import { Context } from "@/bot/context";
import { eventsService } from "@/modules/events";

export async function deleteTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)

  await conversation.external(async () => {
    await eventsService.deleteEvent(eventId)
  })

  await ctx.reply('Поход удален')
}