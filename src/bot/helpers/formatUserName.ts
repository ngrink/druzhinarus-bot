import { User } from "@prisma/client"

export const formatUserName = (user: User): string => {
  if (user.username) {
    return `<a href="tg://user?id=${user.id}">${user.fullname} @${user.username}</a>`
  }

  return `<a href="tg://user?id=${user.id}">${user.fullname}</a>`
}