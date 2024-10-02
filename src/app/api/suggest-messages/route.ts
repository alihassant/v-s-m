// import { streamText } from "ai";
// import { createOpenAI as createGroq } from "@ai-sdk/openai";

// const groq = createGroq({
//   baseURL: "https://api.groq.com/openai/v1",
//   apiKey: process.env.GROQ_API_KEY,
// });

// const prompt =
//   "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

// export async function GET(req: Request) {
//   const { messages } = await req.json();

//   try {
//     const textStream = await streamText({
//       model: groq("llama-3.1-70b-versatile"),
//       //   prompt: prompt,
//       prompt: "Hello, how are you?",
//     });

//     return textStream.toDataStreamResponse();
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

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
