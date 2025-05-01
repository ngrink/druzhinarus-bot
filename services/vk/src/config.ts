import path from 'path';
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(process.cwd(), `env`, `.env.${process.env.NODE_ENV}`)
})

if (!process.env.BOT_TOKEN) {
  throw new Error("Missing BOT_TOKEN environment variable")
}

const config = {
  apiOrigin: process.env.API_ORIGIN || "http://localhost:7000",
  apiBasePath: process.env.API_BASEPATH || "/",
  botToken: process.env.BOT_TOKEN,
}

export default config;
