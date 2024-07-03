import { User } from "@prisma/client"
import { formatMessage, formatUserName } from "@/bot/helpers"
import { formatInTimeZone } from "date-fns-tz"

type formatMembersOptions = {}

type formatMemberOptions = formatMembersOptions

export const formatMembers = (members: User[], options?: formatMembersOptions): string => {
  return members.map((member) => formatMember(member, options)).join('\n\n')
}

export const formatMember = (member: User, options?: formatMemberOptions) => {
  return formatMessage`
    ${formatUserName(member)}
    ${member.phone}
    ${member.birthday ? formatInTimeZone(member.birthday, 'Europe/Moscow', 'dd.MM.yyyy') : ''}
  `
}


