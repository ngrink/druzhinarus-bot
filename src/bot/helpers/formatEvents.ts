import { formatDate } from "date-fns"
import { ru } from "date-fns/locale"

import { Event, EventMember } from "@prisma/client"
import { formatMessage, getWordWithEnding, isURL } from "@/bot/helpers"

type formatEventsOptions = {
  enumerate?: boolean,
  links?: boolean,
  members?: EventMember[]
}

type formatEventOptions = formatEventsOptions

export const formatEvents = (events: Event[], options?: formatEventsOptions): string => {
  if (options?.enumerate) {
    return events.map((event, i) => `[${i+1}]\n${formatEvent(event, options)}`).join('\n\n')
  }

  return events.map((event) => formatEvent(event, options)).join('\n\n')
}

export const formatEvent = (event: Event, options?: formatEventOptions): string => {
  const hasLink = event.link ? isURL(event.link) : false
  const members = options?.members || []
  const membersLabel = ` (${members.length} ${getWordWithEnding(members.length, 'участник', ['', 'а', 'ов'])}) `

  return formatMessage`
    ${formatDateRange(event.startDate, event.endDate)}${options?.members ? membersLabel : ''}
    ${options?.links && hasLink ? `<a href="${event.link}">`: ''}<b>${event.title}</b>${options?.links && hasLink ? `</a>`: ''}
  `
}

export const formatDateRange = (start: Date, end?: Date | null): string => {
  const startDay = formatDate(start, 'dd', {
    locale: ru
  })
  const startDate = formatDate(start, 'dd MMMM', {
    locale: ru
  })
  const endDate = end ? formatDate(end, 'dd MMMM', {
    locale: ru
  }) : null

  if (!endDate || endDate && startDate == endDate) {
    return `${startDate}`
  }

  let formatted;

  if (start.getMonth() == end?.getMonth()) {
    formatted = `${startDay} - ${endDate}`
  } else {
    formatted = `${startDate} - ${endDate}`
  }

  if (start.getFullYear() != new Date().getFullYear()) {
    formatted += ` (${start.getFullYear()})`
  }

  return formatted
}
