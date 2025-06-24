import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';
import { Methodology } from './entities/methodology.entity';

@Injectable()
export class MethodologiesService {
  constructor(
    @InjectRepository(Methodology)
    private methodologiesRepository: Repository<Methodology>,
  ) {}

  async create(
    createMethodologyDto: CreateMethodologyDto,
  ): Promise<Methodology> {
    const methodology =
      this.methodologiesRepository.create(createMethodologyDto);
    return this.methodologiesRepository.save(methodology);
  }

  async findAll(): Promise<Methodology[]> {
    return this.methodologiesRepository.find();
  }

  async findAllByProjectId(projectId: string): Promise<Methodology[]> {
    return this.methodologiesRepository.find({
      where: { project_id: projectId },
    });
  }

  async findOne(id: string): Promise<Methodology> {
    const methodology = await this.methodologiesRepository.findOne({
      where: { id },
    });
    if (!methodology) {
      throw new NotFoundException(`Methodology with ID ${id} not found`);
    }
    return methodology;
  }

  async update(
    id: string,
    updateMethodologyDto: UpdateMethodologyDto,
  ): Promise<Methodology> {
    const methodology = await this.findOne(id);
    Object.assign(methodology, updateMethodologyDto);
    return this.methodologiesRepository.save(methodology);
  }

  async remove(id: string): Promise<void> {
    const result = await this.methodologiesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Methodology with ID ${id} not found`);
    }
  }
}
