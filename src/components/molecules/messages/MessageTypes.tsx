import { Text } from '@/components/atoms/typography/Text';

export const UserMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-end">
    <Text content={content} className="bg-primary-900 text-white" />
  </div>
);

export const SystemMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-start">
    <Text content={content} className="bg-gray-200 text-gray-700 italic" />
  </div>
);

export const AssistantMessage: React.FC<{ content: string }> = ({ content }) => (
  <div className="flex justify-start">
    <Text content={content} className="text-gray-900" />
  </div>
);
