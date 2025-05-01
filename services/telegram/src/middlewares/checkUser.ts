import { Middleware, NextFunction } from "grammy"
import { User } from "grammy/types";

<<<<<<< Updated upstream:src/bot/middlewares/checkUser.ts
import { Context } from "@/bot/context"
import { usersService } from "@/modules/users"

export const checkUser: Middleware<Context> = async (ctx: Context, next: NextFunction) => {
  const { id, username, first_name, last_name } = ctx.from as User
  const user = await usersService.getUser(id).catch(() => null)

  if (!user) {
    await usersService.createUser({
      id,
      username,
      fullname_telegram: `${first_name} ${last_name}`
=======
import { api } from "@/api";
import { Context } from "@/context"

export const checkUser: Middleware<Context> = async (ctx: Context, next: NextFunction) => {
  const { id, username, first_name, last_name } = ctx.from as User
  const account = await api.accounts.getAccount("TELEGRAM", id)
    .then(res => res.data)

  if (!account) {
    await api.accounts.createTelegramAccount({
      channelId: id,
      username: username,
      user: {
        fullname: `${first_name} ${last_name}`,
      }
>>>>>>> Stashed changes:services/telegram/src/middlewares/checkUser.ts
    })
  }

  return next()
}
