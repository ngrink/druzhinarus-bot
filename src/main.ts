import 'dotenv/config'
import { Bot, session } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { conversations, createConversation } from '@grammyjs/conversations';

import * as commands from '@/commands';
import * as builders from '@/conversations';
import { mainMenu } from '@/menu';
import { Context, sessionOptions } from '@/bot/context';
import { errorHandler } from '@/bot/error';

const token = process.env.NODE_ENV == 'production'
  ? process.env.BOT_TOKEN_PRODUCTION
  : process.env.BOT_TOKEN

if (!token) {
  throw new Error("Bot token is not defined");
}

const bot = new Bot<Context>(token);
commands.setCommands(bot)

bot.use(hydrate())
bot.use(session(sessionOptions))
bot.use(conversations());

bot.callbackQuery("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.answerCallbackQuery();
  await ctx.reply('Операция отменена')
});

bot.command("cancel", commands.cancelCommand);

bot.use(createConversation(builders.addEvent))
bot.use(createConversation(builders.editEvent))
bot.use(createConversation(builders.deleteEvent))
bot.use(createConversation(builders.addTrip))
bot.use(createConversation(builders.editTrip))
bot.use(createConversation(builders.deleteTrip))

bot.use(mainMenu);

bot.command("start", commands.startCommand);
bot.command('menu', commands.menuCommand);
bot.command('id', commands.getIdCommand);

bot.on("message", (ctx) => {
  console.log(ctx, ctx.session);
  ctx.reply("Команда не распознана")
})

bot.catch(errorHandler)

console.log('Starting bot...');
bot.start();