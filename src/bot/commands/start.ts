import { Middleware } from "grammy";
import { User } from "grammy/types";

import { mainMenu } from "@/menu";
import { formatMessage } from "@/helpers";
import { Context } from "@/bot/context";
import { usersService } from "@/modules/users";

export const startCommand: Middleware<Context> = async (ctx: Context) => {
  const { id, username } = ctx.from as User
  const user = await usersService.getUser(id).catch(() => null)
  
  if (!user) {
    await usersService.createUser({ id, username })
  }

  ctx.reply(formatMessage`
    Приветствую! Это чат-бот клуба исторической реконструкции "Морская дружина Рус". Здесь можно получить актуальную информацию по ближайшим мероприятиям, записаться в поход
  
    Полезные ссылки:
    [VK](https://vk.com/druzhinarus)
    [Telegram](https://t.me/MordrRus)
    [YouTube](https://youtube.com/@druzhinarus)
    [Rutube](https://rutube.ru/channel/28404741/)
    [Сайт клуба](https://druzhinarus.org)
    [О вступлении в клуб](https://druzhinarus.org/about/documents)

    Бот находится в разработке, по всем вопросам и предложeниям обращаться к [разработчику](https://t.me/ngrink)
  `, {
    parse_mode: 'Markdown',
    reply_markup: mainMenu,
    // @ts-ignore
    disable_web_page_preview: true,
  });
}