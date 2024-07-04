import { Context as DefaultContext, SessionFlavor, SessionOptions } from 'grammy'
import { HydrateFlavor } from '@grammyjs/hydrate'
import { ConversationFlavor } from '@grammyjs/conversations'
import { Event } from '@prisma/client'

export type Context = HydrateFlavor<
  DefaultContext &
  SessionFlavor<SessionData> &
  ConversationFlavor
>

export type SessionData = {}

export const getInitialSessionData = (): SessionData => {
  return {}
}

export const sessionOptions: SessionOptions<SessionData, Context> = {
  initial: getInitialSessionData,
}


