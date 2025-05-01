import { Middleware } from "grammy";

import { api } from "@/api";
import { Context } from "@/context";

export const getUsersHandler: Middleware<Context> = async (ctx: Context) => {
  const users = await api.users.getAllUsers().then((res) => res.data);

  if (!users.length) {
    await ctx.reply("Нет пользователей");
    return;
  }

  const message: string = users
    .map((user, i) => {
      const fullname = user.fullname;

      return `${i + 1}: ${fullname}`;
    })
    .join("\n");

  await ctx.reply(message, {
    parse_mode: "MarkdownV2",
  });
};
