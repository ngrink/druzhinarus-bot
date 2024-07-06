import { Context } from "@/bot/context";
import { adminIds } from "@/data";

export const isAdmin = (userId: number) => {
  return adminIds.includes(userId)
}

export const isAdminFilter = (ctx: Context): ctx is Context & { from: { id: number } } => {
  const userId = ctx.from?.id
  if (!userId || !isAdmin(userId)) {
    ctx.reply('Только для администраторов')
    return false
  }

  return true
}