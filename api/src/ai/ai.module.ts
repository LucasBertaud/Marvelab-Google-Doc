import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { INJECTION_TOKENS } from '../shared/constants/injection-tokens.constants';
import { GeminiAdapter } from '../infrastructure/ai/gemini/gemini.adapter';
import { AiController } from './ai.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [AiController],
  imports: [ProjectsModule],
  providers: [
    AiService,
    {
      provide: INJECTION_TOKENS.AI_SERVICE,
      useClass: GeminiAdapter,
    },
  ],
  exports: [AiService],
})
export class AiModule {}
