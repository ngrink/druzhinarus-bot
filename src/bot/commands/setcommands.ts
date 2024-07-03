import { Bot } from "grammy";
import { Context } from "@/bot/context";

export const setCommands = async (bot: Bot<Context>) => {
  await bot.api.setMyCommands([
    {
      command: 'start',
      description: 'Запуск бота'
    },
    {
      command:'menu',
      description: 'Главное меню'
    },
    {
      command: 'cancel',
      description: 'Отмена текущей операции'
    },
  ])
}