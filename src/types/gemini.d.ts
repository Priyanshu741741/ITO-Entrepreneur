// src/types/gemini.d.ts
declare module '@google/generative-ai' {
    export class GoogleGenerativeAI {
      constructor(apiKey: string);
      getGenerativeModel(options: { model: string }): GenerativeModel;
    }
  
    export interface GenerativeModel {
      generateContent(prompt: string): Promise<GenerateContentResult>;
      startChat(options?: ChatOptions): ChatSession;
    }
  
    export interface ChatOptions {
      history?: { role: 'user' | 'model'; content: string }[];
      generationConfig?: {
        temperature?: number;
        topK?: number;
        topP?: number;
        maxOutputTokens?: number;
      };
      safetySettings?: {
        category: string;
        threshold: string;
      }[];
    }
  
    export interface ChatSession {
      sendMessage(message: string): Promise<GenerateContentResult>;
    }
  
    export interface GenerateContentResult {
      response: {
        text: () => string;
      };
    }
  }