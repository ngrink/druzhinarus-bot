import { formatDate } from "date-fns"
import { ru } from "date-fns/locale"

import { Event, EventMember } from "@prisma/client"
import { formatMessage, getWordWithEnding, isURL } from "@/bot/helpers"

type formatEventsOptions = {
  ids?: boolean,
  links?: boolean,
  members?: EventMember[]
}

type formatEventOptions = formatEventsOptions

export const formatEvents = (events: Event[], options?: formatEventsOptions): string => {
  if (options?.ids) {
    return events.map((event, i) => `[${i+1}]\n${formatEvent(event, options)}`).join('\n\n')
  }

  return events.map((event) => formatEvent(event, options)).join('\n\n')
}

export const formatEvent = (event: Event, options?: formatEventOptions): string => {
  const startDate = formatDate(event.startDate, 'dd MMMM', {
    locale: ru
  })
  const endDate = event.endDate ? formatDate(event.endDate, 'dd MMMM', {
    locale: ru
  }) : null

  const isShowEndDate = endDate && startDate != endDate
  const hasLink = event.link ? isURL(event.link) : false
  const members = options?.members?.filter((member) => member.eventId === event.id) || []
  const membersLabel = ` (${members.length} ${getWordWithEnding(members.length, 'участник', ['', 'а', 'ов'])}) `

  return formatMessage`
    ${startDate}${isShowEndDate ? ` — ${endDate}` : ''}${options?.members ? membersLabel : ''}
    ${options?.links && hasLink ? `<a href="${event.link}">`: ''}<b>${event.title}</b>${options?.links && hasLink ? `</a>`: ''}
  `
}


