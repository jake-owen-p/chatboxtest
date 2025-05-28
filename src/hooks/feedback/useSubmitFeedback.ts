import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

export type FeedbackEntry = {
  chatId: string;
  messageIndex: number;
  role: string;
  content: string;
  feedback: 'up' | 'down';
  timestamp: string;
};

export type FeedbackPayload = Omit<FeedbackEntry, 'timestamp'>;

const postFeedback = async (entry: FeedbackPayload): Promise<{ success: boolean }> => {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit feedback');
  }
  return res.json();
};

export const useSubmitFeedback = (): UseMutationResult<
  { success: boolean },
  Error,
  FeedbackPayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbackEntries'] });
    },
  });
};
