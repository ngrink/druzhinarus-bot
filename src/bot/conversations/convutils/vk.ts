import { Conversation } from "@grammyjs/conversations";
import axios from "axios";

import { Context } from "@/bot/context";
import { isURL } from "@/helpers";
import { SKIP_SYMBOL } from "@/constants";


export const vk = async (conversation: Conversation<Context>, ctx: Context) => {
  while (true) {
    const url = await conversation.form.text()

    if (!isURL(url) || !url.startsWith('https://vk.com/')) {
      await ctx.reply('Введите ссылку начинающуюся с https://vk.com/')
      continue
    }

    const req = await axios.head(url)
    console.log(req)
    if (req.status !== 200) {
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
      await ctx.reply('Введите ссылку начинающуюся с https://vk.com/')
      continue
    }

    const req = await axios.head(url)
    if (req.status !== 200) {
      await ctx.reply('Введите корректную ссылку на свой профиль')
      continue
    }

    return url
  }
}
