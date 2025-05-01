import { Middleware, NextFunction } from "grammy";
import { User } from "grammy/types";

import { api } from "@/api";
import { Context } from "@/context";

export const checkUser: Middleware<Context> = async (
  ctx: Context,
  next: NextFunction
) => {
  const { id, username, first_name, last_name } = ctx.from as User;
  const account = await api.accounts
    .getAccount("TELEGRAM", id)
    .then((res) => res.data);

  if (!account) {
    await api.accounts.createTelegramAccount({
      channelId: id,
      username: username,
      user: {
        fullname: `${first_name} ${last_name}`,
      },
    });
  }

  return next();
};
