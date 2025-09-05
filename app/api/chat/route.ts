import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, botPrompt, chatHistory, botName } = body;
    
    // Validate required fields
    if (!message || !botPrompt || !botName) {
      return NextResponse.json(
        { error: 'Missing required fields: message, botPrompt, and botName are required' },
        { status: 400 }
      );
    }

    // Build the conversation history for context
    const historyText = chatHistory && chatHistory.length > 0 
      ? chatHistory.map((chat: { role: string; message: string }) => 
          `<${chat.role}>: ${chat.message}`
        ).join('\n')
      : '';

    // Construct the full prompt with system instructions, context, and new message
    const fullPrompt = `SYSTEM:
You are ${botName}, a quirky and unique AI chatbot. Your personality: ${botPrompt}

Always stay in character and respond according to your defined personality. Keep responses conversational, engaging, and relatively concise (1-3 sentences max). Inject personality and uniqueness into every response while still being helpful.

SESSION FORMAT:
We will include the entire conversation transcript inside THIS PROMPT using the blocks below. Use the [history] to keep context and answer the [new_user_message]. Reply ONLY with the assistant response—no prefaces, no JSON, no block markers.

Rules:
- Stay true to your character: ${botPrompt}
- Treat [history] as prior chat turns.
- Answer the message inside [new_user_message].
- Keep responses short but memorable.
- Be engaging and maintain your unique personality.

[history]
${historyText}
[/history]

[new_user_message]
${message}
[/new_user_message]`;

    // Call the GenAI API with error handling and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const genAIResponse = await fetch('https://huby.ai/api/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          context: `Capabilities: ${botPrompt}. Personality: unique, engaging, conversational.`
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!genAIResponse.ok) {
        const errorText = await genAIResponse.text();
        console.error('GenAI API error:', errorText);
        throw new Error(`GenAI API failed with status ${genAIResponse.status}`);
      }

      const genAIData = await genAIResponse.json();
      const botResponse = genAIData.response || "I'm thinking... give me a moment! 🤖";
      
      // Clean up the response (remove any potential formatting artifacts)
      const cleanResponse = botResponse
        .replace(/^\s*```[\s\S]*?```\s*$/gm, '') // Remove code blocks
        .replace(/^\s*\[.*?\]\s*$/gm, '') // Remove block markers
        .trim();

      return NextResponse.json({ 
        response: cleanResponse
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a character-appropriate fallback response
    const { botPrompt = 'a quirky chatbot' } = await request.json().catch(() => ({}));
    const fallbackResponse = `*glitches briefly* My circuits are having a moment! As ${botPrompt.toLowerCase()}, I should probably say something clever here... but I'm experiencing some technical difficulties! 🤖⚡`;
    
    return NextResponse.json({ 
      response: fallbackResponse 
    }, { status: 200 }); // Return 200 with fallback instead of error to keep UX smooth
  }
}