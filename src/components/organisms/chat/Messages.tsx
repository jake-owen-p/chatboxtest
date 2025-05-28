import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react'

type Message = {
  role: 'user' | 'assistant' | string
  content: string
}

type ChatUIProps = {
  isOpen: boolean
  messages: Message[]
  input: string
  isLoading: boolean
  onOpen: () => void
  onClose: () => void
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
  onStop: () => void
  endRef: RefObject<HTMLDivElement | null>
}

export const Messages: React.FC<ChatUIProps> = ({
  isOpen,
  messages,
  input,
  isLoading,
  onOpen,
  onClose,
  onInputChange,
  onSend,
  onStop,
  endRef,
}) => {
  if (!isOpen) {
    return (
      <button
        onClick={onOpen}
        className="cursor-pointer fixed bottom-6 right-6 w-12 h-12 rounded-l-lg bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700"
        aria-label="Open chat"
      >
        💬
      </button>
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        if (isLoading) { onStop() } else onSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 flex flex-col rounded-lg shadow-lg border bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-2 border-b bg-gray-100 dark:bg-gray-800 rounded-t-lg">
        <span className="text-sm font-medium">Chat</span>
        <button
          onClick={onClose}
          className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div
              key={i}
              className="self-end max-w-[75%] bg-blue-600 text-white rounded-md px-3 py-1 text-left"
            >
              {m.content}
            </div>
          ) : (
            <div key={i} className="self-start text-gray-900 dark:text-gray-50">
              {m.content}
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>
      <div className="p-3 flex gap-2">
        <input
          value={input}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-md border px-2 py-1 text-sm bg-transparent outline-none"
          placeholder="Type a message"
          disabled={isLoading}
        />
        <button
          onClick={isLoading ? onStop : onSend}
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Stop' : 'Send'}
        </button>
      </div>
    </div>
  )
}
