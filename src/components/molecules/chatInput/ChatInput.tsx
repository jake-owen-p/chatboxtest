import React, { useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { PaperAirplaneIcon, StopIcon } from '@heroicons/react/24/outline';

export type MessageInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onStop: () => void;
};

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  isLoading,
  onChange,
  onKeyDown,
  onSend,
  onStop,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = 'auto';
    const maxHeight = 200;
    ta.style.height = Math.min(ta.scrollHeight, maxHeight) + 'px';
  }, [value]);

  const Icon = isLoading ? StopIcon : PaperAirplaneIcon;

  return (
    <div className="p-3 flex gap-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a message"
        disabled={isLoading}
        rows={1}
        className="flex-1 rounded-md border px-2 py-1 text-sm bg-transparent outline-none resize-none overflow-y-auto max-h-[200px]"
      />
      <button
        onClick={isLoading ? onStop : onSend}
        aria-label={isLoading ? 'Stop' : 'Send'}
        className="flex items-center justify-center cursor-pointer px-3 py-1 rounded-md bg-primary-900 text-white text-sm hover:bg-tertiary disabled:opacity-50"
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  );
};
