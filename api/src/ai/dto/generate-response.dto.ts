import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateResponseDto {
  @ApiProperty({
    description: 'The prompt to generate a response from AI',
    type: String,
    example: 'What is the capital of France?',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
