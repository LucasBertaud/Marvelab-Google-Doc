import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateResponseDto } from './dto/generate-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-response')
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
  async generateResponse(@Body() dto: GenerateResponseDto): Promise<string> {
    const trimPrompt = dto.prompt.trim();
    if (trimPrompt === '') {
      throw new Error('Prompt cannot be empty');
    }
    return this.aiService.generateResponse(trimPrompt);
  }
}
