import { Project } from '../projects/entities/project.entity';

export interface AiPort {
  generateResponse(prompt: string, context: Project): Promise<string>;
}
