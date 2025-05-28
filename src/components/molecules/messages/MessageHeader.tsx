import React from 'react';

type MessageHeaderProps = {
  onClose: () => void;
  title?: string;
};

export const MessageHeader: React.FC<MessageHeaderProps> = ({ onClose, title = 'Chat' }) => (
  <div className="flex items-center justify-between py-2 px-3 border-b bg-primary-400 dark:bg-gray-800 rounded-t-lg">
    <span className="text-sm font-bold text-white ">{title}</span>
    <button
      onClick={onClose}
      className="cursor-pointer text-white dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      aria-label="Close chat"
    >
      ✕
    </button>
  </div>
);
