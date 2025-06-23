import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text', nullable: true })
  alt_text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Project, project => project.resources, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}