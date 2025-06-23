import { Injectable } from '@nestjs/common';
import { AiPort } from '../../../ai/ai.port';
import { GoogleGenAI } from '@google/genai';
import { Project } from '../../../projects/entities/project.entity';
import { Interpretation } from '../../../interpretations/entities/interpretation.entity';
import { Note } from '../../../notes/entities/note.entity';

@Injectable()
export class GeminiAdapter implements AiPort {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  public async generateResponse(
    prompt: string,
    context: Project,
  ): Promise<string> {
    const contextualPrompt = await this.getContextualPrompt(context);
    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        'Contexte du projet : ' + contextualPrompt,
        "Prompt de l'utilisateur : " + prompt,
      ],
    });
    const response = result.text.trim();

    return response;
  }

  private async getContextualPrompt(project: Project): Promise<string> {
    return (
      `Nom du projet : ${project.title}\n` +
      `Description du projet : ${project.description}\n` +
      `Notes : ${project.notes.map((note: Note, index: number) => `${index + 1} : ${note.content}`).join('\n')}\n` +
      `Interprétations : ${project.interpretations.map((interpretation: Interpretation, index: number) => `${index + 1} : ${interpretation.content}\n`).join('\n')}\n`
    );
  }
}
