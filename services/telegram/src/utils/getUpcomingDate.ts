import { isBefore } from "date-fns"

/**
 * Returns the next date from the current date
 *
 * @param {Date} date
 * @returns {Date}
 */
export const getUpcomingDate = (date: Date) => {
  return getUpcomingDateFrom(date, new Date())
}


/**
 * Returns the next date from the specified date
 *
 * @param {Date} date
 * @param {Date} from
 * @returns {Date}
 */
export const getUpcomingDateFrom = (date: Date, from: Date): Date => {
  date = new Date(date)

  if (isBefore(date, from)) {
    date.setFullYear(date.getFullYear() + (from.getFullYear() - date.getFullYear()))
  }

  if (isBefore(date, from)) {
    date.setFullYear(date.getFullYear() + 1)
  }

  return date
}
