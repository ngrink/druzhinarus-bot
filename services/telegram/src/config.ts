import path from 'path';
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(process.cwd(), `env`, `.env.${process.env.NODE_ENV}`)
})

const config = {
  apiOrigin: process.env.API_ORIGIN || "http://localhost:7000",
  apiBasePath: process.env.API_BASEPATH || "/",
  botToken: process.env.BOT_TOKEN,
  adminIds: process.env.BOT_ADMINS?.split(',').map(Number) || [],
  notificationChatIds: process.env.NOTIFICATION_CHATS?.split(',').map(Number) || [],
  distributionChatIds: process.env.DISTRIBUTION_CHATS?.split(',').map(Number) || [],
}

export default config;
