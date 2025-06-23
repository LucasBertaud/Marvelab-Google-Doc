import { Body, Controller, Param, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateResponseDto } from './dto/generate-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-response/:id')
  @ApiOperation({ summary: 'Generate a response from AI' })
  @ApiBody({
    type: GenerateResponseDto,
    description: 'Prompt for AI to generate a response',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'AI response generated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async generateResponse(
    @Body() dto: GenerateResponseDto,
    @Param('id') id: string,
  ): Promise<string> {
    return this.aiService.generateResponse(dto.prompt, id);
  }
}
