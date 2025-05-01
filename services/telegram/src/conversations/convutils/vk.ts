import { Conversation } from "@grammyjs/conversations";
import axios from "axios";

<<<<<<< Updated upstream:src/bot/conversations/convutils/vk.ts
import { Context } from "@/bot/context";
import { isURL } from "@/helpers";
import { SKIP_SYMBOL } from "@/constants";
=======
import { Context } from "@/context";
import { isURL } from "@/shared/helpers";
import { SKIP_SYMBOL } from "@/shared/constants";
>>>>>>> Stashed changes:services/telegram/src/conversations/convutils/vk.ts


export const vk = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    const url = await conversation.form.text()

    if (!isURL(url) || !url.startsWith('https://vk.com/')) {
      await ctx.reply('Введите ссылку начинающуюся с https://vk.com/', {
        // @ts-ignore
        disable_web_page_preview: true
      })
      continue
    }

    const res = await axios.get(url).catch((e) => null)
    if (!res) {
      await ctx.reply('Введите корректную ссылку на свой профиль')
      continue
    }

    return url
  }
}

export const vkOptional = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    const url = await conversation.form.text()
    if (url == SKIP_SYMBOL) {
      return
    }

    if (!isURL(url) || !url.startsWith('https://vk.com/')) {
      await ctx.reply('Введите ссылку начинающуюся с https://vk.com/', {
        // @ts-ignore
        disable_web_page_preview: true
      })
      continue
    }

    const res = await axios.get(url).catch((e) => null)
    if (!res) {
      await ctx.reply('Введите корректную ссылку на свой профиль')
      continue
    }

    return url
  }
}
