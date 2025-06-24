import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMethodologyDto {
  @ApiProperty({
    description: 'The ID of the project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The title of the methodology',
    example: 'Analyse qualitative',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the methodology',
    example:
      'Cette méthodologie utilise une approche qualitative basée sur des entretiens semi-directifs.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
