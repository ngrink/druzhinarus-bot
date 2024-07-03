import { CommandMiddleware, Context, Keyboard } from "grammy";
import { mainMenu } from "@/bot/menu";

export const menuCommand: CommandMiddleware<Context> = (ctx: Context) => {
  ctx.reply("Главное меню", {
    reply_markup: mainMenu
  });
}