"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/suggest-messages",
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-auto p-4 border border-gray-300 rounded-lg bg-white shadow-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`my-2 p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-100 text-blue-700 ml-auto"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <strong>{message.role === "user" ? "User" : "AI"}:</strong>
            <ReactMarkdown className="mt-1">{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="p-3 ml-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
