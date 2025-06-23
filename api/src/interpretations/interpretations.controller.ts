import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { InterpretationsService } from './interpretations.service';
import { CreateInterpretationDto } from './dto/create-interpretation.dto';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';

@ApiTags('interpretations')
@Controller('interpretations')
export class InterpretationsController {
  constructor(private readonly interpretationsService: InterpretationsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle interprétation' })
  @ApiResponse({ status: 201, description: 'Interprétation créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createInterpretationDto: CreateInterpretationDto) {
    return this.interpretationsService.create(createInterpretationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les interprétations ou les interprétations d\'un projet spécifique' })
  @ApiQuery({ name: 'project_id', required: false, description: 'ID du projet pour filtrer les interprétations' })
  @ApiResponse({ status: 200, description: 'Liste des interprétations récupérée avec succès' })
  findAll(@Query('project_id') projectId?: string) {
    if (projectId) {
      return this.interpretationsService.findByProject(projectId);
    }
    return this.interpretationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une interprétation par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'interprétation' })
  @ApiResponse({ status: 200, description: 'Interprétation trouvée' })
  @ApiResponse({ status: 404, description: 'Interprétation non trouvée' })
  findOne(@Param('id') id: string) {
    return this.interpretationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une interprétation' })
  @ApiParam({ name: 'id', description: 'ID de l\'interprétation' })
  @ApiResponse({ status: 200, description: 'Interprétation mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Interprétation non trouvée' })
  update(@Param('id') id: string, @Body() updateInterpretationDto: UpdateInterpretationDto) {
    return this.interpretationsService.update(id, updateInterpretationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une interprétation' })
  @ApiParam({ name: 'id', description: 'ID de l\'interprétation' })
  @ApiResponse({ status: 200, description: 'Interprétation supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Interprétation non trouvée' })
  remove(@Param('id') id: string) {
    return this.interpretationsService.remove(id);
  }
}