import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../shared/constants/injection-tokens.constants';
import { AiPort } from './ai.port';
import { ProjectsService } from '../projects/projects.service';

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
    const response = await this.ai.generateResponse(prompt, project);
    if (response === null || response === undefined || response === '') {
      throw new Error(`AI service error: Response is null or empty`);
    }
    return response;
  }
}
