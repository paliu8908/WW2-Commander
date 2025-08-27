// app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || '',
    });

    const config = {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: 'text/plain',
    };

    const model = 'gemini-2.5-flash-lite-preview-06-17';

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    // Get the streaming response
    const stream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let finalText = "";

    for await (const chunk of stream) {
      if(chunk.text) {
        finalText += chunk.text;
      }
    }

    return new NextResponse(finalText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // CORS headers if needed:
        // 'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

