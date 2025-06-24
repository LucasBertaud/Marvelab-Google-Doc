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
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('experiments')
@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new experiment' })
  @ApiResponse({
    status: 201,
    description: 'The experiment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createExperimentDto: CreateExperimentDto) {
    return this.experimentsService.create(createExperimentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiments or filter by project' })
  @ApiQuery({
    name: 'projectId',
    required: false,
    description: 'Filter experiments by project ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all experiments or filtered by project.',
  })
  findAll(@Query('projectId') projectId?: string) {
    if (projectId) {
      return this.experimentsService.findAllByProjectId(projectId);
    }
    return this.experimentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experiment by id' })
  @ApiParam({ name: 'id', description: 'Experiment ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the experiment with the specified id.',
  })
  @ApiResponse({ status: 404, description: 'Experiment not found.' })
  findOne(@Param('id') id: string) {
    return this.experimentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an experiment' })
  @ApiParam({ name: 'id', description: 'Experiment ID' })
  @ApiResponse({
    status: 200,
    description: 'The experiment has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Experiment not found.' })
  update(
    @Param('id') id: string,
    @Body() updateExperimentDto: UpdateExperimentDto,
  ) {
    return this.experimentsService.update(id, updateExperimentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experiment' })
  @ApiParam({ name: 'id', description: 'Experiment ID' })
  @ApiResponse({
    status: 200,
    description: 'The experiment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Experiment not found.' })
  remove(@Param('id') id: string) {
    return this.experimentsService.remove(id);
  }
}
