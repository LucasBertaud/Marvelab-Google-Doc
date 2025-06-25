import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { NotesModule } from './notes/notes.module';
import { InterpretationsModule } from './interpretations/interpretations.module';
import { ResourcesModule } from './resources/resources.module';
import { MethodologiesModule } from './methodologies/methodologies.module';
import { ExperimentsModule } from './experiments/experiments.module';
import { SeedsModule } from './seeds/seeds.module';
import { Project } from './projects/entities/project.entity';
import { Note } from './notes/entities/note.entity';
import { Interpretation } from './interpretations/entities/interpretation.entity';
import { Resource } from './resources/entities/resource.entity';
import { Methodology } from './methodologies/entities/methodology.entity';
import { Experiment } from './experiments/entities/experiment.entity';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'marvelab',
      entities: [Project, Note, Interpretation, Resource, Methodology, Experiment],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ProjectsModule,
    NotesModule,
    InterpretationsModule,
    ResourcesModule,
    MethodologiesModule,
    ExperimentsModule,
    SeedsModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
