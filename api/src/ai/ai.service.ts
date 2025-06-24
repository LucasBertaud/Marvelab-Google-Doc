import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../shared/constants/injection-tokens.constants';
import { AiPort } from './ai.port';
import { ProjectsService } from '../projects/projects.service';
import { Project } from 'src/projects/entities/project.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Interpretation } from 'src/interpretations/entities/interpretation.entity';

@Injectable()
export class AiService {
  constructor(
    @Inject(INJECTION_TOKENS.AI_SERVICE)
    private readonly ai: AiPort,
    private readonly projectService: ProjectsService,
  ) {}

  async generateResponse(
    prompt: string,
    projectId: string,
  ): Promise<string | null> {
    const project = await this.projectService.findOneWithRelations(projectId);
    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }
    const contextualPrompt = await this.getContextualPrompt(project);
    const fullPrompt = [
      `Contexte du projet : ${contextualPrompt}`,
      `Prompt de l'utilisateur : ${prompt}`,
    ];
    const response = await this.ai.generateResponse(fullPrompt);
    if (response === null || response === undefined || response === '') {
      throw new Error(`AI service error: Response is null or empty`);
    }
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
