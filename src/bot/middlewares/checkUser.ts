import { Middleware, NextFunction } from "grammy"
import { User } from "grammy/types";

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
    })
  }

  return next()
}
