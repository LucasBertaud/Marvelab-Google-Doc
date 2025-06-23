import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './seeds.service';
import { Project } from '../projects/entities/project.entity';
import { Note } from '../notes/entities/note.entity';
import { Interpretation } from '../interpretations/entities/interpretation.entity';
import { Resource } from '../resources/entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Note, Interpretation, Resource]),
  ],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
