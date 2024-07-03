import { formatDate } from "date-fns"
import { ru } from "date-fns/locale"

import { Event } from "@prisma/client"
import { formatMessage, isURL } from "@/bot/helpers"

export const formatEvent = (event: Event) => {
  const startDate = formatDate(event.startDate, 'dd MMMM', {
    locale: ru
  })
  const endDate = event.endDate ? formatDate(event.endDate, 'dd MMMM', {
    locale: ru
  }) : null

  const isShowEndDate = endDate && startDate != endDate
  const hasLink = event.link ? isURL(event.link) : false

  return formatMessage`
    ${startDate}${isShowEndDate ? ` — ${endDate}` : ''}
    ${hasLink ? `<a href="${event.link}">`: ''}<b>${event.title}</b>${hasLink ? `</a>`: ''}
  `
}