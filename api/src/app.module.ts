import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { NotesModule } from './notes/notes.module';
import { InterpretationsModule } from './interpretations/interpretations.module';
import { ResourcesModule } from './resources/resources.module';
import { Project } from './projects/entities/project.entity';
import { Note } from './notes/entities/note.entity';
import { Interpretation } from './interpretations/entities/interpretation.entity';
import { Resource } from './resources/entities/resource.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Project, Note, Interpretation, Resource],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    ProjectsModule,
    NotesModule,
    InterpretationsModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}