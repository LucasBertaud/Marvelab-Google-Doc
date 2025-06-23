import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find({
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findByProject(projectId: string): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { project_id: projectId },
      relations: ['project'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    
    if (!note) {
      throw new NotFoundException(`Note avec l'ID ${id} non trouvée`);
    }
    
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    return await this.noteRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }
}