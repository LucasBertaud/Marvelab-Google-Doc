import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Note } from '../../notes/entities/note.entity';
import { Interpretation } from '../../interpretations/entities/interpretation.entity';
import { Resource } from '../../resources/entities/resource.entity';
import { Methodology } from '../../methodologies/entities/methodology.entity';
import { Experiment } from '../../experiments/entities/experiment.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Note, (note) => note.project)
  notes: Note[];

  @OneToMany(() => Interpretation, (interpretation) => interpretation.project)
  interpretations: Interpretation[];

  @OneToMany(() => Resource, (resource) => resource.project)
  resources: Resource[];

  @OneToMany(() => Methodology, (methodology) => methodology.project)
  methodologies: Methodology[];

  @OneToMany(() => Experiment, (experiment) => experiment.project)
  experiments: Experiment[];
}