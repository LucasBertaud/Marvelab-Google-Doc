import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ressource' })
  @ApiResponse({ status: 201, description: 'Ressource créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les ressources avec filtres optionnels' })
  @ApiQuery({ name: 'project_id', required: false, description: 'ID du projet pour filtrer les ressources' })
  @ApiQuery({ name: 'type', required: false, description: 'Type de ressource pour filtrer (image, graph, document, data)' })
  @ApiResponse({ status: 200, description: 'Liste des ressources récupérée avec succès' })
  findAll(@Query('project_id') projectId?: string, @Query('type') type?: string) {
    if (projectId) {
      return this.resourcesService.findByProject(projectId);
    }
    if (type) {
      return this.resourcesService.findByType(type);
    }
    return this.resourcesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une ressource par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la ressource' })
  @ApiResponse({ status: 200, description: 'Ressource trouvée' })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  // NOUVELLE ROUTE pour servir l'image directement
  @Get(':id/image')
  @ApiOperation({ summary: 'Récupérer l\'image d\'une ressource directement' })
  @ApiParam({ name: 'id', description: 'ID de la ressource' })
  @ApiResponse({ status: 200, description: 'Image de la ressource' })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  async getResourceImage(@Param('id') id: string, @Res() res: Response) {
    try {
      const imageBuffer = await this.resourcesService.getResourceImage(id);
      
      // Définir les headers appropriés
      res.set({
        'Content-Type': 'image/jpeg', // ou déterminer automatiquement le type
        'Content-Length': imageBuffer.length,
        'Cache-Control': 'public, max-age=3600', // Cache pendant 1 heure
      });
      
      res.send(imageBuffer);
    } catch (error) {
      res.status(404).json({ message: 'Image non trouvée' });
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une ressource' })
  @ApiParam({ name: 'id', description: 'ID de la ressource' })
  @ApiResponse({ status: 200, description: 'Ressource mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une ressource' })
  @ApiParam({ name: 'id', description: 'ID de la ressource' })
  @ApiResponse({ status: 200, description: 'Ressource supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Ressource non trouvée' })
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}