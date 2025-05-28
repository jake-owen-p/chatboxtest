import { NextResponse } from 'next/server';

type FeedbackEntry = {
  chatId: string;
  messageIndex: number;
  role: string;
  content: string;
  feedback: 'up' | 'down';
  timestamp: string;
};

const feedbackStore: FeedbackEntry[] = [];

export async function POST(request: Request) {
  try {
    const { chatId, messageIndex, role, content, feedback } = await request.json();
    if (
      !chatId ||
      messageIndex == null ||
      !role ||
      !content ||
      !['up', 'down'].includes(feedback)
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const entry: FeedbackEntry = {
      chatId,
      messageIndex,
      role,
      content,
      feedback,
      timestamp: new Date().toISOString(),
    };
    feedbackStore.push(entry);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error processing feedback:', err);
    return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(feedbackStore);
}
