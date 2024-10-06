import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Function to generate a random theme or mood to vary the prompt
function getRandomTheme() {
  const themes = [
    "friendship",
    "creativity",
    "adventure",
    "reflection",
    "learning",
    "fun",
    "curiosity",
    "nature",
    "technology",
    "future",
  ];
  return themes[Math.floor(Math.random() * themes.length)];
}

export async function POST() {
  try {
    const theme = getRandomTheme(); // Get a random theme
    const prompt = `Create a list of three open-ended and engaging questions around the theme of '${theme}' formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Your response should be unique every time.`;

    const textStream = await streamText({
      model: groq("llama-3.2-90b-text-preview"),
      prompt: prompt,
    });

    return textStream.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
