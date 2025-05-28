import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 30

export async function POST(req: Request) {
  console.log('key', process.env.OPENAI_API_KEY)
  const { messages } = (await req.json()) as {
    messages?: { role: string; parts: { type: string; text: string }[] }[]
  }

  if (!messages) {
    return new Response('Missing messages', { status: 400 })
  }

  const lastUser = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.parts.map((p) => p.text).join(''))
    .pop()!

    const promptToSelect = [
      {
        role: 'system' as const,
        content:
          'You are an assistant.',
      },
      { role: 'user' as const, content: lastUser },
    ]

    const aiStream = streamText({
      model: openai('gpt-4o-mini'),
      messages: promptToSelect,
    })
    return aiStream.toDataStreamResponse()
}
