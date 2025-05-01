import { Conversation } from "@grammyjs/conversations";

import { api } from "@/api";
import { Context } from "@/context";

export async function deleteTrip(conversation: Conversation<Context>, ctx: Context) {
  const eventId = Number(ctx.match)

  await conversation.external(async () => {
    await api.events.deleteEvent(eventId)
  })

  await ctx.reply('Поход удален')
}
