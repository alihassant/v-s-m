import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: groq("llama-3.1-70b-versatile"),
    model: groq("llama-3.2-3b-preview"),
    system:
      "You are a helpful assistant. You have to help software developers to debug their code. You have to provide them with the correct solution to their problem.",
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
