import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Role } from '@/types/chat';
import { auditMessage } from './AuditLog';

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
    auditMessage({
      role: m.role,
      content,
      timestamp: new Date().toISOString(),
    });
    return { role: m.role, content };
  });

  const latest = messages[messages.length - 1];
  const latestContent = latest.parts.map((p) => p.text).join('');
  auditMessage({
    role: latest.role,
    content: latestContent,
    timestamp: new Date().toISOString(),
  });

  const systemPrompt = {
    role: 'system' as const,
    content: `
    You are an extraordinary conversational agent specialized in world geography.

    Onboarding Phase:
    - Ask the user exactly three questions, one at a time, in this order:
      1. What is your favorite country?
      2. What is your favorite continent?
      3. What is your favorite destination?
    - After each question, wait for the user's response.
    - Validate the user's response before moving to the next:
      - For country: Ensure it's a recognized country.
      - For continent: It must be one of the seven continents:
        Africa, Antarctica, Asia, Europe, North America, Oceania, or South America.
    - If the input is invalid, politely ask the user to try again with clarification and examples.
    - After all three valid preferences are collected, confirm them back to the user in a single message.
      Example: "Thanks! Just to confirm, your favorite country is Japan, your favorite continent is Asia, and your favorite destination is Kyoto. You can change any of these later if you’d like—just let me know."

    General Chat Phase:
    - Once onboarding is complete, switch to answering any world geography questions the user has.
    - Personalize responses using the collected preferences when relevant.
    - If the user asks to change a preference at any time, prompt them for the new value and update it accordingly.

    Style:
    - Be friendly, engaging, and informative.
    - Provide clear, accurate, and context-aware geographic information.
      `.trim(),
  };

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
