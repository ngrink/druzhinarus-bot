import { Middleware } from "grammy";

import { Context } from "@/bot/context";
import { usersService } from "@/modules/users";


export const getUsersHandler: Middleware<Context> = async (ctx: Context) => {
  const users = await usersService.getUsers();

  if (!users.length) {
    await ctx.reply('Нет пользователей')
    return
  }

  const message: string = users.map((user, i) => {
    const fullname = user.fullname || user.fullname_telegram

    return `${i+1}: ${fullname} [@${user.username}](${user.username})`
  }).join('\n')

  await ctx.reply(message, {
    parse_mode: 'MarkdownV2'
  })
}
