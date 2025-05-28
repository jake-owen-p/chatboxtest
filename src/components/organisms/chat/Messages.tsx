import React, { ChangeEvent, KeyboardEvent, RefObject, useEffect } from 'react';
import { MessageInput } from '@/components/molecules/chatInput/ChatInput';
import { MessageList } from '@/components/molecules/messages/MessageList';
import { MessageHeader } from '@/components/molecules/messages/MessageHeader';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

export type Message = {
  role: 'user' | 'assistant' | 'system' | string;
  content: string;
};

type Props = {
  isOpen: boolean;
  messages: Message[];
  input: string;
  isLoading: boolean;
  feedback: Record<number, 'up' | 'down'>;
  onOpen: () => void;
  onClose: () => void;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onStop: () => void;
  onFeedback: (messageIndex: number, type: 'up' | 'down', message: Message) => void;
  endRef: RefObject<HTMLDivElement | null>;
};

export const Messages: React.FC<Props> = ({
  isOpen,
  messages,
  input,
  isLoading,
  feedback,
  onOpen,
  onClose,
  onInputChange,
  onSend,
  onStop,
  onFeedback,
  endRef,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (isLoading) {
        onStop();
      } else onSend();
    }
  };

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isLoading, endRef]);

  if (!isOpen) {
    return (
      <button
        onClick={onOpen}
        className="cursor-pointer fixed bottom-6 p-2 text-primary-900 right-0 w-12 h-12 rounded-l-lg bg-secondary flex items-center justify-center shadow-lg hover:bg-tertiary"
        aria-label="Open chat"
      >
        <ChatBubbleLeftEllipsisIcon />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 flex flex-col rounded-lg shadow-lg border bg-primary-100 dark:bg-gray-900">
      <MessageHeader onClose={onClose} />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        feedback={feedback}
        onFeedback={onFeedback}
        endRef={endRef}
      />
      <MessageInput
        value={input}
        isLoading={isLoading}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        onSend={onSend}
        onStop={onStop}
      />
    </div>
  );
};
