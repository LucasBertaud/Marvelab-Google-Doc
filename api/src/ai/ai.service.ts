import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../shared/constants/injection-tokens.constants';
import { AiPort } from './ai.port';

@Injectable()
export class AiService {
  constructor(
    @Inject(INJECTION_TOKENS.AI_SERVICE)
    private readonly ai: AiPort,
  ) {}

  async generateResponse(prompt: string): Promise<string | null> {
    const response = await this.ai.generateResponse(prompt);
    if (response === null || response === undefined || response === '') {
      throw new Error(`AI service error: Response is null or empty`);
    }
    return response;
  }
}
