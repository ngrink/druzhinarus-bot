import { Conversation } from "@grammyjs/conversations";

<<<<<<< Updated upstream:src/bot/conversations/convutils/upcomingDate.ts
import { Context } from "@/bot/context";
import { getUpcomingDate } from "@/utils";
=======
import { Context } from "@/context";
import { getUpcomingDate } from "@/shared/helpers";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/upcomingDate.ts
import { convutils } from ".";


export const upcomingDate = async (conversation: Conversation<Context>, ctx: Context) => {
  const date = await convutils.date(conversation, ctx)
  const upcomingDate = getUpcomingDate(date)

  return upcomingDate
}

export const upcomingDateOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  const date = await convutils.dateOptional(conversation, ctx)
  if (!date) {
    return
  }

  const upcomingDate = getUpcomingDate(date)

  return upcomingDate
}
