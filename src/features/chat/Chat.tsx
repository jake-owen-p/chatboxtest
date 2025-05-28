import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { Message, Messages } from '@/components/organisms/chat/Messages'
import { useSubmitFeedback } from '@/hooks/feedback/useSubmitFeedback'

const defaultMessage: Message = {
  role: 'assistant',
  content: "Hello! I'm excited to chat with you about world geography. To get started, can you tell me: What is your favorite country?",
}

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({})
  const CHAT_ID = 'chat'

  const { mutateAsync: submitFeedback } = useSubmitFeedback()

  const { messages, input, handleInputChange, handleSubmit, stop } = useChat({
    api: '/api/chat',
    streamProtocol: 'data',
    id: CHAT_ID,
    onFinish: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  })

   const displayedMessages = useMemo<Message[]>(
    () => [defaultMessage, ...messages],
    [messages]
  )

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [displayedMessages, isOpen])

  const onSend = async () => {
    if (!input.trim()) return
    setIsLoading(true)
    await handleSubmit()
  }

  const onStop = () => {
    stop()
    setIsLoading(false)
  }

  const handleFeedback = async (
    messageIndex: number,
    type: 'up' | 'down',
    message: Message
  ) => {
    if (messageIndex === 0) return

    try {
      await submitFeedback({
        chatId: CHAT_ID,
        messageIndex: messageIndex - 1,
        role: message.role,
        content: message.content,
        feedback: type,
      })
      setFeedback(f => ({ ...f, [messageIndex]: type }))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Messages
      isOpen={isOpen}
      messages={displayedMessages}
      input={input}
      isLoading={isLoading}
      feedback={feedback}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onInputChange={handleInputChange}
      onSend={onSend}
      onStop={onStop}
      onFeedback={handleFeedback}
      endRef={endRef}
    />
  )
}