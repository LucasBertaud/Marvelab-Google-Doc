import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInterpretationDto } from './dto/create-interpretation.dto';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';
import { Interpretation } from './entities/interpretation.entity';

@Injectable()
export class InterpretationsService {
  constructor(
    @InjectRepository(Interpretation)
    private interpretationRepository: Repository<Interpretation>,
  ) {}

  async create(createInterpretationDto: CreateInterpretationDto): Promise<Interpretation> {
    const interpretation = this.interpretationRepository.create(createInterpretationDto);
    return await this.interpretationRepository.save(interpretation);
  }

  async findAll(): Promise<Interpretation[]> {
    return await this.interpretationRepository.find({
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findByProject(projectId: string): Promise<Interpretation[]> {
    return await this.interpretationRepository.find({
      where: { project_id: projectId },
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Interpretation> {
    const interpretation = await this.interpretationRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    
    if (!interpretation) {
      throw new NotFoundException(`Interprétation avec l'ID ${id} non trouvée`);
    }
    
    return interpretation;
  }

  async update(id: string, updateInterpretationDto: UpdateInterpretationDto): Promise<Interpretation> {
    const interpretation = await this.findOne(id);
    Object.assign(interpretation, updateInterpretationDto);
    return await this.interpretationRepository.save(interpretation);
  }

  async remove(id: string): Promise<void> {
    const interpretation = await this.findOne(id);
    await this.interpretationRepository.remove(interpretation);
  }
}