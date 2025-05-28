import React, { RefObject } from 'react'
import { AssistantMessage, SystemMessage, UserMessage } from '@/components/molecules/messages/MessageTypes'
import { FeedbackButtons } from '@/components/molecules/feedbackButtons/FeedbackButtons'
import { Message } from '@/components/organisms/chat/Messages'

export type MessageListProps = {
  messages: Message[]
  isLoading: boolean
  feedback: Record<number, 'up' | 'down'>
  onFeedback: (messageIndex: number, type: 'up' | 'down', message: Message) => void
  endRef: RefObject<HTMLDivElement | null>
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  feedback,
  onFeedback,
  endRef,
}) => (
  <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
    {messages.map((message, i) => {
      const Msg =
        message.role === 'user'
          ? UserMessage
          : message.role === 'system'
          ? SystemMessage
          : AssistantMessage

          const isLatestMessage = i === messages.length - 1
      return (
        <div key={i}>
          <Msg content={message.content} />

          {message.role !== 'user' && (
            <div className="flex space-x-2 mt-1 ml-2">
              {!(isLoading && isLatestMessage) && (
                <FeedbackButtons
                  messageIndex={i}
                  feedbackType={feedback[i]}
                  onFeedback={onFeedback}
                  message={message}
                />
              )}
            </div>
          )}
        </div>
      )
    })}

    {isLoading && (
      <div className="ml-2 text-gray-500 animate-pulse text-sm">
        Agent is typing...
      </div>
    )}

    <div ref={endRef} />
  </div>
)