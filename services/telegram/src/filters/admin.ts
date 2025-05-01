import { Context } from "../context";
import config from "@/config";

export const isAdmin = (userId: number) => {
  return config.adminIds.includes(userId);
};

export const isAdminFilter = (
  ctx: Context
): ctx is Context & { from: { id: number } } => {
  const userId = ctx.from?.id;
  if (!userId || !isAdmin(userId)) {
    ctx.reply("Только для администраторов");
    return false;
  }

  return true;
};
