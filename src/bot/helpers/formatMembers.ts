import { User } from "@prisma/client"
import { formatMessage, formatUserName, getAge, getAgeEnding } from "@/bot/helpers"
import { formatInTimeZone } from "date-fns-tz"

type formatMembersOptions = {}

type formatMemberOptions = formatMembersOptions

export const formatMembers = (members: User[], options?: formatMembersOptions): string => {
  return members.map((member) => formatMember(member, options)).join('\n\n')
}

export const formatMember = (member: User, options?: formatMemberOptions) => {
  const { phone, birthday } = member;
  const age = birthday && getAge(birthday)

  return formatMessage`
    ${formatUserName(member)}
    ${phone}
    ${age ? `${formatInTimeZone(birthday, 'Europe/Moscow', 'dd.MM.yyyy')} (${age} ${getAgeEnding(age)})` : ''}
  `
}


