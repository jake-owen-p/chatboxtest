import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Role } from '@/types/chat';
import { auditMessage } from './AuditLog';
import { systemPrompt } from './prompts/systemPrompt';

export interface MessagePart {
  type: string;
  text: string;
}

export interface IncomingMessage {
  role: Role;
  parts: MessagePart[];
}

export interface ChatHistoryMessage {
  role: Role;
  content: string;
}

export const runtime = 'edge';

export async function POST(req: Request): Promise<Response> {
  let body: { messages?: IncomingMessage[] };
  try {
    body = (await req.json()) as { messages?: IncomingMessage[] };
  } catch (e) {
    console.log(e);
    return new Response('Invalid JSON body', { status: 400 });
  }

  const { messages } = body;

  if (!messages) {
    return new Response('Missing messages', { status: 400 });
  }

  const chatHistory: ChatHistoryMessage[] = messages.map((m) => {
    const content = m.parts.map((p) => p.text).join('');
    return { role: m.role, content };
  });

  const latest = messages[messages.length - 1];
  const latestContent = latest.parts.map((p) => p.text).join('');
  auditMessage({
    role: latest.role,
    content: latestContent,
    timestamp: new Date().toISOString(),
  });

  const hasSystemPrompt = messages.some(
    (msg) =>
      msg.role === 'system' &&
      msg.parts.some((p) => p.text.includes('You are an extraordinary conversational agent')),
  );

  if (!hasSystemPrompt) {
    auditMessage({
      role: systemPrompt.role,
      content: systemPrompt.content,
      timestamp: new Date().toISOString(),
    });
  }

  const promptMessages: ChatHistoryMessage[] = [systemPrompt, ...chatHistory];

  const aiStream = streamText({
    model: openai('gpt-4.1'),
    messages: promptMessages,
  });

  return aiStream.toDataStreamResponse();
}
