import * as React from 'react'
import { createContext, useState } from 'react'

import { TStore, TMessageIndexNumber, TMessageAddedInStack, TSavedOneIterationAnswer } from './T_ChatProvider'

export const ChatContext = createContext<TStore | null>(null)

export default ({ children }: any) => {
  const [messages, refreshMessages] = useState<TMessageAddedInStack[]>([])
  const [messageIndex, setNewMessageIndex] = useState<TMessageIndexNumber>(0)
  const [savedChatInfo, refreshChatInfo] = useState<TSavedOneIterationAnswer>({})

  const store: TStore = {
    messageStack: [messages, refreshMessages],
    currentMessage: [messageIndex, setNewMessageIndex],
    chatInfo: [savedChatInfo, refreshChatInfo],
  }

  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>
}
