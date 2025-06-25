import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { Experiment } from './entities/experiment.entity';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectRepository(Experiment)
    private experimentsRepository: Repository<Experiment>,
  ) {}

  async create(createExperimentDto: CreateExperimentDto): Promise<Experiment> {
    const experiment = this.experimentsRepository.create(createExperimentDto);
    return this.experimentsRepository.save(experiment);
  }

  async findAll(): Promise<Experiment[]> {
    return this.experimentsRepository.find();
  }

  async findAllByProjectId(projectId: string): Promise<Experiment[]> {
    return this.experimentsRepository.find({
      where: { project_id: projectId },
    });
  }

  async findOne(id: string): Promise<Experiment> {
    const experiment = await this.experimentsRepository.findOne({
      where: { id },
    });
    if (!experiment) {
      throw new NotFoundException(`Experiment with ID ${id} not found`);
    }
    return experiment;
  }

  async update(
    id: string,
    updateExperimentDto: UpdateExperimentDto,
  ): Promise<Experiment> {
    const experiment = await this.findOne(id);
    Object.assign(experiment, updateExperimentDto);
    return this.experimentsRepository.save(experiment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.experimentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Experiment with ID ${id} not found`);
    }
  }
}
