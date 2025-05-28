import React from "react";

interface TextProps {
  content: string;
  className?: string;
}

export const Text: React.FC<TextProps> = ({ content, className = "" }) => (
  <div
    className={`inline-block rounded-md px-3 py-1 text-sm whitespace-pre-wrap break-words max-w-[75%] ${className}`}
  >
    {content}
  </div>
);