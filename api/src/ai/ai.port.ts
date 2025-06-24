export interface AiPort {
  generateResponse(prompt: string | string[]): Promise<string>;
}
