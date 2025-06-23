export interface AiPort {
  generateResponse(prompt: string): Promise<string>;
}
