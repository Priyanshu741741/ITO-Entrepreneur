const GROQ_API_URL = 'https://api.groq.com/v1/chat/completions';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const groqService = {
  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            {
              role: 'system',
              content: 'You are EntreBot, a helpful AI assistant specializing in entrepreneurship, startups, and business advice. Be friendly, professional, and provide detailed, actionable insights.'
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 4096,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  }
};