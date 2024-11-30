import { formatDate } from "date-fns"
import { ru } from "date-fns/locale"

import { Event, EventMember } from "@prisma/client"
import { formatMessage, getWordWithEnding, isURL } from "@/bot/helpers"

type formatEventsOptions = {
  enumerate?: boolean,
  links?: boolean,
  members?: EventMember[],
  prices?: boolean,
  markdown?: boolean
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
    ${options?.prices && formatPrice(event)}
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

  return formatted
}


export const formatPrice = (event: Event): string => {
  const {price, discountedPrice, discountEndDate} = event

  if (!price) {
    return ""
  }

  if (discountedPrice && discountEndDate) {
    return `<s>${price} руб.</s> ${discountedPrice} руб.\n(до ${formatDate(discountEndDate, 'dd MMMM', {locale: ru})})`
  }

  if (event.discountedPrice) {
    return `<s>${price} руб.</s> ${discountedPrice} руб.`
  }

  return `${event.price} руб.`
}
