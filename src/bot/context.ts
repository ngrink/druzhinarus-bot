import { Context as DefaultContext, SessionFlavor, SessionOptions } from 'grammy'
import { HydrateFlavor } from '@grammyjs/hydrate'
import { ConversationFlavor } from '@grammyjs/conversations'

import { Event } from '@prisma/client'
import { MembersFlavor } from '@/modules/events'

export type Context = HydrateFlavor<
  DefaultContext &
  SessionFlavor<SessionData> &
  ConversationFlavor
>

export type SessionData = {
  listTripMembers: {
    trips: (Event & MembersFlavor)[],
    currentTrip: number,
  }
}

export const getInitialSessionData = (): SessionData => {
  return {
    listTripMembers: {
      trips: [],
      currentTrip: 0,
    },
  }
}

export const sessionOptions: SessionOptions<SessionData, Context> = {
  initial: getInitialSessionData,
}


