// src/utils/geminiApi.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// The model to use
const modelName = 'gemini-pro';

// Initialize the model
const model = genAI.getGenerativeModel({ model: modelName });

// Function to generate a response from the chatbot
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const generateChatResponse = async (
  messageHistory: ChatMessage[],
  systemPrompt: string
): Promise<string> => {
  try {
    // Start a chat
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Combine messages and send
    const messages = messageHistory.map(msg => msg.content).join('\n');
    
    // Add error checking for empty messages
    if (!messages.trim() && !systemPrompt.trim()) {
      throw new Error('Empty message and system prompt');
    }

    const result = await chat.sendMessage(messages + '\n' + systemPrompt);
    
    if (!result || !result.response) {
      throw new Error('No response received from API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from API');
    }

    return text;
    
  } catch (error) {
    console.error('Detailed error in generateChatResponse:', {
      error,
      messageHistoryLength: messageHistory.length,
      systemPromptLength: systemPrompt.length
    });
    throw new Error('AI response generation failed. Please check your API key and try again.');
  }
};

// Function to initialize with a system prompt
export async function initializeChat(systemPrompt: string) {
  try {
    const result = await model.generateContent(systemPrompt);
    return result.response.text();
  } catch (error) {
    console.error('Error initializing chat:', error);
    throw error;
  }
}