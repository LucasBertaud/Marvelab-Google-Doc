import { Injectable } from '@nestjs/common';
import { CreateInterpretationDto } from './dto/create-interpretation.dto';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';

@Injectable()
export class InterpretationsService {
  create(createInterpretationDto: CreateInterpretationDto) {
    return 'This action adds a new interpretation';
  }

  findAll() {
    return `This action returns all interpretations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interpretation`;
  }

  update(id: number, updateInterpretationDto: UpdateInterpretationDto) {
    return `This action updates a #${id} interpretation`;
  }

  remove(id: number) {
    return `This action removes a #${id} interpretation`;
  }
}
