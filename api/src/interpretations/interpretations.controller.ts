import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterpretationsService } from './interpretations.service';
import { CreateInterpretationDto } from './dto/create-interpretation.dto';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';

@Controller('interpretations')
export class InterpretationsController {
  constructor(private readonly interpretationsService: InterpretationsService) {}

  @Post()
  create(@Body() createInterpretationDto: CreateInterpretationDto) {
    return this.interpretationsService.create(createInterpretationDto);
  }

  @Get()
  findAll() {
    return this.interpretationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interpretationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterpretationDto: UpdateInterpretationDto) {
    return this.interpretationsService.update(+id, updateInterpretationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interpretationsService.remove(+id);
  }
}
