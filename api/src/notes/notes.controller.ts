import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle note' })
  @ApiResponse({ status: 201, description: 'Note créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({
    summary: "Récupérer toutes les notes ou les notes d'un projet spécifique",
  })
  @ApiQuery({
    name: 'project_id',
    required: false,
    description: 'ID du projet pour filtrer les notes',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des notes récupérée avec succès',
  })
  findAll(@Query('project_id') projectId?: string) {
    if (projectId) {
      return this.notesService.findByProject(projectId);
    }
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une note par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la note' })
  @ApiResponse({ status: 200, description: 'Note trouvée' })
  @ApiResponse({ status: 404, description: 'Note non trouvée' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une note' })
  @ApiParam({ name: 'id', description: 'ID de la note' })
  @ApiResponse({ status: 200, description: 'Note mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Note non trouvée' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une note' })
  @ApiParam({ name: 'id', description: 'ID de la note' })
  @ApiResponse({ status: 200, description: 'Note supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Note non trouvée' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
