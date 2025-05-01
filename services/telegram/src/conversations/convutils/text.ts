import { Conversation } from "@grammyjs/conversations";

<<<<<<< Updated upstream:src/bot/conversations/convutils/text.ts
import { Context } from "@/bot/context";
import { SKIP_SYMBOL } from "@/constants";
=======
import { Context } from "@/context";
import { SKIP_SYMBOL } from "@/shared/constants";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/text.ts


export const text = async (conversation: Conversation<Context>, ctx: Context) => {
  return conversation.form.text()
}

export const textOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  const text = await conversation.form.text()
  if (text == SKIP_SYMBOL) {
    return
  }

  return text
}
