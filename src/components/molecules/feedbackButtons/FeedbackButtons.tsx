import React from 'react'
import {
  HandThumbUpIcon as ThumbUpOutlineIcon,
  HandThumbDownIcon as ThumbDownOutlineIcon
} from '@heroicons/react/24/outline'
import {
  HandThumbUpIcon as ThumbUpSolidIcon,
  HandThumbDownIcon as ThumbDownSolidIcon
} from '@heroicons/react/24/solid'
import { Message } from '@/components/organisms/chat/Messages'

type FeedbackButtonsProps = {
  messageIndex: number
  feedbackType: 'up' | 'down' | undefined
  onFeedback: (messageIndex: number, type: 'up' | 'down', message: Message) => void
  message: Message
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ messageIndex, feedbackType, onFeedback, message }) => {
  const hasFeedback = feedbackType !== undefined
  return (
    <div className="flex space-x-2 mt-1 ml-2">
      <button
        onClick={() => onFeedback(messageIndex, 'up', message)}
        disabled={hasFeedback}
        aria-label="Thumbs up"
        className="cursor-pointer"
      >
        {feedbackType === 'up' ? (
          <ThumbUpSolidIcon className="h-5 w-5" />
        ) : (
          <ThumbUpOutlineIcon className="h-5 w-5" />
        )}
      </button>
      <button
        onClick={() => onFeedback(messageIndex, 'down', message)}
        disabled={hasFeedback}
        aria-label="Thumbs down"
        className="cursor-pointer"
      >
        {feedbackType === 'down' ? (
          <ThumbDownSolidIcon className="h-5 w-5" />
        ) : (
          <ThumbDownOutlineIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}