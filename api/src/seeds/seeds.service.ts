import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { Note } from '../notes/entities/note.entity';
import { Interpretation } from '../interpretations/entities/interpretation.entity';
import { Resource } from '../resources/entities/resource.entity';
import { Methodology } from '../methodologies/entities/methodology.entity';
import { Experiment } from '../experiments/entities/experiment.entity';
import { projectsData } from './data/projects.data';
import { notesData } from './data/notes.data';
import { interpretationsData } from './data/interpretations.data';
import { resourcesData } from './data/resources.data';
import { methodologiesData } from './data/methodologies.data';
import { experimentsData } from './data/experiments.data';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(Interpretation)
    private interpretationRepository: Repository<Interpretation>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(Methodology)
    private methodologyRepository: Repository<Methodology>,
    @InjectRepository(Experiment)
    private experimentRepository: Repository<Experiment>,
  ) {}

  async run(): Promise<void> {
    this.logger.log('🌱 Démarrage du seeding...');

    // Nettoyer la base
    await this.clearDatabase();

    // Créer les données
    await this.seedData();

    this.logger.log('✅ Seeding terminé avec succès !');
  }

  private async clearDatabase(): Promise<void> {
    this.logger.log('🧹 Nettoyage de la base de données...');

    // Supprimer dans l'ordre inverse des dépendances (enfants d'abord, parents ensuite)
    // Utiliser le query builder pour supprimer toutes les données
    await this.resourceRepository
      .createQueryBuilder()
      .delete()
      .from(Resource)
      .execute();

    await this.interpretationRepository
      .createQueryBuilder()
      .delete()
      .from(Interpretation)
      .execute();

    await this.noteRepository
      .createQueryBuilder()
      .delete()
      .from(Note)
      .execute();

    await this.methodologyRepository
      .createQueryBuilder()
      .delete()
      .from(Methodology)
      .execute();

    await this.experimentRepository
      .createQueryBuilder()
      .delete()
      .from(Experiment)
      .execute();

    await this.projectRepository
      .createQueryBuilder()
      .delete()
      .from(Project)
      .execute();

    this.logger.log('✅ Base de données nettoyée');
  }

  private async seedData(): Promise<void> {
    // Créer les projets
    this.logger.log('📁 Création des projets...');
    const projects = await this.projectRepository.save(projectsData);
    this.logger.log(`✅ ${projects.length} projets créés`);

    // Créer les notes
    this.logger.log('📝 Création des notes...');
    const notesToCreate = notesData.map((note) => ({
      content: note.content,
      project_id: projects[note.projectIndex].id,
    }));
    const notes = await this.noteRepository.save(notesToCreate);
    this.logger.log(`✅ ${notes.length} notes créées`);

    // Créer les interprétations
    this.logger.log('🧠 Création des interprétations...');
    const interpretationsToCreate = interpretationsData.map(
      (interpretation) => ({
        content: interpretation.content,
        project_id: projects[interpretation.projectIndex].id,
      }),
    );
    const interpretations = await this.interpretationRepository.save(
      interpretationsToCreate,
    );
    this.logger.log(`✅ ${interpretations.length} interprétations créées`);

    // Créer les ressources
    this.logger.log('🖼️ Création des ressources...');
    const resourcesToCreate = resourcesData.map((resource) => ({
      type: resource.type,
      url: resource.url,
      alt_text: resource.alt_text,
      project_id: projects[resource.projectIndex].id,
    }));
    const resources = await this.resourceRepository.save(resourcesToCreate);
    this.logger.log(`✅ ${resources.length} ressources créées`);

    // Créer les méthodologies
    this.logger.log('🧪 Création des méthodologies...');
    const methodologiesToCreate = methodologiesData.map((methodology) => ({
      title: methodology.title,
      description: methodology.description,
      project_id: projects[methodology.projectIndex].id,
    }));
    const methodologies = await this.methodologyRepository.save(
      methodologiesToCreate,
    );
    this.logger.log(`✅ ${methodologies.length} méthodologies créées`);

    // Créer les expérimentations
    this.logger.log('🔬 Création des expérimentations...');
    const experimentsToCreate = experimentsData.map((experiment) => ({
      title: experiment.title,
      protocol: experiment.protocol,
      results: experiment.results,
      project_id: projects[experiment.projectIndex].id,
    }));
    const experiments = await this.experimentRepository.save(experimentsToCreate);
    this.logger.log(`✅ ${experiments.length} expérimentations créées`);

    this.logger.log(
      `📊 Résumé: ${projects.length} projets, ${notes.length} notes, ${interpretations.length} interprétations, ${resources.length} ressources, ${methodologies.length} méthodologies, ${experiments.length} expérimentations`,
    );
  }
}
