import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourceRepository.create(createResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceRepository.find({
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findByProject(projectId: string): Promise<Resource[]> {
    return await this.resourceRepository.find({
      where: { project_id: projectId },
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findByType(type: string): Promise<Resource[]> {
    return await this.resourceRepository.find({
      where: { type },
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    
    if (!resource) {
      throw new NotFoundException(`Ressource avec l'ID ${id} non trouvée`);
    }
    
    return resource;
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.findOne(id);
    Object.assign(resource, updateResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepository.remove(resource);
  }
}