import { User } from "@prisma/client"

type formatUserNameOptions = {
  username: boolean
}

export const formatUserName = (user: User, options?: formatUserNameOptions): string => {
  if (options?.username && user.username) {
    return `<a href="tg://user?id=${user.id}">${user.fullname} @${user.username}</a>`
  }

  return `<a href="tg://user?id=${user.id}">${user.fullname}</a>`
}