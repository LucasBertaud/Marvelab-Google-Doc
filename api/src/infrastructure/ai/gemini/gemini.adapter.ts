import { Injectable } from '@nestjs/common';
import { AiPort } from '../../../ai/ai.port';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiAdapter implements AiPort {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  public async generateResponse(prompt: string): Promise<string> {
    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    const response = result.text.trim();

    return response;
  }
}
