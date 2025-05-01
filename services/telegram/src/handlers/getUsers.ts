import { Middleware } from "grammy";

<<<<<<< Updated upstream:src/bot/handlers/getUsers.ts
import { Context } from "@/bot/context";
import { usersService } from "@/modules/users";


export const getUsersHandler: Middleware<Context> = async (ctx: Context) => {
  const users = await usersService.getUsers();
=======
import { api } from "@/api";
import { Context } from "@/context";


export const getUsersHandler: Middleware<Context> = async (ctx: Context) => {
  const users = await api.users.getAllUsers()
    .then(res => res.data)
>>>>>>> Stashed changes:services/telegram/src/handlers/getUsers.ts

  if (!users.length) {
    await ctx.reply('Нет пользователей')
    return
  }

  const message: string = users.map((user, i) => {
<<<<<<< Updated upstream:src/bot/handlers/getUsers.ts
    const fullname = user.fullname || user.fullname_telegram

    return `${i+1}: ${fullname} [@${user.username}](${user.username})`
=======
    const fullname = user.fullname

    return `${i+1}: ${fullname}`
>>>>>>> Stashed changes:services/telegram/src/handlers/getUsers.ts
  }).join('\n')

  await ctx.reply(message, {
    parse_mode: 'MarkdownV2'
  })
}
