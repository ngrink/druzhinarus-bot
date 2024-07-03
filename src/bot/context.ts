import { Context as DefaultContext, SessionFlavor, SessionOptions } from 'grammy'
import { HydrateFlavor } from '@grammyjs/hydrate'
import { ConversationFlavor } from '@grammyjs/conversations'
import { Event } from '@prisma/client'

export type Context = HydrateFlavor<
  DefaultContext &
  SessionFlavor<SessionData> &
  ConversationFlavor
>

export type SessionData = {
  state: string,
  events: Event[],

  editEvent: {
    currentEventIndex: number,
    rootMessageId: number,
    chatId: number | string
  }
}

export const getInitialSessionData = (): SessionData => {
  return {
    state: 'start',
    events: [],
    editEvent: {
      currentEventIndex: 0,
      rootMessageId: 0,
      chatId: 0
    }
  }
}

export const sessionOptions: SessionOptions<SessionData, Context> = {
  initial: getInitialSessionData,
}


