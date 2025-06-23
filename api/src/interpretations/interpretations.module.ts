import { Module } from '@nestjs/common';
import { InterpretationsService } from './interpretations.service';
import { InterpretationsController } from './interpretations.controller';

@Module({
  controllers: [InterpretationsController],
  providers: [InterpretationsService],
})
export class InterpretationsModule {}
