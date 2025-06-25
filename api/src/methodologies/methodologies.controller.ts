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
import { MethodologiesService } from './methodologies.service';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('methodologies')
@Controller('methodologies')
export class MethodologiesController {
  constructor(private readonly methodologiesService: MethodologiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new methodology' })
  @ApiResponse({
    status: 201,
    description: 'The methodology has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createMethodologyDto: CreateMethodologyDto) {
    return this.methodologiesService.create(createMethodologyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all methodologies or filter by project' })
  @ApiQuery({
    name: 'projectId',
    required: false,
    description: 'Filter methodologies by project ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all methodologies or filtered by project.',
  })
  findAll(@Query('projectId') projectId?: string) {
    if (projectId) {
      return this.methodologiesService.findAllByProjectId(projectId);
    }
    return this.methodologiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a methodology by id' })
  @ApiParam({ name: 'id', description: 'Methodology ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the methodology with the specified id.',
  })
  @ApiResponse({ status: 404, description: 'Methodology not found.' })
  findOne(@Param('id') id: string) {
    return this.methodologiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a methodology' })
  @ApiParam({ name: 'id', description: 'Methodology ID' })
  @ApiResponse({
    status: 200,
    description: 'The methodology has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Methodology not found.' })
  update(
    @Param('id') id: string,
    @Body() updateMethodologyDto: UpdateMethodologyDto,
  ) {
    return this.methodologiesService.update(id, updateMethodologyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a methodology' })
  @ApiParam({ name: 'id', description: 'Methodology ID' })
  @ApiResponse({
    status: 200,
    description: 'The methodology has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Methodology not found.' })
  remove(@Param('id') id: string) {
    return this.methodologiesService.remove(id);
  }
}
