'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { Messages } from '@/components/organisms/chat/Messages'

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const CHAT_ID = 'chat'

  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
    api: '/api/chat',
    streamProtocol: 'data',
    id: CHAT_ID,
    onFinish: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  })

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const onSend = async (): Promise<void> => {
    if (!input.trim()) return
    setIsLoading(true)
    await handleSubmit()
  }

  const onStop = (): void => {
    stop()
    setIsLoading(false)
  }

  return (
    <Messages
      isOpen={isOpen}
      messages={messages}
      input={input}
      isLoading={isLoading}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onInputChange={handleInputChange}
      onSend={onSend}
      onStop={onStop}
      endRef={endRef}
    />
  )
}