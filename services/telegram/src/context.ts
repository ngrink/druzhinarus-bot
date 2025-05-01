import { Context as DefaultContext, SessionFlavor, SessionOptions } from 'grammy'
import { HydrateFlavor } from '@grammyjs/hydrate'
import { ConversationFlavor } from '@grammyjs/conversations'

import { EventWithMembers } from '@/shared/generated/api/client/typescript-axios'

export type Context = HydrateFlavor<
  DefaultContext &
  SessionFlavor<SessionData> &
  ConversationFlavor
>

export type SessionData = {
  listTripMembers: {
    trips: EventWithMembers[],
    currentTrip: number,
  },
  currentCategoryId: number | null
}

export const getInitialSessionData = (): SessionData => {
  return {
    listTripMembers: {
      trips: [],
      currentTrip: 0,
    },
    currentCategoryId: null,
  }
}

export const sessionOptions: SessionOptions<SessionData, Context> = {
  initial: getInitialSessionData,
}
