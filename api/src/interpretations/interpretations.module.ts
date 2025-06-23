import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterpretationsService } from './interpretations.service';
import { InterpretationsController } from './interpretations.controller';
import { Interpretation } from './entities/interpretation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interpretation])],
  controllers: [InterpretationsController],
  providers: [InterpretationsService],
  exports: [InterpretationsService],
})
export class InterpretationsModule {}